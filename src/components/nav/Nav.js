import React from "react";
import {Link} from "react-router-dom"
import './nav.css'

function Nav(){
    return(
        <div className="nav-container">
            <ul className="nav-bar">
                <li><Link to="/"><h1>HOME</h1></Link></li>
                <li><Link to="/signup">Sign up</Link></li>
                <li><Link to="/signin">Sign in</Link></li>
            </ul>
        </div>
    )
}

export default Nav