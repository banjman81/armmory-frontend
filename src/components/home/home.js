import axios from "axios";
import React, {Component} from "react";
import './home.css'


export class Home extends Component {
    state = {
        isLoading : false,
        gameArray : []
    }

    async componentDidMount(){

        this.setState({
            isLoading : true
        })

        try{

            let payload = await axios.get('https://www.mmobomb.com/api1/games')
            // console.log(payload)
            this.setState({
                gameArray : payload.data,
                isLoading : false
            })

        }catch(err){
            console.log(err)
        }

    }

    render(){
        return(
            <div className="home-container">
                {this.state.isLoading ? <div className="loading-page"><div className="loader"></div></div> :(
                    this.state.gameArray.map((item) => {

                        if(item.short_description.length > 150){
                            item.short_description = `${item.short_description.slice(1, 147)}...`
                        }
                        return(
                            <div key={item.id} className="item-container">
                                <h3>{item.title}</h3>
                                <img src={item.thumbnail} alt="img" />
                                <p>{item.short_description}</p>
                            </div>
                        )
                    })
                )}
            </div>
        )
    }
}
