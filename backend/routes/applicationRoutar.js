import express from 'express'
import {employerGetAllApplications,jobseekerGetAllApplications,jobseekerDeleteApplication,postApplication} from '../controllers/applicationController.js'

import { isAuthenticated } from "../middleware/auth.js";

const routar=express.Router()


routar.get('/jobseekar/getall',isAuthenticated,jobseekerGetAllApplications)
routar.get('/employer/getall',isAuthenticated,employerGetAllApplications)
routar.delete('/delete/:id',isAuthenticated,jobseekerDeleteApplication)
routar.post('/post',isAuthenticated,postApplication)
export default routar;