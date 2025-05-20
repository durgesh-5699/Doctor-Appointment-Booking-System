import { createContext, useState } from "react";

export const AdminContext = createContext() ;

export const AdminContextProvider = (props) => {
    
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '') ;
        const backend_url = import.meta.env.VITE_BACKEND_URL 
        
        const value = {
            aToken,setAToken,
            backend_url
        }
    return (<AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>)
}