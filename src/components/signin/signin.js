import React, {useState, useContext} from "react";
import '../signup/user.css'
import { toast } from "react-toastify";

import MainLogo from '../img/logo.svg'
import { useNavigate } from "react-router-dom";

import {UserContext} from '../context/userContext'
import AxiosBackend from "../lib/axiosBackend";


function Signin(){

    const { setUser} = useContext(UserContext)


    let navigate = useNavigate()

    const notifySuccess = () => toast.success('Success!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
    
    const notifyFailed = (input) => toast.error(`${input}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     setLoading(false)
    // })
    

    async function handleSubmit(e){
        e.preventDefault()
        try{

            let payload = await AxiosBackend.post(`/api/users/login`, 
            {
                email,
                password
            })

            const userDetail = await AxiosBackend.get(`/api/users/getUserByEmail/${email}`)
            

            setUser(userDetail.data)
            
            localStorage.setItem('loginToken', payload.data.token)
            // setLoading(true)
            // setTimeout(() => { 
                notifySuccess();
                navigate('/') 
            // }, 1000);
            // navigate('/')

        }catch(e){
            let arr = []
            for(let key in e.response.data.error){
                arr.push(e.response.data.error[key])
            }
            if(arr[0].length === 1){
                notifyFailed(e.response.data.error)
            }else{
                arr.map( error => notifyFailed(error))
            }
        }
    }

    return(
        <div className="form-wrapper">
            <div className="main-logo">
                <img src={MainLogo} alt="img" />
                <h1>Armmory</h1>
            </div>

            <form onSubmit={(e)=> handleSubmit(e)}>
                <div className="form-floating login-input">
                    <input
                    name={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    />
                    
                    <label htmlFor="floatingInput" style={{opacity : "0.8"}}>Email</label>
                </div>

                <div className="form-floating login-input">
                    <input
                    name={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    />
                    <label htmlFor="floatingInput" style={{opacity : "0.8"}}>Password</label>
                </div>
        
                {loading ? <div className="loading-page" style={{width: "50px", height: "50px", margin: "0 auto"}}><div className="loader" style={{width: "50px", height: "50px"}}></div></div> :<button className="w-100 btn btn-lg sign-btn" type="submit">
                    Login
                </button>}
                
            </form>
        </div>
    )
}

export default Signin