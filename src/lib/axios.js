import axios from 'axios'

const BASE_URL = import.meta.env.MODE === 'development' ? 'https://localhost:3002/store' : `${import.meta.env.BACKEND_URL}/store`

const store = axios.create({
    baseURL: BASE_URL,
})

export default store
