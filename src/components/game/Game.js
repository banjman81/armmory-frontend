import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import './game.css'

function Game() {
    const params = useParams()
    const [game, setGame] = useState({})

    useEffect(() => {
        async function fetchGame(){
            let payload = await axios.get(`https://www.mmobomb.com/api1/game?id=${params.id}`)
            setGame(payload.data)
        }

        fetchGame()
        
    })
    return (
        <div className='game-container'>
            <h1>{game.title}</h1>
            <img src={game.thumbnail} alt="thumbnail" />
        </div>
    )
}

export default Game
