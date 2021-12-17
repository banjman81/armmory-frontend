import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

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
    }, [favorites])
    

    async function removeFavorite(game){
        try{
            let payload = await AxiosBackend.delete(`/api/games/delete-game/${game.gameId}`)

            setFavorites(favorites.filter(item => item.gameId !== game.id))

        }catch(e){
            console.log(e.response.data.error)
        }
    }
    return (
        <div className='profile-wrapper'>
            <div className='profile-detail'>
                <img className='profile-img' src={profileImg} alt="profileImg" />
                <table className='profile-table'>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td>{user.firstName}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{user.lastName}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                        </tr>
                    </tbody>
                </table>
                <button className='buttons blue'>Edit</button>
            </div>
            <div className='favorite-games'>
                <ul>
                    {favorites.map(item => {
                        return <li className='fav-list' key={item._id}>
                            {/* <Link className='fav-link' to={`/game/${item.gameId}`}>
                                <div className='news-div' key={item.id}>
                                    <img className='fav-thumbnail' src={item.thumbnail} alt="thunbnail" />
                                    <div className='news-text'>
                                        <h4>{item.title}</h4>
                                        <p>{item.short_description}</p>
                                    </div>
                                    <button>Remove</button>
                                </div>
                            </Link> */}
                            <div className='game'>
                                <Link className='fav-game-link' to={`/game/${item.gameId}`}>
                                <img className='fav-thumbnail' src={item.thumbnail} alt="thunbnail" />
                                <h4 className='game-title'>{item.title}</h4>
                                </Link>
                                <button className='buttons red' onClick={() => removeFavorite(item)}>Remove</button>
                            </div>
                            </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Profile
