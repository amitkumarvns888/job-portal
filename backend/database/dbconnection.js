import mongoose from "mongoose";
 export const dbconnect=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbname:"MERN_STACK_JOB_SEEKING",
    }).then(()=>{
     console.log("database connected")
    }).catch((err)=>{
       console.log(`some error occured while connecting database  ${err}`)
    })
}