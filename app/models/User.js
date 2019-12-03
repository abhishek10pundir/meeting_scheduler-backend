'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    required:true
  },
  lastName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required:true
  },
  plain:{
    type:String
  },
  userName:{
    type:String
  },
  isAdmin:{
    type:String,
    default:''
  },
  email: {
    type: String,
    required:true
  },
  mobileNumber: {
    type: Number,
    required:true
  },
  coutryCode:{
    type:String,
    required:true
  },
  
  createdOn :{
    type:Date,
    default:""
  }


})


mongoose.model('User', userSchema);