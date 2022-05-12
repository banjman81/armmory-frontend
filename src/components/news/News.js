import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './news.css'
import AxiosBackend from '../lib/axiosBackend'

function News() {
    const [news, setNews] = useState([])
    const [mmoNews, setMmoNews] = useState([])
    const [source, setSource] = useState('bomb')

    useEffect(()=>{

        async function getNews(){
            let payload = await axios.get('https://mmo-games.p.rapidapi.com/latestnews', {
                    headers: {
                        'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com',
                        'X-RapidAPI-Key': '5c90bd75d5mshf619a3c3f092c0bp175212jsn17382299e947'
                    }
                }
            )
            setNews(payload.data)

            let payload2 = await AxiosBackend.get('/api/games/get-mmo-news')
            setMmoNews(payload2.data.filteredArticles)
            console.log(payload2)
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
            <div>
            <button onClick={() => setSource("bomb")}>MMOBOMb News</button>
            <button onClick={() => setSource("mmo")}>MMORPG NEWS</button>
            </div>
            <div>
            {source === 'bomb' ?
                <div>
                    {news.map(item => {
                        return(
                            <div className='news-div' key={item.id}>
                                <img src={item.thumbnail} alt="thunbnail" />
                                <div className='news-text'>
                                    <h4><a href={item.article_url} target="_blank" rel="noreferrer noopener"> {item.title}</a></h4>
                                    <p className='news-desc'>{item.short_description}</p>
                                    <hr />
                                    <div className='news-body'>{`${stripHtml(item.article_content).slice(0, 300)}`} <a href={item.article_url} target="_blank" rel="noreferrer noopener">... read more</a></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            :
                <div>
                    {mmoNews.map(item => {
                        return(
                            <div className='news-div' key={item.id} style={{width: "50%"}}>
                                <img src={item.image} alt="thunbnail" />
                                <div className='news-text'>
                                    <h4><a href={`https://www.mmorpg.com/${item.url}`} target="_blank" rel="noreferrer noopener"> {item.title}</a></h4>
                                    <p className='news-desc'>{item.author} | {item.time}</p>
                                    {/* <hr /> */}
                                    {/* <div className='news-body'>{`${stripHtml(item.article_content).slice(0, 300)}`} <a href={item.article_url} target="_blank" rel="noreferrer noopener">... read more</a></div> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
            </div>
            
        </div>
    )
}

export default News
