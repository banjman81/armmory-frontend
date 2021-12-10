import axios from "axios";
import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import './home.css'


export function Home(){

    const [isLoading, setIsLoading] = useState(false)
    const [gameArray, setGameArray] = useState([])
    const [option, setOption] = useState('')
    const [filteredGenre, setFilteredGenre] = useState([])
    const [filterOption, setFilterOption] = useState('')
    const [pageCounter, setPageCounter] = useState(1)
    const [low, setLow] = useState(1)
    const [high, setPageHigh] = useState(20)
    let genre = []

    useEffect(() => {

        async function initialLoad(){
            setIsLoading(true)
            try{
                let payload = await axios.get('https://www.mmobomb.com/api1/games')
                setGameArray(payload.data)
                payload.data.map(item => {
                    genre.push(item.genre)
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

    function handlePageBack(){
        
    }


    function handlePageForwared(){
        
    }

    
    return(
        <div className="home-container">
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
                    gameArray.map((item, index) => {

                        if(item.short_description.length > 75){
                            item.short_description = `${item.short_description.slice(0, 75)}...`
                        }
                        if(index >= low && index <= high){
                            return(
                            <div key={item.id} className="item-container">
                                <Link className="game-link" to={`/game/${item.id}`}>
                                    <h3>{item.title}</h3>
                                    <img src={item.thumbnail} alt="img" />
                                    <p>{item.short_description}</p>
                                </Link>
                            </div>
                        )
                        }
                        
                    })
                )}
                <div className="page-selector">
                    <h3 className="page-btn" onClick={pageCounter > 1 ? () => setPageCounter(pageCounter -1) : () => console.log('')}>{"<<"}</h3>
                    <h3 className="pagecounter">{pageCounter}</h3>
                    <h3 className="page-btn" onClick={() => setPageCounter(pageCounter +1)}>{">>"}</h3>
                </div>
            </div>
        </div>
    )
    
}


