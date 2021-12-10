import React, {useEffect, useContext} from 'react'
import {useNavigate} from "react-router-dom"

import {UserContext} from '../context/userContext'

function Logout() {
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        function handleLogout(){
            setUser(null)
            localStorage.removeItem('loginToken')
            navigate('/')
        }
        handleLogout()
    }, [])

    

    return (
        <div>
            
        </div>
    )
}

export default Logout
