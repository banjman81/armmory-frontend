import axios from "axios";
import React, { useState, useEffect, useContext} from "react";
import { Link, useParams } from "react-router-dom";
import './home.css'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import { UserContext } from "../context/userContext";

export function Home(){

    const [isLoading, setIsLoading] = useState(false)
    const [gameArray, setGameArray] = useState([])

    const {user} = useContext(UserContext)

    useEffect(() => {

        async function initialLoad(){
            setIsLoading(true)
            try{
                let payload = await axios.get('https://www.mmobomb.com/api1/games')
                setGameArray(payload.data)
                setIsLoading(false)
    
            }catch(err){
                console.log(err)
            }

        }

        initialLoad()
    }, [])

    
    return(
        <div className="home-container">
            <div>
                <div className="welcome">
                    <h3>Hello {user?.firstName ? user.firstName : ""}, welcome to Armmory</h3>
                    <p>This is a place where you can review and leave a comments for different online games.</p>
                </div>
                
                <div className="slide-container">
                <Slide>
                {gameArray.slice(0,20).map((game, index)=> (
                    <div className="each-slide" key={index}>
                    <Link style={{textDecoration: 'none'}} to={`/game/${game.id}`}>
                        <div className="slideshow-home" style={{backgroundImage: `url(${game.thumbnail})`}}>
                            <span><h3 className="title-text">{game.title}</h3></span>
                        </div>
                    </Link>
                    </div>
                ))} 
                </Slide>
            </div>
            </div>
            <div>
                <h3>Signin to get access to all the features of Armmory.com</h3>
            </div>
            <div className="log-prompt">
                
                <div>
                    <Link to="/signin"><h4>Already Have an account.</h4></Link>
                </div>
                <div>
                    <Link to="/signup"><h4>Join Armmory</h4></Link>
                </div>
            </div>
        </div>
    )
    
}


