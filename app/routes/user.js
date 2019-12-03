const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.
 /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for user signup.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *  @apiParam {string} userName userName of the user. (body params) (required)
     *  @apiParam {string} firstName firstName of the user. (body params) (required)
     *  @apiParam {string} lastName lastName of the user. (body params) (required)
     *  @apiParam {string} isAdmin isAdmin checkbox if user is signup as admin. (body params) (required)
     *  @apiParam {string} mobileNumber mobileNumber of the user. (body params) (required)
     *  @apiParam {string} coutryCode mobileNumber of the user. (body params) (required) 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "singnup Successful",
            "status": 200,
            "data":  {
                firstName: 'test10',
                lastName: 'norma',
                mobileNumber: '8523697412',
                email: 'test10@gmail.com',
                password: 'SV29po#*',
                coutryCode: 'AR',
                userName: 'user10',
                isAdmin: 'true' }

        }
    */

    

    // params: firstName, lastName, email, mobileNumber, password,userName,isAdmin,countryCode
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            }

        }
    */

    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to logout user.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null

        }
    */

    // auth token params: userId.
    app.post(`${baseUrl}/logout`, userController.logout);
	
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/forgetPassword api for user forget password.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     *  
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "mail is sent to your email address",
            "status": 200,
            "data": null

        }
    */
        // params: email.
    app.post(`${baseUrl}/forgetPassword`, userController.recoverPassword)
    app.get(`${baseUrl}/getalluser`, userController.getAllUser);

}
