import express from "express"
import cors from "cors" 
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRoute from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"

//app config

const app = express() ;
const PORT = process.env.PORT || 5000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())  
app.use(cors()) 

//api endpoints
app.use('/api/admin' , adminRouter)
app.use('/api/doctor' , doctorRoute)
app.use('/api/user',userRouter)

app.get("/" , (req, res)=>{
    res.send("api is working") ;
})

app.listen(PORT , ()=>{
    console.log("server is running on port " + PORT) ;
})
