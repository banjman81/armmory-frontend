import React from "react";
import {Link} from "react-router-dom"
import './nav.css'

function Nav(){
    return(
        <div className="nav-container">
            <ul className="nav-bar">
                <li><Link className="nav-link" to="/"><h1>HOME</h1></Link></li>
                <li><Link className="nav-link" to="/signup">Sign up</Link></li>
                <li><Link className="nav-link" to="/signin">Sign in</Link></li>
            </ul>
            <div className="search-bar">
                <input type="text" name="" id="" />
                <button>Search</button>
            </div>
        </div>
    )
}

export default Nav