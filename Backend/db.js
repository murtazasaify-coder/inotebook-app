const mongoose=require("mongoose");
const mongoURI="mongodb://0.0.0.0:27017/inotebook"

const connectToMongo=async ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("Connected Mongodb Successfulyy ");
     }).catch((err)=>{
        console.error(err);
    });
}

module.exports= connectToMongo;