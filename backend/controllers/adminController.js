import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

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
        if(!validator.isEmail(email)){ //!important
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
        const imageUplaod = await cloudinary.uploader.upload(imageFile.path , {resource_type : "image"}) //!important
        const imageURL = imageUplaod.secure_url //!important

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

        const newDoctor = new doctorModel(doctorData) //!important
        await newDoctor.save() //!important

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
            const token = jwt.sign(email+password , process.env.JWT_SECRET_KEY) //!important
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


// APi to get all doctors list for admin panel
const allDoctors = async (req,res) =>{
    try{
        const doctors = await doctorModel.find({}).select("-password")
        res.json({success : true , doctors})
    }catch(error){
        console.log(error) 
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
}

//API to get all appointments list
const appointmentsAdmin = async(req,res)=>{

    try{
        const appointments = await appointmentModel.find({})
        res.json({success:true , appointments})    
    }catch(error){
        console.log(error) 
        res.status(500).json({success : false ,message : error.message})
    }
}

//Api for appointment cancellation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //releasing doctor slot
    const { docId, slotDate, slotTime } = appointment;

    const docData = await doctorModel.findById(docId);

    let slotsBooked = docData.slotsBooked;
    slotsBooked[slotDate] = slotsBooked[slotDate].filter(
      (slot) => slot !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slotsBooked });

    res.json({ success: true, message: "Appointment cancelled successfully" });
  }catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to get dashboard data for admin panel
const adminDashboard = async(req,res)=>{
    try{
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors : doctors.length,
            appointments : appointments.length,
            patients : users.length,
            latestAppointments : appointments.reverse().slice(0,5)
        }

        res.json({success:true , dashData})

    }catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export {addDoctor , loginAdmin , allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}

