import axios from "axios";
import React, { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import './game.css'


export function Games(){

    const [isLoading, setIsLoading] = useState(false)
    const [gameArray, setGameArray] = useState([])
    const [option, setOption] = useState('')
    const [filteredGenre, setFilteredGenre] = useState([])
    const [filterOption, setFilterOption] = useState('')
    const [pageCounter, setPageCounter] = useState(1)
    const [low, setLow] = useState(1)
    const [high, setHigh] = useState(20)
    let genre = []

    useEffect(() => {

        async function initialLoad(){
            setIsLoading(true)
            try{
                let payload = await axios.get('https://www.mmobomb.com/api1/games')
                setGameArray(payload.data)
                // console.log(payload.data)
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
    }, [pageCounter])


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
        setPageCounter(pageCounter -1)
        setLow(low - 20)
        setHigh(low - 1)
        console.log(low, high)
        console.log(pageCounter)
    }


    function handlePageForwared(){
        setPageCounter(pageCounter +1)
        setLow(high +1)
        setHigh(pageCounter * 20)
        console.log(low, high)
        console.log(pageCounter)
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
                    gameArray.slice(low-1 || 0, high || 19).map((item) => {
                        console.log(low, high)
                        if(item.short_description.length > 75){
                            item.short_description = `${item.short_description.slice(0, 75)}...`
                        }
                        return(
                        <div key={item.id} className="item-container">
                            <Link className="game-link" to={`/game/${item.id}`} params={{id: item.id}}>
                                <h3>{item.title}</h3>
                                <img src={item.thumbnail} alt="img" />
                                <p>{item.short_description}</p>
                            </Link>
                        </div>
                        )
                        
                    })
                )}
                <div className="page-selector">
                    <button className="page-btn"><h3 onClick={pageCounter > 1 ? () => handlePageBack() : () => console.log('')}>{"<<"}</h3></button>
                    <h3 className="pagecounter">{pageCounter}</h3>
                    <button className="page-btn"><h3 onClick={() => handlePageForwared()}>{">>"}</h3></button>
                </div>
            </div>
        </div>
    )
    
}


