import { createContext, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const AdminContext = createContext() ;

export const AdminContextProvider = (props) => {
    
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '') ;
    const [doctors,setDoctors] = useState([])   
    const [appointments,setAppointment] = useState([])
    const [dashData,setDashData] = useState({})

    const backend_url = import.meta.env.VITE_BACKEND_URL 
    
        const getAllDoctors = async ()=>{
            try{
                const {data} = await axios.post(backend_url + '/api/admin/all-doctors',{},{headers : {aToken}})
                console.log("data -> ",data)
                if(data.success){
                    setDoctors(data.doctors) ;
                }else{
                    toast.error(data.message) 
                }
            }catch(error){
                console.log(error)
                toast.error(error.message)
            }
        }

        const changeAvailability = async (docId) => {
            try{
                const {data} = await axios.post(backend_url + '/api/admin/change-availability',{docId},{headers : {aToken}})
                if(data.success){
                    toast.success(data.message)
                    getAllDoctors()
                }else{
                    toast.error(data.message)
                }
            }catch(error){
                toast.error(error.message)

            }
        }

        const getAllAppointments = async()=>{
            try{
                const {data} = await axios.get(backend_url + "/api/admin/appointments",{headers:{aToken}})
                if(data.success){
                    setAppointment(data.appointments)
                }else{
                    toast.error(error.message)
                }
            }catch(error){
                console.log(error)
                toast.error(error.message)
            }
        }

        const cancelAppointment = async (appointmentId)=>{
            try{
                const {data} = await axios.post(backend_url + "/api/admin/cancel-appointment" ,{appointmentId}, {headers:{aToken}})
                if(data.success){
                    toast.success(data.message)
                    getAllAppointments()
                }else{
                    toast.error(error.message)
                }
            }catch(error){
                console.log(error)
                toast.error(error.message)
            }
        }

        const getDashData = async()=>{
            try{
                const {data} = await axios.get(backend_url + "/api/admin/dashboard" , {headers:{aToken}})
                if(data.success){
                    setDashData(data.dashData)
                }else{
                    toast.error(error.message)
                }
            }catch(error){
                console.log(error)
                toast.error(error.message)
            }
        }

        
        
        const value = {
            aToken,setAToken,
            backend_url,doctors,
            getAllDoctors,changeAvailability,
            appointments,setAppointment,
            getAllAppointments,cancelAppointment,
            dashData,getDashData
        }

    return (<AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>)
}