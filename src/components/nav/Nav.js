import React, {useContext, useState} from "react";
import {Link} from "react-router-dom"
import './nav.css'

import {UserContext} from '../context/userContext'
import axios from "axios";
import SearchList from "./SearchList";
import { SearchContext } from "../context/searchContext";

function Nav(){
    const {user} = useContext(UserContext)
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])

    let linkTitle1= user?.username ? user.username : "Sign Up"
    let link1 = user?.username ? "/profile" : "/signup"

    let linkTitle2= user?.username ? "Logout" : "Sign In"
    let link2 = user?.username ? '/logout' : "/signin"

    async function handleOnChange(e){
        // e.preventDefault()
        setSearch(e.target.value)
        const response = await axios.get('https://mmo-games.p.rapidapi.com/games', {
            headers: {
                'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com',
                'X-RapidAPI-Key': '5c90bd75d5mshf619a3c3f092c0bp175212jsn17382299e947'
            }
        }
    )
        setResults(response.data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())))
        if(e.target.value ===""){
            setResults([])
        }
    }

    // function handleOnSubmit(){
    //     console.log(search)
    // }

    const searchValues = {
        results, setResults, setSearch
    }
    
    
    return(
        <div>
            <div className="nav-container">
                <ul className="nav-bar">
                    <li><Link className="nav-link" to="/"><h2>Home</h2></ Link></li>
                    <li><Link className="nav-link" to='/games/1'>Games</ Link></li>
                    {user?.username ? (
                        <li><Link className="nav-link" to='/news'>MMO News</Link></li>
                    ): ("")}
                    {/* {user?.username ? (
                        <li><Link className="nav-link" to='/giveaways'>Giveaways</Link></li>
                    ): ("")} */}
                    <li><Link className="nav-link" to={link1}>{linkTitle1}</ Link></li>
                    <li><Link className="nav-link" to={link2}>{linkTitle2}</Link></li>
                    
                </ul>
                <div className="search-bar">
                    <input className="search-bar" type="text" name={search} placeholder="Search" onChange={e => handleOnChange(e)} />
                    {/* <button className="btn btn-secondary" onClick={() => handleOnSubmit()}>Search</button> */}
                    {results.length > 0 ? <SearchContext.Provider value={searchValues}>
                        <SearchList />
                    </SearchContext.Provider> : ""}
                </div>
            </div>
            
            
        </div>
    )
}

export default Nav