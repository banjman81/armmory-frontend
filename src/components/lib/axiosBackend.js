import axios from "axios";

// let url = process.env.NODE_ENV === "production" ? "https://movie-app-backend-ban.herokuapp.com" : "http://127.0.01:3001"
let url = "http://127.0.01:3001"

const AxiosBackend = axios.create({
    baseURL : url,
    timeout: 50000,
    headers : {"Authorization" : `Bearer ${localStorage.getItem('loginToken')}`}
})

export default AxiosBackend