import React, {useContext} from 'react'

import {UserContext} from '../context/userContext'
import profileImg from '../img/profile.png'
import './profile.css'

function Profile() {
    const {user} = useContext(UserContext)
    console.log(user)
    return (
        <div className='profile-wrapper'>
            <div>
                <img src={profileImg} alt="profileimg" />
                <h1>Hello {user.firstName}</h1>
            </div>
            <div>
                <ul>
                    <li>stuff</li>
                    <li>stuff</li>
                    <li>stuff</li>
                    <li>stuff</li>
                    <li>stuff</li>
                    <li>stuff</li>
                </ul>
            </div>
        </div>
    )
}

export default Profile
