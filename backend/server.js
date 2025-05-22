import express from "express"
import cors from "cors" //!Cross-Origin Resource Sharing
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRoute from "./routes/doctorRoute.js"

//app config

const app = express() ;
const PORT = process.env.PORT || 5000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())  //? bhai jason data smjhne layak ban ja
app.use(cors()) //? frontend or backend ko connect krne k liye

//api endpoints
app.use('/api/admin' , adminRouter)
app.use('/api/doctor' , doctorRoute)
//localhost:5000/api/admin/add-doctor

app.get("/" , (req, res)=>{
    res.send("api is working") ;
})

app.listen(PORT , ()=>{
    console.log("server is running on port " + PORT) ;
})