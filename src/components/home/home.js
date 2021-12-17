import axios from "axios";
import React, { useState, useEffect, useContext} from "react";
import { Link} from "react-router-dom";
import './home.css'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import { UserContext } from "../context/userContext";

export function Home(){
    const [gameArray, setGameArray] = useState([])

    const {user} = useContext(UserContext)


    useEffect(() => {

        async function initialLoad(){
            try{
                let payload = await axios.get('https://www.mmobomb.com/api1/games')
                setGameArray(payload.data)
    
            }catch(err){
                console.log(err)
            }

        }

        initialLoad()
        // window.location.reload()
    }, [])

    
    return(
        <div className="home-container">
            <div>
                <div className="welcome">
                    <h3>Hello {user?.firstName ? user.firstName : ""}, welcome to Armmory</h3>
                    <p>This is a place where you can review and leave a comments for different online games.</p>
                </div>
                {user?.username ?  ("") :
                (<div>
                    <h4>Signin to get access to all the features of Armmory.com</h4>
                
                    <div className="log-prompt">
                        
                        <div>
                            <Link to="/signin"><h5>Already Have an account.</h5></Link>
                        </div>
                        <div>
                            <Link to="/signup"><h5>Join Armmory</h5></Link>
                        </div>
                    </div>
                </div>)}
                
                <div className="slide-container">
                <Slide>
                {gameArray.slice(0,20).map((game, index)=> (
                    <div className="each-slide" key={index}>
                    <Link style={{textDecoration: 'none'}} to={`/game/${game.id}`}>
                        <div className="slideshow-home" style={{backgroundImage: `url(${game.thumbnail})`}}>
                        </div>
                    </Link>
                    <span><h3 className="title-text">{game.title}</h3></span>
                    <span><h4 className="desc-text">{game.short_description}</h4></span>
                    </div>
                ))} 
                </Slide>
            </div>
            </div>
        </div>
    )
    
}


