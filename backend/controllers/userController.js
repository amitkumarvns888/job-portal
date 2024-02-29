//here i create user ragister login and logout
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandlar from "../middleware/error.js";
import {User} from '../models/userSchema.js'
import { sendToken } from "../utils/jwtToken.js";



export const ragister = catchAsyncErrors(async (req, res, next) => {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
      return next(new ErrorHandlar("Please fill full form!"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return next(new ErrorHandlar("Email already registered!"));
    }
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
    });
    sendToken(user, 201, res, "User Registered!");
  });
  
  export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return next(new ErrorHandlar("Please provide email ,password and role."));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandlar("Invalid Email Or Password.", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandlar("Invalid Email Or Password.", 400));
    }
    if (user.role !== role) {
      return next(
        new ErrorHandlar(`User with provided email and ${role} not found!`, 404)
      );
    }
    sendToken(user, 201, res, "User Logged In!");
  });
  
  export const logout = catchAsyncErrors(async (req, res, next) => {
    res
      .status(201)
      .cookie("token", "", {  //for empty token
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logged Out Successfully.",
      });
  });
  
  
  export const getUser = catchAsyncErrors((req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });