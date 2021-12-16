import React, {useContext, useState, useEffect} from 'react'

import AxiosBackend from '../lib/axiosBackend'

import {UserContext} from '../context/userContext'
import profileImg from '../img/profile.png'
import './profile.css'

function Profile() {
    const {user} = useContext(UserContext)
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        async function getFaves(){
            let payload = await AxiosBackend('/api/games/favorites')
            setFavorites(payload.data.payload)
        }

        getFaves()
    })
    return (
        <div className='profile-wrapper'>
            <div className='profile-detail'>
                <img className='profile-img' src={profileImg} alt="profileImg" />
                <h4>{user.firstName}</h4>
                <h4>{user.lastName}</h4>
                <h4>{user.email}</h4>
            </div>
            <div className='favorite-games'>
                <ul>
                    {favorites.map(item => {
                        return <li className='fav-list' key={item._id}>
                                <div className='news-div' key={item.id}>
                                    <img className='fav-thumbnail' src={item.thumbnail} alt="thunbnail" />
                                    <div className='news-text'>
                                        <h4>{item.title}</h4>
                                        <p>{item.short_description}</p>
                                    </div>
                                    
                                </div>
                            </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Profile
