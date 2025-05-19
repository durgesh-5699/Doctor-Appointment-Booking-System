import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'

// Api for adding doctor
const addDoctor = async (req, res) => {
    try{
        const {name ,email , password , speciality , degree , experience , about , fees , address} = req.body
        const imageFile = req.file ;
        
        //checking for all fields
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }

        //validating email
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        if(password.length < 8){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            })
        }
        
        //hasing password
        const salt =  await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUplaod = await cloudinary.uploader.upload(imageFile.path , {resource_type : "image"})
        const imageURL = imageUplaod.secure_url 

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address : JSON.parse(address),
            image : imageURL,
            date : Date.now(),
        }

        const newDoctor = new doctorModel(doctorData) 
        await newDoctor.save()

        res.status(201).json({
            success: true,
            message: "Doctor added successfully"
        })
        
    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

//API for admin login
const loginAdmin = async (req,res) =>{
    try{
        const {email,password} = req.body 
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password , process.env.JWT_SECRET_KEY)
            res.status(200).json({success : true ,token})
        }else{
            res.json({
                success : false ,
                message : "Invalid Credentials"
            })
        }
            
    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

export {addDoctor , loginAdmin}

