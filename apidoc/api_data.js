define({ "api": [
  {
    "group": "meeting",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/addusermeeting",
    "title": "api for add meeting to user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adminName",
            "description": "<p>adminName of the user who scheduled meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adminId",
            "description": "<p>adminId of the user who scheduled meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the meeting . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "start",
            "description": "<p>startdate of the meeting . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "end",
            "description": "<p>endtdate of the meeting . (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     {\n        \"error\": false,\n        \"message\": \"Login Successful\",\n        \"status\": 200,\n         \"data\": {\n             \"userId\": \"owGrmB62\",\n             \"start\": \"2019-12-20T06:30:00.000Z\",\n             \"end\": \"2019-12-19T19:30:00.000Z\",\n             \"adminName\": \"adminName\",\n             \"adminId\": \"fOri8sW2\",\n             \"_id\": \"5de50d40fac844255c11be8e\",\n             \"title\": \"meeting2\"\n}\n\n    }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meeting",
    "name": "PostApiV1MeetingAddusermeeting"
  },
  {
    "group": "meeting",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/deleteusermeeting",
    "title": "api for delete meeting of the user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>_id of the user meeting. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \n\"error\": false,\n\"message\": \"meeting deleted successfuly\",\n\"status\": 200,\n\"data\": null\n\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meeting",
    "name": "PostApiV1MeetingDeleteusermeeting"
  },
  {
    "group": "meeting",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/editmeeting",
    "title": "api for add meeting to user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>_id of the meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the meeting . (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "start",
            "description": "<p>startdate of the meeting . (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "end",
            "description": "<p>endtdate of the meeting . (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"edit success\",\n     \"status\": 200,\n    \"data\": {\n        \"_id\": \"5de5058afac844255c11be8d\",\n        \"userId\": \"owGrmB62\",\n        \"start\": \"2019-12-20T06:30:00.000Z\",\n        \"end\": \"2019-12-19T19:30:00.000Z\",\n        \"adminName\": \"first last\",\n        \"adminId\": \"fOri8sW2\",\n        \"__v\": 0,\n        \"title\": \"meeting2\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meeting",
    "name": "PostApiV1MeetingEditmeeting"
  },
  {
    "group": "meeting",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/getadminallmeeting",
    "title": "api for get all  meeting of the user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adminId",
            "description": "<p>adminId of the Admin user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n            [\n                {\n                    \"_id\": \"5de5058afac844255c11be8d\",\n                    \"userId\": \"owGrmB62\",\n                    \"start\": \"2019-12-02T12:00:00.000Z\",\n                    \"end\": \"2019-12-12T13:00:00.000Z\",\n                    \"adminName\": \"first last\",\n                    \"adminId\": \"fOri8sW2\",\n                    \"__v\": 0,\n                    \"title\": \"meeting1\"\n                }\n]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meeting",
    "name": "PostApiV1MeetingGetadminallmeeting"
  },
  {
    "group": "meeting",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/getuserallmeeting",
    "title": "api for get all  meeting of the user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the Normal user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n             [\n                 {\n                    \"_id\": \"5de5058afac844255c11be8d\",\n                    \"userId\": \"owGrmB62\",\n                    \"start\": \"2019-12-02T12:00:00.000Z\",\n                    \"end\": \"2019-12-12T13:00:00.000Z\",\n                    \"adminName\": \"first last\",\n                    \"adminId\": \"fOri8sW2\",\n                    \"__v\": 0,\n                    \"title\": \"meeting1\"\n                }\n]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meeting",
    "name": "PostApiV1MeetingGetuserallmeeting"
  },
  {
    "group": "meeting",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/meeting/informbyemail",
    "title": "api for add meeting to user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the meeting . (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adminName",
            "description": "<p>adminName of the user  . (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "end",
            "description": "<p>endtdate of the meeting . (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"mail sent\",\n    \"status\": 200,\n    \"data\": {}\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meeting.js",
    "groupTitle": "meeting",
    "name": "PostApiV1MeetingInformbyemail"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgetPassword",
    "title": "api for user forget password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"mail is sent to your email address\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgetpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc\",\n        \"userDetails\": {\n        \"mobileNumber\": 2234435524,\n        \"email\": \"someone@mail.com\",\n        \"lastName\": \"Sengar\",\n        \"firstName\": \"Rishabh\",\n        \"userId\": \"-E9zxTYA8\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>userName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>isAdmin checkbox if user is signup as admin. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "coutryCode",
            "description": "<p>mobileNumber of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"singnup Successful\",\n    \"status\": 200,\n    \"data\":  {\n        firstName: 'test10',\n        lastName: 'norma',\n        mobileNumber: '8523697412',\n        email: 'test10@gmail.com',\n        password: 'SV29po#*',\n        coutryCode: 'AR',\n        userName: 'user10',\n        isAdmin: 'true' }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  }
] });
