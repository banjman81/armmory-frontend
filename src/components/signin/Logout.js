import React, {useEffect, useContext} from 'react'
import {useNavigate} from "react-router-dom"

import {UserContext} from '../context/userContext'

function Logout() {
    const {setUser,  setFavorites} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        setUser({})
        setFavorites([])
        localStorage.removeItem('loginToken')
        navigate('/')
    }, [])

    

    return (
        <div>
            
        </div>
    )
}

export default Logout
