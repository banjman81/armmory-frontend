import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import axios from 'axios'
import { toast } from "react-toastify";
import validator from 'validator';

import AxiosBackend from '../lib/axiosBackend'

import {UserContext} from '../context/userContext'
import profileImg from '../img/profile.png'
import './profile.css'

function Profile() {
    const {user} = useContext(UserContext)
    const [favorites, setFavorites] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [edit, setEdit] = useState(false)
    const [password, setPassword] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confrimPass, setConfirmPass] = useState('')

    useEffect(() => {
        async function getFaves(){
            let payload = await AxiosBackend('/api/games/favorites')
            setFavorites(payload.data.payload)
        }

        getFaves()
    }, [favorites])

    const notifyFailed = (input) => toast.error(`${input}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
    

    async function removeFavorite(game){
        try{
            let payload = await AxiosBackend.delete(`/api/games/delete-game/${game.gameId}`)

            setFavorites(favorites.filter(item => item.gameId !== game.id))

        }catch(e){
            console.log(e.response.data.error)
        }
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    Modal.setAppElement('div')
    
    function closeModal() {
        setDeleteModal(false)
    }

    async function handlePasswordChange(e){
        e.preventDefault()
        if(edit){
            try{

                let payload = await axios.post(`http://localhost:3001/api/users/login`, 
                {
                    email: user.email,
                    password
                })

                if(payload){
                    if(validator.isStrongPassword(newPass)){
                        if(newPass === confrimPass){
                            console.log('Password changed')
                            setPassword('')
                            setNewPass('')
                            setConfirmPass('')
                        }else{
                            notifyFailed('password does not match')
                        }
                    }else{
                        notifyFailed('Weak Password')
                    }
                }
                

            }catch(e){
                let arr = []
                for(let key in e.response.data.error){
                    arr.push(e.response.data.error[key])
                }
                if(arr[0].length === 1){
                    if(e.response.data.error == 'Incorrect login information. Please try again'){
                        notifyFailed("Incorrect old password")
                    }else{
                        notifyFailed(e.response.data.error)
                    }
                }else{
                    arr.map( error => notifyFailed(error))
                }
            }
        }else{
            console.log('keep')
            setPassword('')
            setNewPass('')
            setConfirmPass('')
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
                <div style={{textAlign : "left"}}>
                    <button className='buttons blue' onClick={() => setEdit(true)}>Change password</button>
                    <button className='buttons red' onClick={() => setDeleteModal(true)}>delete</button>
                </div>
                
                <div id='main'>
                    
                    <Modal
                        isOpen={deleteModal}
                        onRequestClose={closeModal}
                        overlayClassName="Overlay"
                        className='Modal-delete Modal'
                    >   
                        <button className='buttons del-buttons blue' onClick={() => closeModal()}>Close</button>
                        <button className='buttons del-buttons red' onClick={() => closeModal()}>Delete</button>
                    </Modal>
                </div>
                
                <div className='password-edit' style={{display: edit ? "" : "none"}}>
                    <form onSubmit={(e) => handlePasswordChange(e)}>
                        <table style={{textAlign : "left"}}>
                            <tbody>
                                <tr>
                                    <td>Old Password</td>
                                    <td><input name={password} value={password} onChange={(e) => setPassword(e.target.value)} type="password" /></td>
                                </tr>
                                <tr>
                                    <td>New Password</td>
                                    <td><input name={newPass} value={newPass} onChange={(e) => setNewPass(e.target.value)}  type="password" /></td>
                                </tr>
                                <tr>
                                    <td>Confirm Password</td>
                                    <td><input name={confrimPass} value={confrimPass} onChange={(e) => setConfirmPass(e.target.value)}  type="password" /></td>
                                </tr>
                            </tbody>
                            <button onClick={() => setEdit(false)}>close</button>
                            <button>Submit</button>
                        </table>
                    </form>
                </div>
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
