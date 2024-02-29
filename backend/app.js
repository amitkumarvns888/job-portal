import express from 'express'
import dotenv from 'dotenv'
const app=express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

import userRoutar from './routes/userRoutar.js'
import applicationRoutar from './routes/applicationRoutar.js'
import jobRoutar from './routes/jobRoutar.js'

import {dbconnect} from './database/dbconnection.js'
import {errorMiddleware} from './middleware/error.js'

dotenv.config({path:'./config/config.env'})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['get','post','delete','put'],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/temp/',
}))


app.use("/api/v1/user",userRoutar)
app.use("/api/v1/application",applicationRoutar)
app.use("/api/v1/job",jobRoutar)


dbconnect()

app.use(errorMiddleware)
export default app;