import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export const authcheck = ()=>{
    const navigate=useNavigate()
    useEffect(()=>{

        if(!window.localStorage.getItem("user")){
            //  window.location.replace('/')
            navigate('/')
        }
    },[])
}