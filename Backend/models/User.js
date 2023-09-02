const mongoose = require('mongoose');
import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    
    name:{
        type:string,
        required:true,
    },
    email:{
        type:string,
        required:true,
        unique:true
    },
    password:{
        type:string,
        required:true,
    },
    Date:{
        type : Date,
        Default:Date.Now
    }

});
module.exports=mongoose.model('user',UserSchema);