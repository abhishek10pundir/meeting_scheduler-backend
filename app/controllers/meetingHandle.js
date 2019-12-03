const mongoose = require('mongoose');
const check = require('../libs/checkLib');
const response = require('../libs/responseLib');
const nodemailer = require('nodemailer');
const logger = require('../libs/loggerLib');
const time = require('../libs/timeLib');

/* Models */
const EventModel = mongoose.model('meeting');
const UserModel = mongoose.model('User');

//function add meeting
let addUserMeeting = (req, res) => {
    let validateMeetingInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.userId)) {
                let apiResponse = response.generate(true, 'please select user to add event', 400, null)
                reject(apiResponse);
            } else if (check.isEmpty(req.body.title)) {
                let apiResponse = response.generate(true, 'please write title for event', 400, null)
                reject(apiResponse);
            } else if (check.isEmpty(req.body.start)) {
                let apiResponse = response.generate(true, 'please choose start date for event', 400, null)
                reject(apiResponse);
            } else if (check.isEmpty(req.body.end)) {
                let apiResponse = response.generate(true, 'please choose end date for event', 400, null)
                reject(apiResponse);
            } else if (check.isEmpty(req.body.start > req.body.end)) {
                let apiResponse = response.generate(true, 'End date should be equal or greater than start date', 400, null)
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });

    }//end of validate event parameter
    let saveMeetingt = () => {
        return new Promise((resolve, reject) => {
            let newEvent = new EventModel({
                userId: req.body.userId,
                title: req.body.title,
                start:new Date(req.body.start),
                end: new Date(req.body.end),
                adminName:req.body.adminName,
                adminId:req.body.adminId
            })
			console.log('req',req.body.start);
			console.log('datestart',req.body.start)
            newEvent.save((err, newEvent) => {
                if (err) {
                    let apiResponse = response.generate(true, ':) Failed to create new event try again', 500, null)
                    reject(apiResponse);
                } else {
                    let meeting = newEvent.toObject();
                    delete meeting.__v;
                    let apiResponse = response.generate(false, 'event added', 200, meeting)
                    resolve(apiResponse);
                }
            })
        });
    }//end of save event
    validateMeetingInput(req, res)
        .then(saveMeetingt)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}
//end

//function to edit metting
let updateUserMeeting = (req, res) => {
    console.log(req.body._id+' '+ req.body.start+' '+req.body.end);
    // function to validate parameter 
    let validateMeetingParams = (result) => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.title)) {
                let apiResponse = response.generate(true, 'please write title for event', 400, null)
                reject(apiResponse);
            } else if (check.isEmpty(req.body.start)) {
                let apiResponse = response.generate(true, 'please choose start date for event', 400, null)
                reject(apiResponse);
            } else if (check.isEmpty(req.body.end)) {
                let apiResponse = response.generate(true, 'please choose end date for event', 400, null)
                reject(apiResponse);
            } else if (check.isEmpty(req.body.start > req.body.end)) {
                let apiResponse = response.generate(true, 'End date should be equal or greater than start date', 400, null)
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });
    }
    //end
    //function to find meeting and edit
    let findEditMeeting = (req) => {
        return new Promise((resolve, reject) => {
            EventModel.findOne({ _id: req.body._id })
                .exec((err, result) => {
                    if (err) {
                        let apiResponse = response.generate(true, 'error while finding meeting details', 500, null)
                        reject(apiResponse);
                    } else {
                        result.title = req.body.title;
                        result.start = req.body.start;
                        result.end = req.body.end;
                        result.save((err, result1) => {
                            if (err) {
                                let apiResponse = response.generate(true, 'err while saving', 500, null)
                                reject(apiResponse);
                            } else {
                                let apiResponse = response.generate(false, 'edit success', 200, result1)
                                resolve(apiResponse);
                            }

                        })
                    }
                })
        });
    }//end  


    validateMeetingParams(req, res)
        .then(findEditMeeting)
        .then((resolve) => {
            res.send(resolve);
        })
        .catch((reject) => {
            res.send(reject);
        })

}
//end

