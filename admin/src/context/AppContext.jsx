import { createContext, useState } from "react";

export const AppContext = createContext() ;

export const AppContextProvider = (props) => { 

    const currency = "$"
    
    const calculateAge = (dob) =>{
        const date = new Date()
        const birthDate = new Date(dob)
        let age = date.getFullYear() - birthDate.getFullYear()
        return age
    }

    const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const slotDateFormat=(slotDate)=>{
        const dateArray = slotDate.split("_")
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }
    const value = {
        calculateAge,
        slotDateFormat,
        currency
    }
    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}