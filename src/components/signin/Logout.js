import React, {useEffect, useContext} from 'react'
import {useNavigate} from "react-router-dom"

import {UserContext} from '../context/userContext'

function Logout() {
    const {user , setUser} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        setUser({})
        localStorage.removeItem('loginToken')
        console.log(user)
        navigate('/')
    }, [])

    

    return (
        <div>
            
        </div>
    )
}

export default Logout
