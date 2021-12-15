import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import './news.css'

function News() {
    const [news, setNews] = useState([])

    useEffect(()=>{

        async function getNews(){
            let payload = await axios.get('https://www.mmobomb.com/api1/latestnews')
            setNews(payload.data)
        }

        getNews()

    }, [])
    

    function stripHtml(html){
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
    return (
        <div className='news-container'>
            {news.map(item => {
                return(
                    <div className='news-div' key={item.id}>
                        <img src={item.thumbnail} alt="thunbnail" />
                        <div className='news-text'>
                            <h4><a href={item.article_url} target="_blank"> {item.title}</a></h4>
                            <p className='news-desc'>{item.short_description}</p>
                            <hr />
                            <div className='news-body'>{`${stripHtml(item.article_content).slice(0, 300)}`} <a href={item.article_url}>... read more</a></div>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default News
