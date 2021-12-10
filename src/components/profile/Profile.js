import React, {useContext} from 'react'

import {UserContext} from '../context/userContext'
import profileImg from '../img/profile.png'

function Profile() {
    const {user} = useContext(UserContext)
    console.log(user)
    return (
        <div>
            <img src={profileImg} alt="profileimg" />
            
            <h1>Hello {user.firstName}</h1>
        </div>
    )
}

export default Profile
