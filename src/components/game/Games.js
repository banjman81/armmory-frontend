import axios from "axios";
import React, { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import './game.css'


export function Games(){
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [gameArray, setGameArray] = useState([])
    const [option, setOption] = useState('')
    const [filteredGenre, setFilteredGenre] = useState([])
    const [filterOption, setFilterOption] = useState('')
    const currentPage = params.page
    let genre = []

    useEffect(() => {

        async function initialLoad(){
            setIsLoading(true)
            try{
                let payload = await axios.get('https://www.mmobomb.com/api1/games')
                setGameArray(payload.data)
                payload.data.map(item => {
                    return genre.push(item.genre)
                })
                const uniqueGenre = Array.from(new Set(genre))
                setFilteredGenre(uniqueGenre)
                setIsLoading(false)
    
            }catch(err){
                console.log(err)
            }

        }

        initialLoad()
    }, [])


    const handleFilter = async e => {
        e.preventDefault()
        if(option.length > 0){
            fetchMmos(`https://www.mmobomb.com/api1/games?categoty=${filterOption}&sort-by=${option}`)
            console.log(`https://www.mmobomb.com/api1/games?categoty=${filterOption}&sort-by=${option}`)
        }else{
            fetchMmos(`https://www.mmobomb.com/api1/games?categoty=${filterOption}`)
        }
        
    }

    async function fetchMmos(url){
        setIsLoading(true)
        try{
            let payload = await axios.get(url)
            setGameArray(payload.data)
            setIsLoading(false)

        }catch(err){
            console.log(err)
        }
    }

    async function addFavorite(game){
        console.log(game.title)
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
                {isLoading ? <div className="loading-page"><div className="loader"></div></div> :(
                    gameArray.slice(currentPage*20 - 20, currentPage * 20).map((item) => {
                        if(item.short_description.length > 90){
                            item.short_description = `${item.short_description.slice(0, 90)}...`
                        }
                        return(
                        <div key={item.id} className="item-container">
                            <Link className="game-link" to={`/game/${item.id}`} params={{id: item.id}}>
                                <h3>{item.title}</h3>
                                <img src={item.thumbnail} alt="img" />
                                <p>{item.short_description}</p>
                            </Link>
                            <button onClick={() => addFavorite(item)}>Add Favorite</button>
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


