import React, {useContext, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import axios from 'axios'
import { toast } from "react-toastify";
import validator from 'validator';

import AxiosBackend from '../lib/axiosBackend'

import {UserContext} from '../context/userContext'
import profileImg from '../img/profile.png'
import './profile.css'

function Profile() {
    const navigate = useNavigate()
    const {user, setUser, favorites, setFavorites} = useContext(UserContext)
    // const [favorites, setFavorites] = useState(favorites)
    const [deleteModal, setDeleteModal] = useState(false);
    const [edit, setEdit] = useState(false)
    const [password, setPassword] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confrimPass, setConfirmPass] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getFaves(){
            let payload = await AxiosBackend('/api/games/favorites')
            setFavorites(payload.data.payload)
        }

        getFaves()
    }, [favorites])

    const notifySuccess = () => toast.success('Password changed!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

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

                let payload = await axios.post(`/api/users/login`, 
                {
                    email: user.email,
                    password
                })

                if(payload){
                    if(validator.isStrongPassword(newPass)){
                        if(newPass === confrimPass){
                            try{
                                const changedPass = await axios.put('/api/users/changepass',
                                {
                                    password : newPass
                                },
                                {headers : {"Authorization" : `Bearer ${payload.data.token}`}})
                                setPassword('')
                                setNewPass('')
                                setConfirmPass('')
                                setEdit(false)
                                notifySuccess()
                            }catch(e){
                                console.log(e.response)
                            }
                            
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

    async function handleDeleteUser(){
        setIsLoading(true)
        try{
            const deletedUser = await axios.delete('/api/users/delete-user',
            {headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}})
            console.log(deletedUser)
            setIsLoading(false)
            localStorage.removeItem('loginToken')
            setUser({})
            navigate('/')
        }catch(e){
            let arr = []
            for(let key in e.response.data.error){
                arr.push(e.response.data.error[key])
            }
            if(arr[0].length === 1){
                notifyFailed(e.response.data.error)
            }else{
                arr.map( error => notifyFailed(error))
            }
        }
    }


    return (
        <>{ isLoading ? ("Deleting...") :
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
                        <tr>
                            <td>Role</td>
                            <td>{user.role}</td>
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
                    >   <div>
                        <div>
                            <h1>CONFIRM TO DELETE</h1>
                        </div>
                            <button className='buttons del-buttons blue' onClick={() => closeModal()}>Close</button>
                            <button className='buttons del-buttons red' onClick={() => handleDeleteUser()}>Delete</button>
                        </div>
                        
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
                            <button className='buttons' style={{color: "black"}} onClick={() => setEdit(false)}>close</button>
                            <button className='buttons red'>Submit</button>
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
    }</>
    )
}

export default Profile
