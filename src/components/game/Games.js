import axios from "axios";
import React, { useState, useEffect, useContext} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import './game.css'

import { UserContext } from "../context/userContext";
import AxiosBackend from "../lib/axiosBackend";


export function Games(){
    const navigate = useNavigate()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [gameArray, setGameArray] = useState([])
    const [option, setOption] = useState('')
    const [filteredGenre, setFilteredGenre] = useState([])
    const [filterOption, setFilterOption] = useState('')
    // const [favorites, setFavorites] = useState([])
    const [change, setChanges] = useState(false)
    const [defaultArray, setDefaultArray] = useState([])
    const currentPage = params.page
    let genre = []
    
    const {user, favorites, setFavorites} = useContext(UserContext)

    useEffect(() => {
        // console.log(favorites)
        setIsLoading(true)
        async function getFaves(){
        let payload = await AxiosBackend('/api/games/favorites')
        setFavorites(payload.data.payload)
        }
        initialLoad()
        getFaves()
        setTimeout(() => {
            setIsLoading(false)
        }, 500);
        
    }, [])

    
    

    const handleFilter = async e => {
        e.preventDefault()
        if(option.length > 0){
            fetchMmos(`https://www.mmobomb.com/api1/games?sort-by=${option}`)
        }
        if(filterOption.length > 0){
            const temp = defaultArray
            const filteredArray = temp.filter(game => game.genre === filterOption)
            setGameArray(filteredArray)
        }
    }

    async function initialLoad(){
        setIsLoading(true)
        try{
            let payload = await axios.get('https://mmo-games.p.rapidapi.com/games', {
                    headers: {
                        'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com',
                        'X-RapidAPI-Key': '5c90bd75d5mshf619a3c3f092c0bp175212jsn17382299e947'
                    }
                }
            )
            setGameArray(payload.data)
            setDefaultArray(payload.data)
            payload.data.map(item => {
                return genre.push(item.genre)
            })
            const uniqueGenre = Array.from(new Set(genre))
            setFilteredGenre(uniqueGenre)

        }catch(err){
            console.log(err)
        }

    }

    async function fetchMmos(url){
        setIsLoading(true)
        try{
            let payload = await AxiosBackend.get(url)
            setGameArray(payload.data)
            setIsLoading(false)

        }catch(err){
            console.log(err)
        }
    }

    async function addFavorite(game){
        try{
            await AxiosBackend.post(`/api/games/add-game`,
            {
                title: game.title,
                gameId: game.id,
                thumbnail: game.thumbnail,
                platform : game.platform,
                genre : game.genre,
                publisher : game.publisher,
                shortDescription : game.short_description
            })

            setChanges(!change)
            navigate('/profile')
        }catch(e){
            console.log(e.response.data.error)
        }
        
    }

    async function removeFavorite(game){
        try{
            await AxiosBackend.delete(`/api/games/delete-game/${game.id}`)

            setFavorites(favorites.filter(item => item.gameId !== game.id))
            setChanges(!change)

        }catch(e){
            console.log(e.response.data.error)
        }
    }
    
    return(
        <div className="game-container">
            <div className="sort-form">
                <form onSubmit={(e) => handleFilter(e)}>
                    <select defaultValue={'DEFAULT'} onChange={(e) => setOption(e.target.value)}>
                        <option value="DEFAULT" disabled>sort display lists</option>
                        <option value="relavance">relavance</option>
                        <option value="release-date">release date</option>
                        <option value="alphabetical">alphabetical</option>
                    </select>
                    <select defaultValue={'DEFAULT'} onChange={(e) => setFilterOption(e.target.value)}>
                        <option value="DEFAULT" disabled>filter genre</option>
                        {filteredGenre.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })}
                    </select>
                    
                    <button style={{marginLeft: "10px"}}>select</button>
                </form>
            </div>
            <div className="lists-container">
                {isLoading || user?.favoriteGames ? <div className="loading-page"><div className="loader"></div></div> :(
                    gameArray.slice(currentPage*20 - 20, currentPage * 20).map((item) => {
                        if(item.short_description.length > 130){
                            item.short_description = `${item.short_description.slice(0, 130)}...`
                        }
                        return(
                        <div key={item.id} className="item-container">
                            <Link className="game-link" to={`/game/${item.id}`} params={{id: item.id}}>
                                <h3>{item.title}</h3>
                                <img src={item.thumbnail} alt="img" />
                                <p>{item.short_description}</p>
                            </Link>
                            {
                                user?.username ? favorites.filter(fav => fav.gameId === item.id).length > 0 ? <button className="buttons red" onClick={() => removeFavorite(item)}>Remove Favorite</button>:<button className="buttons green" onClick={(e) => 
                                    {
                                        addFavorite(item)
                                        if(e.target.className === "buttons green"){
                                            return <button className="buttons red" onClick={() => removeFavorite(item)}>Remove Favorite</button>
                                        }
                                        
                                    }
                                }>Add Favorite</button> : ""
                            }
                            
                        </div>
                        )
                        
                    })
                )}
                <div className="page-selector">
                    <Link className="page-btn" to={Number(currentPage) === 1 ? '/games/1' : `/games/${Number(currentPage)-1}`}><h3>{'<<'}</h3></Link>
                    <h3 className="pagecounter">{currentPage}</h3>
                    <Link className="page-btn" to={`/games/${Number(currentPage)+1}`}><h3>{'>>'}</h3></Link>
                </div>
            </div>
        </div>
    )
    
}


