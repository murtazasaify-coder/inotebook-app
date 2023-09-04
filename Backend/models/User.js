const mongoose = require('mongoose');
// import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:Number,
        required:true,
    },
    Date:{
        type : Date,
        Default:Date.Now
    }

});
module.exports=mongoose.model('user',UserSchema);