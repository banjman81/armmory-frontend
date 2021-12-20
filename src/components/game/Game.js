import React, {useEffect, useState, useContext} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './game.css'

import { UserContext } from '../context/userContext'

import AxiosBackend from '../lib/axiosBackend'

function Game() {
    const params = useParams()
    const [game, setGame] = useState({})
    const [images, setImages] = useState([])
    const [requirement, setRequirement] = useState({})
    const [favorite, setFavorite] = useState([])
    const [notFound, setNotFound] = useState(false)
    const [comment, setComment] = useState('')
    const [gameComments, setGameComments] = useState([])

    const {user} = useContext(UserContext)

    const navigate =useNavigate()

    useEffect(() => {
        async function fetchGame(){
            try{
                let payload = await axios.get(`https://www.mmobomb.com/api1/game?id=${params.id}`)
                setGame(payload.data)
                setImages(payload.data.screenshots)
                setRequirement(payload.data.minimum_system_requirements)
            }catch(e){
                setNotFound(true)
            }
            
        }
        if(user?.username){
            async function getFaves(){
                try{
                    let payload = await AxiosBackend.get('/api/games/favorites')
                    setFavorite(payload.data.payload.filter(item => Number(item.gameId) === Number(params.id)))
                }catch(e){
                    console.log(e.response)
                }
                
            }
            getFaves()
        }
        

        
        fetchGame()
        findComments()
    }, [gameComments])

    

    async function findComments(){
        try{
            let foundComments = await axios.get(`http://localhost:3001/api/comments/find-comment/${params.id}`)
            setGameComments(foundComments.data.payload)
        }catch(e){
            console.log(e.response)
        }
    }

    function stripHtml(html){
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    async function addFavorite(game){
        try{
            let payload = await AxiosBackend.post(`/api/games/add-game`,
            {
                title: game.title,
                gameId: game.id,
                thumbnail: game.thumbnail,
                platform : game.platform,
                genre : game.genre,
                publisher : game.publisher,
                shortDescription : game.short_description
            })

        }catch(e){
            console.log(e.response.data.error)
        }
        
    }

    async function removeFavorite(game){
        try{
            let payload = await AxiosBackend.delete(`/api/games/delete-game/${game.id}`)

            setFavorite(favorite.filter(item => item.gameId !== game.id))

        }catch(e){
            console.log(e.response.data.error)
        }
    }

    async function handleSubmitComment(e){
        try{
            let payload = await axios.post('http://localhost:3001/api/comments/add-comment',
            {
                comment,
                id: game.id
            },
            {headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}})
            console.log(payload)
            setComment('')
        }catch(e){
            console.log(e.response.data.error)
        }
    }

    async function handleDeleteComment(id){
        try{
            let payload = await axios.delete(`http://localhost:3001/api/comments/delete-comment/${id}`,
            {headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}})


        }catch(e){
            console.log(e.response.data.error)
        }
    }

    return (
        <div className='game-container'>
            {notFound ? <h1 className="notfound-msg">Not found</h1> : ""}
            <div style={{display : notFound ? "none" : ""}}>
            <div>
                <h1>{game.title}</h1>
                <div style={{display : user?.username ? "" : "none"}}>
                    {favorite.length > 0 ? <button className="buttons red" onClick={() => removeFavorite(game)}>Remove Favorite</button> : <button className="buttons green" onClick={() => addFavorite(game)}>Add Favorite</button>}
                </div>
                <div style={{margin : "10px"}}>
                    <a className='buttons download' href={game.profile_url} target="_Blank">Download</a>
                </div>
                
                <ul className='screenshots'>
                    {images ? images.map((img, index) => 
                        <li key={index}><img className='screenshot-img' src={img.image} alt="" /></li>
                        ) :console.log('none')}
                </ul>
                <h5 className='full-desc'>{stripHtml(game.description)}</h5>
            </div>
            <hr />
            <div  className='comment-section'>
                <div>
                    <h3>Reviews</h3>
                    <ul onLoad={() => console.log('bottom')} className='comments'>
                        <li>
                            <h5>AnonUser123</h5>
                            <p>This game is the best!</p>
                        </li>
                        <li>
                            <h5>Noobmaster69</h5>
                            <p>I dont likethis one, players are bad.</p>
                        </li>
                        {gameComments.map((item, index)=> {
                            return(
                                <li className='comment-banner' style={{background: item.user.username == user.username ? "#dbd6bf50" : ""}} key={index}>
                                    <div className='comment-content'>
                                        <h5>{item.user.username}</h5>
                                        <p>{item.content}</p>
                                    </div>
                                    {item.user.username == user.username ?<button className='comment-delete' onClick={() => handleDeleteComment(item._id)}>X</button>: ""}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <p>Leave a review</p>
                <div style={{display : user?.username? "" : "none"}} className='text-area'>
                    <div>
                        <textarea className='textarea' name={comment}  value={comment} onChange={(e) => setComment(e.target.value)} cols="50" rows="3"></textarea>
                    </div>
                    <button onClick={() => handleSubmitComment()}>Submit</button>
                </div>
                
            </div>
            <hr />
            <div className='info-sec'>
                <div>
                    <h3>System Requirement</h3>
                    <table className='system-table'>
                        <tbody>
                            <tr>
                                <td>Operating System</td>
                                <td>{requirement.os || ""}</td>
                            </tr>
                            <tr>
                                <td>CPU</td>
                                <td>{requirement.processor  || ""}</td>
                            </tr>
                            <tr>
                                <td>RAM</td>
                                <td>{requirement.memory  || ""}</td>
                            </tr>
                            <tr>
                                <td>GPU</td>
                                <td>{requirement.graphics  || ""}</td>
                            </tr>
                            <tr>
                                <td>storage</td>
                                <td>{requirement.storage  || ""}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Details</h3>
                    <table className='system-table'>
                        <tbody>
                            <tr>
                                <td>Genre</td>
                                <td>{game.genre}</td>
                            </tr>
                            <tr>
                                <td>Platform</td>
                                <td>{game.platform}</td>
                            </tr>
                            <tr>
                                <td>Publisher</td>
                                <td>{game.publisher}</td>
                            </tr>
                            <tr>
                                <td>Developer</td>
                                <td>{game.developer}</td>
                            </tr>
                            <tr>
                                <td>Release Date</td>
                                <td>{game.release_date}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Game
