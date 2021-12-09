import axios from "axios";
import React, {Component, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import './home.css'


export function Home(){

    const [isLoading, setIsLoading] = useState(false)
    const [gameArray, setGameArray] = useState([])
    const [option, setOption] = useState('')
    const [updated, setUpdated] = useState(false)
    const [num, setNum] = useState(0)

    useEffect(() => {
        fetchMmos('https://www.mmobomb.com/api1/games')
    }, [])


    const handleFilter = async (e) => {
        e.preventDefault()
        fetchMmos(`https://www.mmobomb.com/api1/games?sort-by=${option}`)
        setUpdated(!updated)
        console.log(option, 1)
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

    
    return(
        <div className="home-container">
            <div className="sort-form">
                <form onSubmit={(e) => handleFilter(e)}>
                    <select defaultValue={'DEFAULT'} onChange={(e) => setOption(e.target.value)}>
                        <option value="DEFAULT" disabled>sort display lists</option>
                        <option value="relavance">relavance</option>
                        <option value="release-date">release date</option>
                        <option value="alphabtical">alphabetical</option>
                    </select>
                    
                    <button style={{marginLeft: "10px"}}>select</button>
                </form>
                {/* {num}
                <button onClick={() => setNum(num + 1)}>add</button> */}
            </div>
            <div className="lists-container">
                {isLoading ? <div className="loading-page"><div className="loader"></div></div> :(
                    gameArray.map((item) => {

                        if(item.short_description.length > 75){
                            item.short_description = `${item.short_description.slice(0, 75)}...`
                        }
                        return(
                            <div key={item.id} className="item-container">
                                <Link className="game-link" to={`/game/${item.id}`}>
                                    <h3>{item.title}</h3>
                                    <img src={item.thumbnail} alt="img" />
                                    <p>{item.short_description}</p>
                                </Link>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
    
}


