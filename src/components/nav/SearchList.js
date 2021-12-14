import React, { useContext } from 'react'
import './nav.css'
import { Link } from 'react-router-dom'

import {SearchContext} from '../context/searchContext'

function SearchList() {
    const {results, setResults, setSearch} =useContext(SearchContext)

    function handleClicked(){
        setResults([])
        setSearch('')
    }
    function showList(){
        return results.splice(0,10).map((item, index) => {
            return (
                <Link onClick={() => handleClicked()} className='li-link' to={`/game/${item.id}`}>
                    <li key={index}>
                        <img className='search-img' src={item.thumbnail} alt="poster" />
                        {item.title}
                    </li>
                </Link>
            )
        })
    }

    return (
        <div className="results">
            {showList()}
        </div>
    )
    
}

export default SearchList
