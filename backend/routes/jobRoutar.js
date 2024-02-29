import express from 'express'
import {getAllJobs,postJob,getMyJobs,updateJob,deleteJob} from '../controllers/jobController.js'
import { isAuthenticated } from "../middleware/auth.js";
const routar=express.Router()

routar.get('/getall',getAllJobs);
routar.post('/post',isAuthenticated,postJob)
routar.get('/getMyJobs',isAuthenticated,getMyJobs)
routar.put('/update/:id',isAuthenticated,updateJob)
routar.delete('/delete/:id',isAuthenticated,deleteJob)


export default routar;