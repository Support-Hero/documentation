import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export const managerAuthcheck = ()=>{
    const navigate=useNavigate()
    useEffect(()=>{

        if(!window.localStorage.getItem("user") || !JSON.parse(window.localStorage.getItem("user")).isManager ){
            //  window.location.replace('/')
            navigate('/')
        }
    },[])
}