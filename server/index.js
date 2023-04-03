import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import videoRoutes from './routes/users.js'
import commentRoutes from './routes/users.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

const connect= () =>{
     mongoose.connect(process.env.MONGODB_API_KEY).then(()=>{
           console.log("Connected to DB")}).catch((err)=>{ throw err})
   
}

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)

app.use((err,req,res,next)=>{
     const status = err.status || 500 
     const message = err.message || "something went wrong"
     return res.status(status).json({
         success: false,
         status,
         message,
     })

})

app.listen(1314,()=>{
     connect()
     console.log('connected to port 1314')
})