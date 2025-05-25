import validator from 'validator';
import bcrypt, { hash } from 'bcrypt';
import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';


//Api to register user

const registerUser = async (req , res)=>{
    try{
        const {name , email , password} = req.body 
        if(!name || !email || !password){
            return res.json({success : false , message : "missing details"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false , message : "enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false , message : "enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const userData = {
            name , email , password : hashedPassword
        }

        const newUser = await UserModel(userData)
        const user = await newUser.save() ;

        const token = jwt.sign({id : user._id} , process.env.JWT_SECRET_KEY)
        res.json({success:true , token})

    }catch(error){
        console.log(error)
        res.json({success:false , message : error.message})
    }
}

//Api for user login
const loginUSer = async (req,res)=>{

    try{
        const {email,password} = req.body
        const user = await UserModel.findOne({email})

        console.log(user)
        if(!user){
            return res.json({success:false , message : "user does not exist"} )
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id} , process.env.JWT_SECRET_KEY)
            res.json({success:true , token})
        }else{
            res.json({success:false , message : "invalid credentials"})
        }

    }catch(error){
        console.log(error)
        res.json({success:false , message : error.message})
    }
    
}

//Api to get user profile
const getProfile = async(req,res)=>{
    try{
        const userId = req.userId
        const userData = await UserModel.findById(userId).select(['-password'])
        res.json({success:true , userData})

    }catch(error){
        console.log(error)
        res.json({success:false , message : error.message})
    }
}



//Api to update user profile
const updateProfile = async(req,res)=>{
    try{
        const userId = req.userId 
        const {name , phone , address , dob , gender} = req.body 
        const imageFile = req.file 

        if(!name || !phone || !gender || !dob){
            return res.json({success : false , message : "Data missing"})
        }

        await UserModel.findByIdAndUpdate(userId , {name , phone , address:JSON.parse(address),dob,gender})

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type:'image'})
            const imageURL = imageUpload.secure_url
            
            await UserModel.findByIdAndUpdate(userId , {image : imageURL})
        }

        res.json({success:true , message : "Profile updated"})

    }catch(error){
        console.log(error)
        res.json({success:false , message : error.message})
    }
}

//Api to book appointment
const bookAppointment = async(req,res)=>{
    try{
        const {docId , slotDate , slotTime} = req.body
        const userId = req.userId ;
        
        const docData = await doctorModel.findById(docId).select("-password")

        if(!docData.available){
            return res.json({success:false , message:'Doctor not available'})
        }

        let slotsBooked = docData.slotsBooked

        if(slotsBooked[slotDate]){
            if(slotsBooked[slotDate].includes(slotTime)){
                return res.json({success:false , message:'Doctor not available'})
            }else{
                slotsBooked[slotDate].push(slotTime) ;
            }
        }else{
            slotsBooked[slotDate] = [] ;
            slotsBooked[slotDate].push(slotTime)
        }

        const userData = await UserModel.findById(userId).select("-password")

        delete docData.slots_booked 

        const appointmentData = {
            userId ,
            docId ,
            userData ,
            docData ,
            amount : docData.fees ,
            slotDate ,
            slotTime ,
            date : Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId , {slotsBooked} )

        res.json({success: true , message : "Appointment Booked"})

    }catch(error){
        console.log(error)
        res.json({success:false , message : error.message})
    }
}


export {registerUser,loginUSer,getProfile,updateProfile,bookAppointment}