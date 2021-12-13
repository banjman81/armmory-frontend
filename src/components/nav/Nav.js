import React, {useContext, useState} from "react";
import {Link} from "react-router-dom"
import './nav.css'

import {UserContext} from '../context/userContext'

function Nav(){
    const {user} = useContext(UserContext)
    const [search, setSearch] = useState("")

    let linkTitle1= user?.username ? user.username : "Sign Up"
    let link1 = user?.username ? "/profile" : "/signup"

    let linkTitle2= user?.username ? "Logout" : "Sign In"
    let link2 = user?.username ? '/logout' : "/signin"

    function handleOnChange(e){
        // e.preventDefault()
        setSearch(encodeURIComponent(e))
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
                    {user?.username ? (
                        <li><Link className="nav-link" to='/giveaways'>Giveaways</Link></li>
                    ): ("")}
                    <li><Link className="nav-link" to={link1}>{linkTitle1}</ Link></li>
                    <li><Link className="nav-link" to={link2}>{linkTitle2}</Link></li>
                    
                </ul>
                <div className="search-bar">
                    <input type="text" name={search} onChange={e => handleOnChange(e.target.value)} />
                    <button className="btn btn-secondary">Search</button>
                </div>
            </div>
            
            
        </div>
    )
}

export default Nav