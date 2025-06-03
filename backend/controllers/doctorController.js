import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({
      success: true,
      message: "Doctor availability changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api fot doctor availability
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET_KEY);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to get doctor appointments for doctor Panel
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    const id = docId.id;
    const appointments = await appointmentModel.find({ docId: id });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const {docId,appointmentId } = req.body;
    console.log("check->",docId.id,appointmentId)
    const appointmentData = await appointmentModel.findById(appointmentId);
    console.log("hello->",appointmentData)

    if (appointmentData && appointmentData.docId === docId.id) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment completed" });
    } else {
      res.json({ success: false, message: "Mark failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId.id) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment cancelled" });
    } else {
      res.json({ success: false, message: "Mark failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to get dashboard data for doctor panel
const doctorDashboard = async (req,res)=>{
    try{  
      
        const {id} = req.docId
        const appointments = await appointmentModel.find({docId:id})

        let earnings=0
        appointments.map((item)=>{
            if(item.payment || item.isCompleted){
                earnings += item.amount
            }
        })
        let patients = []
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments : appointments.length,
            patients : patients.length,
            latestAppointments : appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

    }catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    }
}

//API to get doctor profile for doctor panel
const doctorProfile = async (req,res)=>{
  try{

      const {id} = req.docId

      const docData = await doctorModel.findById(id).select('-password')

      res.json({success:true,docData})

    }catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    }
}

//Api to update doctor profile
const updateDoctorProfile = async(req,res)=>{
  try{
    const {docId,fees,address,available} = req.body 
    const id = docId.id

    await doctorModel.findByIdAndUpdate(id,{fees,address,available})
    res.json({success:true,message:'Profile Updated'})

  }catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    }
}

export { 
  changeAvailability, 
  doctorList, 
  loginDoctor, 
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
 };
