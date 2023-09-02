const mongoose = require('mongoose');
import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
    
    title:{
        type:string,
        required:true,
    },
     description:{
        type:string,
        required:true
    },
    tag:{
        type:string,
        default:'general'
    },
    Date:{
        type : Date,
        Default:Date.Now
    }

});
module.exports=mongoose.model('notes',NotesSchema);