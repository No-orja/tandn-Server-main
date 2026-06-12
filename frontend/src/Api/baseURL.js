import axios from 'axios'

const baseURL = axios.create({baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/"})
export default baseURL
