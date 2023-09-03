import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export const LoginNav = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (window.localStorage.getItem("user")) {

            if (JSON.stringify(window.localStorage.getItem("user")).isManager) {
                navigate('/welcome')
            }else if (!JSON.stringify(window.localStorage.getItem("user")).isManager) {
                navigate('/worker-dashboard')
            }
        }
    }, [])
}