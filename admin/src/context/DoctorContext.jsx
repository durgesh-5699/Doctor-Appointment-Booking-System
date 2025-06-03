import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const DoctorContext = createContext();

export const DoctorContextProvider = (props) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashData,setDashData] = useState({})
  const [profile,setProfile] = useState(false)

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backend_url + "/api/doctor/appointments",
        { headers: { dToken } }
      );

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async(appointmentId)=>{
    try{
      const {data} = await axios.post(backend_url + '/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        getAppointments()
      }else{
        toast.error(data.message)
      }
    }catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const cancelAppointment = async(appointmentId)=>{
    try{
      const {data} = await axios.post(backend_url + '/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        getAppointments()
      }else{
        toast.error(data.message)
      }
    }catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const getDashData = async()=>{
    debugger
    try{
      console.log("dToken->",dToken)
      const {data} = await axios.get(backend_url + '/api/doctor/dashboard' ,{headers:{dToken}})
      if(data?.success){
        setDashData(data.dashData)
      }else{
        toast.error(data.message)
      }
    }catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const getProfileData = async()=>{
    try{
      const {data} = await axios.get(backend_url+'/api/doctor/profile',{headers:{dToken}})
      if(data.success){
        setProfile(data.docData)
        console.log(data.docData)
      }
    }catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const value = {
    backend_url,
    dToken,
    setDToken,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,setDashData,
    getDashData,
    profile,setProfile,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};
