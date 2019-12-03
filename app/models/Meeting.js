'use strict'
const time = require('../libs/timeLib');
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  let meetingSchema = new Schema({
    adminName:{
      type:String
    },
    adminId:{
      type:String
    },
    userId: {
      type: String,
    },
    title:{
        type:String,
        default:'new meeting'
    },
    start:{
        type:Date
         
    },
    end:{
        type:Date
    }
     
})
mongoose.model('meeting', meetingSchema);