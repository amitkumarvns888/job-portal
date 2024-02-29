import express from 'express'
import {ragister,login, logout,getUser} from '../controllers/userController.js'
import { isAuthenticated } from "../middleware/auth.js";

const routar=express.Router()


routar.post('/ragister',ragister)
routar.post('/login',login)
routar.get('/logout',logout)
routar.get("/getuser", isAuthenticated, getUser);
export  default routar;