import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

 const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide name"],
        minlength:[3,'Name contain at least  3 charector'],
        maxlength:[30,"Name cannot exced 30 charector"],
    },
    email:{
        type:String,
        required:[true,"Please provide email"],
        validator:[validator.isEmail,"Please provide a validate email"],
    },
    phone:{
        type:Number,
        required:[true,"please provide phone number"],

    },
    password:{
        type:String,
        required:[true,"please provide a password"],
        minlength:[4,"password contain atleast 4 charector"],
        maxlength:[15,"password contain maximum 10 charector"],
        select:false
    },
    role:{
        type:String,
        required:[true,"please provide a role"],
        enum:["job seekar","Employer"]
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
})

//hashing the password

userSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password=await bcrypt.hash(this.password,10);
})


//comparing password
userSchema.methods.comparePassword= async function(enterdpassword){
    return bcrypt.compare(enterdpassword,this.password);
}

//json web token;
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

export const User = mongoose.model("User", userSchema);