//delete  user meeting 
let deleteUserMeeting = (req, res) => {
    let findMeeting = () => {
        return new Promise((resolve, reject) => {
            EventModel.find({ _id: req.body._id })
                .exec((err, result) => {
                    if (err) {
                        let apiResponse = response.generate(true, 'error while finding meeting details', 500, null)
                        reject(apiResponse);
                    } else {
                        resolve(result);
                    }
                })
        });
    }//end of findmeeting

    let deletemeeting = (result) => {
        console.log(result[0]._id);
        return new Promise((resolve, reject) => {
            EventModel.deleteMany({ _id: result[0]._id }).exec((err, finalresult) => {
                if (err) {
                    let apiResponse = response.generate(true, 'error while deleting meeting details', 500, null)
                    reject(apiResponse);
                } else {
                    let apiResponse = response.generate(false, 'meeting deleted successfuly', 200, null)
                    resolve(apiResponse);
                }
            })
        });
    }//end

    findMeeting(req, res)
        .then(deletemeeting)
        .then((resolve) => {
            res.send(resolve);
        })
        .catch((err) => {
            res.send(err);
        })

}
//

//get user all meeting
let getUserAllMeeting = (req, res) => {
    EventModel.find({ userId: req.body.userId }).exec((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
}
//end
//get admin all meeting
let getAdminAllMeeting = (req, res) => {
    EventModel.find({ adminId: req.body.adminId }).exec((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
}
//end

let informUserByEmail=(req,res)=>{
    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.userId) {
                UserModel.findOne({ userId: req.body.userId }, (err, userDetails) => {
                    if (err) {
                        logger.error('Failed To Retrieve User Data', 'meetingHandle: findUser()', 10)
                        let apiResponse = response.generate(true, ':( Failed To Find User Details try again', 500, null)
                        reject(apiResponse);
                    } else if (check.isEmpty(userDetails)) {
                        logger.error('No User Found with this email', 'meetingHandle: findUser()', 7);
                        let apiResponse = response.generate(true, 'No User with this email', 404, null);
                        reject(apiResponse);
                    } else {
                        logger.info('User Found', 'meetingHandle: findUser()', 10);
                        userDetails['title']=req.body.title;
                        userDetails['adminName']=req.body.adminName;
                        resolve(userDetails);
                    }
                });

            } else {
                let apiResponse = response.generate(true, '"userId" parameter is missing', 400, null)
                reject(apiResponse);
            }
        })
    }
    //end of find user
     //send password by nodemailer module to particular user mail and also send response 
     let sendMail = (userDetails) => {
        console.log('sendmail',userDetails['adminName']+'/'+userDetails.adminName);
        return new Promise((resolve, reject) =>{  
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
                subject: 'Information Regarding Meeting',
                text: userDetails.title+' by '+ userDetails.adminName
            };
            //step3
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err);
                    logger.error('Failed To send mail ', 'meetingHandle: sendMail()', 10)
                    let apiResponse = response.generate(true, ':( Failed To  send mail try again', 500, null)
                    reject(apiResponse);
                } else {
                    resolve();
                }
            });
        });
    }
    //end mail
    findUser(req, res)
        .then(sendMail)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'mail sent', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })


}

//get all meeting
let getAllMeeting = (req, res) => {
    EventModel.find().exec((err, result) => {
        if (err) { }
        else {
            res.send(result);
        }
    })
}
//

module.exports = {
    addUserMeeting: addUserMeeting,
    deleteUserMeeting: deleteUserMeeting,
    getUserAllMeeting: getUserAllMeeting,
    getAllMeeting: getAllMeeting,
    updateUserMeeting: updateUserMeeting,
    informUserByEmail:informUserByEmail,
    getAdminAllMeeting:getAdminAllMeeting   
}