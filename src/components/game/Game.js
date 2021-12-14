import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import './game.css'

function Game() {
    const params = useParams()
    const [game, setGame] = useState({})
    const [images, setImages] = useState([])
    const [requirement, setRequirement] = useState({})

    useEffect(() => {
        async function fetchGame(){
            let payload = await axios.get(`https://www.mmobomb.com/api1/game?id=${params.id}`)
            setGame(payload.data)
            setImages(payload.data.screenshots)
            setRequirement(payload.data.minimum_system_requirements)
        }

        fetchGame()
        
    }, [])

    function stripHtml(html){
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
    return (
        <div className='game-container'>
            <div>
                <h1>{game.title}</h1>
                <ul className='screenshots'>
                    {images ? images.map((img, index) => 
                        <li key={index}><img className='screenshot-img' src={img.image} alt="" /></li>
                        ) :console.log('none')}
                </ul>
                <h5>{stripHtml(game.description)}</h5>
            </div>
            <hr />
            {game ? <div className='info-sec'>
                <div>
                    <h3>System Requirement</h3>
                    <table className='system-table'>
                        <tbody>
                            <tr>
                                <td>Operating System</td>
                                <td>{requirement.os}</td>
                            </tr>
                            <tr>
                                <td>CPU</td>
                                <td>{requirement.processor}</td>
                            </tr>
                            <tr>
                                <td>RAM</td>
                                <td>{requirement.memory}</td>
                            </tr>
                            <tr>
                                <td>GPU</td>
                                <td>{requirement.graphics}</td>
                            </tr>
                            <tr>
                                <td>storage</td>
                                <td>{requirement.storage}</td>
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
            </div> : ""}
            
        </div>
    )
}

export default Game
