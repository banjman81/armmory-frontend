import React, {useEffect, useContext} from 'react'
import {useNavigate} from "react-router-dom"

import {UserContext} from '../context/userContext'

function Logout() {
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        handleLogout()
    }, [])

    function handleLogout(){
        setUser(null)
        localStorage.removeItem('loginToken')
        navigate('/')
    }

    return (
        <div>
            
        </div>
    )
}

export default Logout
