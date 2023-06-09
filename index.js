import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import videoRoutes from './routes/videos.js'
import commentRoutes from './routes/comments.js'
import cookieParser from 'cookie-parser'
import path from 'path'

const app = express()

dotenv.config()


app.use(express.static('client/build'));

app.get('/', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   })

const connect= () => {
     mongoose.connect(process.env.MONGODB_API_KEY).then(()=>{
           console.log("Connected to DB")}).catch((err)=>{ throw err})
}

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)


app.get("*", (req, res) => {
     res.sendFile(path.join(process.cwd(), "client", "build", "index.html"));
   });

app.use((err,req,res,next)=>{
     const status = err.status || 500 
     const message = err.message || "something went wrong"
     return res.status(status).json({
         success: false,
         status,
         message,
     })
})
//test nodeman

const port = process.env.PORT || 1314; // default port is 3000
 // default port is 1314
app.listen(port,()=>{
     connect()
     console.log(`connected to port ${port}`)
})