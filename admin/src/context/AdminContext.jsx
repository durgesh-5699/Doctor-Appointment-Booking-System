import { createContext, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const AdminContext = createContext() ;

export const AdminContextProvider = (props) => {
    
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '') ;
        const backend_url = import.meta.env.VITE_BACKEND_URL 

        const [doctors,setDoctors] = useState([]) ;
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
        
        const value = {
            aToken,setAToken,
            backend_url,doctors,
            getAllDoctors,changeAvailability,
        }
    return (<AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>)
}