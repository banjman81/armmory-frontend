import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios'

import {UserContext} from '../context/userContext'
import profileImg from '../img/profile.png'
import './profile.css'

function Profile() {
    const {user} = useContext(UserContext)
    return (
        <div className='profile-wrapper'>
            <div className='profile-deatail'>
                <img className='profile-img' src={profileImg} alt="profileImg" />
                <h4>{user.firstName}</h4>
                <h4>{user.lastName}</h4>
                <h4>{user.email}</h4>
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
