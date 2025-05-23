import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props)=>{
    
    const currencySymbol = "$" ;
    const backend_url = import.meta.env.VITE_BACKEND_URL 
    
    const [doctors,setDoctors] = useState([]) ;
    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false) ;
    

    const getDoctorsData = async()=>{
        try{
            const {data} = await axios.get(backend_url + '/api/doctor/list')
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

    const value = {
        doctors,
        currencySymbol,backend_url,
        token,setToken,
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;