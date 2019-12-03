const mongoose=require('mongoose');
const shortid=require('shortid');
const logger=require('./loggerLib');
const socketio=require('socket.io');
const tokenLib=require('./tokenLib');
const check = require('../libs/checkLib');
const response = require('../libs/responseLib');
const events=require('events');
const redisLib=require('../libs/redisLib');
const schedule = require('node-schedule');
const eventEmitter=new events.EventEmitter();
const EventModel = mongoose.model('meeting');
const nodemailer = require('nodemailer');
const UserModel = mongoose.model('User');

let setServer=(server)=>{
    let allOnlineUsers=[];
    let io=socketio.listen(server);//connection to server
    let myio=io.of('');//initialize socket
    myio.on('connection',(socket)=>{//main eventHandler
        console.log('on connection--emit verify user');
        socket.emit('verifyUser',"");//verifyUser
        
        //make user online
        socket.on('set-user',(authToken)=>{
            tokenLib.verifyClaimWithoutKey(authToken ,(err,user)=>{
                if(err){
                    console.log('errorrrrrrrr');
                    socket.emit('auth-error',{status:500,error:'authToken is missing'});
                }else{
                    console.log('user verifed setting details');
                    let currentUser=user.data;
                    //updating socket id to userid
                    socket.userId=currentUser.userId;
                    let fullName=currentUser.firstName+' '+currentUser.lastName;
                    let key=currentUser.userId;
                    let value=fullName;
                    let setUserOnline=redisLib.setANewOnlineUserInHash('onlineUsers',key,value,(err,result)=>{
                        if(err){
                            console.log('err setUserOnline',err);
                        }else {
                            redisLib.getAllUsersInAHash('onlineUsers',(err,users)=>{
                                if(err){
                                    console.log('err getAllUsersInHash',err);
                                }else{
                                    console.log(fullName+' is online');
                     
                    
                                    //setting rooms name
                                    //socket.room = 'metting';
                                    // joining chat-group room.
                                  let join=  socket.join('metting',(err)=>{
                                        if(err){
                                            console.log('error occured');
                                            console.log(err);
                                        }
                                    });
                                      
                                    socket.room='metting';
                                    io.sockets.in(socket.room).emit('online-user-list',users);
                  
                                }
                            });//end of getalluser
                        }
                    });//end of setUserOnline
                  }
                       
                })
            })//end of set-user event
            socket.on('disconnect',()=>{
                if(socket.userId){
                    redisLib.deleteUserFromHash('onlineUsers',socket.userId);
                    redisLib.getAllUsersInAHash('onlineUsers',(err,userhash)=>{
                        if(err){
                            console.log('err disconnect',err);
                        }else{
                            console.log('user disconnet');
                            socket.leave(socket.room)
                            socket.broadcast.emit('online-user-list',userhash);
                            
                        }
                    })
                }
                
            })//end of disconnect

            socket.on('mettingEvent',(data)=>{
                console.log('socket metting event called');
                myio.emit(data.userId,data);

            });//end of chat msg
            socket.on('setTimer',(data)=>{
                     //set timer for meeting
                     let date= new Date(data.start);
                     console.log(typeof(date)+'/'+typeof(data.start));
                      let day=("0" + date.getDate()).slice(-2);
                     let month=("0" + (date.getMonth() + 1)).slice(-2); 
                     let year=date.getFullYear();
                     let hours = date.getHours();
                     let minutes = date.getMinutes();
                     let seconds = date.getSeconds();
					 data['name']=data.title;
					 console.log('pre',data.title)
					 data.title='reminder';
                     console.log('post',data.title)
                     let dateReminder = new Date(year, month-1, day, hours, minutes-5,seconds ); 
                     console.log('DATE',date+''+typeof(date)+' '+data.end)
                     console.log('day',day);
                     console.log('month',month)
                     console.log('year',year+' hours',hours+' minutes',minutes,'sec',seconds); 
                     let j = schedule.scheduleJob(dateReminder, function(){
                     console.log('The world is going to end today.');
                     myio.emit(data.userId,data);
                     //send reminder through email
                     setTimeout(function () {

                        eventEmitter.emit('send-reminder', data);
        
                    }, 3000);
                      
    });//end 
            });//end 
        })//end of main event-handler
        }//end of setuser function

// database operations are kept outside of socket.io code.

// saving chats to database.
 
eventEmitter.on('send-reminder',(data)=>{
    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (data.userId) {
                UserModel.findOne({ userId: data.userId }, (err, userDetails) => {
                    if (err) {
                        logger.error('Failed To Retrieve User Data', 'socketLib: findUser()', 10)
                        let apiResponse = response.generate(true, ':( Failed To Find User Details try again', 500, null)
                        reject(apiResponse);
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found with this email', 'socketLib: findUser()', 7);
                        let apiResponse = response.generate(true, 'No User with this email', 404, null);
                        reject(apiResponse);
                    } else {
                        logger.info('User Found', 'meetingHandle: findUser()', 10);
                        userDetails['title']=data.title;
                        userDetails['adminName']=data.adminName;
                        resolve(userDetails);
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"userId" parameter is missing', 400, null)
                reject(apiResponse);
            }
        })
    }
    //end of find 
    let reminderUserByEmail=(userDetails)=>{
        return new Promise((resolve, reject) => {
     //step1
     const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,

        auth: {
            user: 'testpundir10@gmail.com',
            pass: 'AB10pu@('
        },
        tls: { rejectUnauthorized: false }
    });
    //step 2
    let mailOptions = {
        from: 'testpundir10@gmail.com',
        to: userDetails.email,
        subject: "Reminder for today's Meeting",
        text: data.title + ' metting  today scheduled by '+ data.adminName 
    };
    //step3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
            logger.error('Failed To send mail ', 'meetingHandle: sendMail()', 10)
            let apiResponse = response.generate(true, ':( Failed To  send mail try again', 500, null)
            console.log(apiResponse);
        } else {
                console.log('email sent success')
        }
    });
});
}
findUser(data)
.then(reminderUserByEmail)
.then((resolve) => {
    let apiResponse = response.generate(false, 'mail sent', 200, resolve)
    console.log(apiResponse);
})
.catch((err) => {
    console.log(err);
    console.log(err);
})

}); 
  

module.exports={
    setServer:setServer
}