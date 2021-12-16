import React, {useEffect, useState, useContext} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './game.css'

import AxiosBackend from '../lib/axiosBackend'

function Game() {
    const params = useParams()
    const [game, setGame] = useState({})
    const [images, setImages] = useState([])
    const [requirement, setRequirement] = useState({})
    const [favorite, setFavorite] = useState([])
    const [notFound, setNotFound] = useState(false)

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
        async function getFaves(){
            let payload = await AxiosBackend('/api/games/favorites')
            setFavorite(payload.data.payload.filter(item => Number(item.gameId) === Number(params.id)))
        }

        getFaves()
        fetchGame()
        
    }, [])

    function stripHtml(html){
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
    return (
        <div className='game-container'>
            {notFound ? <h1 className="notfound-msg">Not found</h1> : ""}
            <div style={{display : notFound ? "none" : ""}}>
            <div>
                <h1>{game.title}</h1>
                {favorite.length > 0 ? <button className="buttons red">Remove Favorite</button> : <button className="buttons green">Add Favorite</button>}
                
                <ul className='screenshots'>
                    {images ? images.map((img, index) => 
                        <li key={index}><img className='screenshot-img' src={img.image} alt="" /></li>
                        ) :console.log('none')}
                </ul>
                <h5>{stripHtml(game.description)}</h5>
            </div>
            <hr />
            <div className='comment-section'>
                <div>
                    <h3>Reviews</h3>
                    <ul className='comments'>
                        <li>
                            <h5>Some Name</h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus laborum ratione, sint dolores consequatur incidunt suscipit assumenda! Placeat incidunt possimus consequatur aliquam harum non odit reiciendis debitis maxime libero!
                        </li>
                        <li>
                            <h5>Some Name</h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus laborum ratione, sint dolores consequatur incidunt suscipit assumenda! Placeat incidunt possimus consequatur aliquam harum non odit reiciendis debitis maxime libero!
                        </li>
                        <li>
                            <h5>Some Name</h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus laborum ratione, sint dolores consequatur incidunt suscipit assumenda! Placeat incidunt possimus consequatur aliquam harum non odit reiciendis debitis maxime libero!
                        </li>
                        <li>
                            <h5>Some Name</h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus laborum ratione, sint dolores consequatur incidunt suscipit assumenda! Placeat incidunt possimus consequatur aliquam harum non odit reiciendis debitis maxime libero!
                        </li>
                        <li>
                            <h5>Some Name</h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus laborum ratione, sint dolores consequatur incidunt suscipit assumenda! Placeat incidunt possimus consequatur aliquam harum non odit reiciendis debitis maxime libero!
                        </li>
                        <li>
                            <h5>Some Name</h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus laborum ratione, sint dolores consequatur incidunt suscipit assumenda! Placeat incidunt possimus consequatur aliquam harum non odit reiciendis debitis maxime libero!
                        </li>
                        <li>
                            <h5>Some Name</h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus laborum ratione, sint dolores consequatur incidunt suscipit assumenda! Placeat incidunt possimus consequatur aliquam harum non odit reiciendis debitis maxime libero!
                        </li>
                        <li>
                            <h5>Some Name</h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus laborum ratione, sint dolores consequatur incidunt suscipit assumenda! Placeat incidunt possimus consequatur aliquam harum non odit reiciendis debitis maxime libero!
                        </li>
                        <li>
                            <h5>Some Name</h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus laborum ratione, sint dolores consequatur incidunt suscipit assumenda! Placeat incidunt possimus consequatur aliquam harum non odit reiciendis debitis maxime libero!
                        </li>
                        <li>
                            <h5>Some Name</h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur natus laborum ratione, sint dolores consequatur incidunt suscipit assumenda! Placeat incidunt possimus consequatur aliquam harum non odit reiciendis debitis maxime libero!
                        </li>
                    </ul>
                </div>
                <p>Leave a review</p>
                <div className='text-area'>
                    <div>
                        <textarea className='textarea' name="" id="" cols="50" rows="3"></textarea>
                    </div>
                    <button>Submit</button>
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
