import axios from 'axios'
import { useState, useEffect } from 'react'

const RawData = () => {
    const [data, setData] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/data`)
                const user = JSON.parse(localStorage.getItem('user'))
                setUser(user.shop)
                setData(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])


    return (
        <div>
            <h1 className="my-4">shopName : {user}</h1>
            {data ? JSON.stringify(data, null, 2) : "No Data"}
        </div>
    )
}

export default RawData