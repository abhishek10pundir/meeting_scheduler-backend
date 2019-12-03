const express = require('express');
const router = express.Router();
const meetingHandleController = require("./../../app/controllers/meetingHandle");
const appConfig = require("./../../config/appConfig")


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meeting`;
     /**
     * @apiGroup meeting
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/addusermeeting api for add meeting to user.
     *
     * @apiParam {string} adminName adminName of the user who scheduled meeting. (body params) (required)
     * @apiParam {string} adminId adminId of the user who scheduled meeting. (body params) (required)
     * @apiParam {string} userId userId of the user . (body params) (required)
     * @apiParam {string} title title of the meeting . (body params) (required)
     * @apiParam {string} start startdate of the meeting . (body params) (required)
     *  @apiParam {string} end endtdate of the meeting . (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
             "data": {
                 "userId": "owGrmB62",
                 "start": "2019-12-20T06:30:00.000Z",
                 "end": "2019-12-19T19:30:00.000Z",
                 "adminName": "adminName",
                 "adminId": "fOri8sW2",
                 "_id": "5de50d40fac844255c11be8e",
                 "title": "meeting2"
    }

        }
    */

    // params: adminName, adminId,userId,title,end,start
    app.post(`${baseUrl}/addusermeeting`, meetingHandleController.addUserMeeting);
    /**
     * @apiGroup meeting
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/deleteusermeeting api for delete meeting of the user.
     *
     * @apiParam {string} _id _id of the user meeting. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            
        "error": false,
        "message": "meeting deleted successfuly",
        "status": 200,
        "data": null


        }
    */

    // params: _id
    app.post(`${baseUrl}/deleteusermeeting/`, meetingHandleController.deleteUserMeeting);
      /**
     * @apiGroup meeting
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/getuserallmeeting api for get all  meeting of the user.
     *
     * @apiParam {string} userId userId of the Normal user. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
             [
                 {
                    "_id": "5de5058afac844255c11be8d",
                    "userId": "owGrmB62",
                    "start": "2019-12-02T12:00:00.000Z",
                    "end": "2019-12-12T13:00:00.000Z",
                    "adminName": "first last",
                    "adminId": "fOri8sW2",
                    "__v": 0,
                    "title": "meeting1"
                }
]
        }
    */

    // params: userId
    app.post(`${baseUrl}/getuserallmeeting`, meetingHandleController.getUserAllMeeting);
      /**
     * @apiGroup meeting
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/getadminallmeeting api for get all  meeting of the user.
     *
     * @apiParam {string} adminId adminId of the Admin user. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            [
                {
                    "_id": "5de5058afac844255c11be8d",
                    "userId": "owGrmB62",
                    "start": "2019-12-02T12:00:00.000Z",
                    "end": "2019-12-12T13:00:00.000Z",
                    "adminName": "first last",
                    "adminId": "fOri8sW2",
                    "__v": 0,
                    "title": "meeting1"
                }
]
        }
    */

    // params: adminId
    app.post(`${baseUrl}/getadminallmeeting`, meetingHandleController.getAdminAllMeeting);
   /**
     * @apiGroup meeting
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/editmeeting api for add meeting to user.
     *
     * @apiParam {string} _id _id of the meeting. (body params) (required)
     * @apiParam {string} title title of the meeting . (body params)  
     * @apiParam {string} start startdate of the meeting . (body params)  
     *  @apiParam {string} end endtdate of the meeting . (body params)  
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "edit success",
             "status": 200,
            "data": {
                "_id": "5de5058afac844255c11be8d",
                "userId": "owGrmB62",
                "start": "2019-12-20T06:30:00.000Z",
                "end": "2019-12-19T19:30:00.000Z",
                "adminName": "first last",
                "adminId": "fOri8sW2",
                "__v": 0,
                "title": "meeting2"
            }

        }
    */

    // params:  _id,title,end,start
    app.post(`${baseUrl}/editmeeting`, meetingHandleController.updateUserMeeting);
 /**
     * @apiGroup meeting
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/informbyemail api for add meeting to user.
     *
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} title title of the meeting . (body params)  
     * @apiParam {string} adminName adminName of the user  . (body params)  
     *  @apiParam {string} end endtdate of the meeting . (body params)  
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "mail sent",
            "status": 200,
            "data": {}

        }
    */

    // params:  userId,title,adminName
    app.post(`${baseUrl}/informbyemail`, meetingHandleController.informUserByEmail);
    app.get(`${baseUrl}/getallmeeting`, meetingHandleController.getAllMeeting);
}