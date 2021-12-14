import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import './game.css'

function Game() {
    const params = useParams()
    const [game, setGame] = useState({})
    const [images, setImages] = useState([])

    useEffect(() => {
        async function fetchGame(){
            let payload = await axios.get(`https://www.mmobomb.com/api1/game?id=${params.id}`)
            setGame(payload.data)
            setImages(payload.data.screenshots)
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
            <div>
                <h3>System Requirement</h3>
            </div>
            
        </div>
    )
}

export default Game
