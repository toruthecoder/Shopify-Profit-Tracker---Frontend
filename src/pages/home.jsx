import React from 'react'
import axios from 'axios'
import Nav from '../components/navbar.jsx'
import Dashboard from '../components/dashboard.jsx'
import RawData from '../components/rawData.jsx'
import { Routes, Route } from 'react-router-dom'

function home() {

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/data`)
            if (data.success) {
                console.log(
                    "Orders : ", data.orders,
                    "Returns : ", data.returns,
                    "Products : ", data.products,
                )
            }

        } catch (error) {
            console.error(`Error Fetching Data: `, error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <header className='text-[41px] mt-2'>Profit-Tracker</header>
            <Routes>
                <Route path='/' element={<Nav />} >
                    <Route index element={<Dashboard />} />
                    <Route path='rawdata' element={<RawData />} />
                </Route>
            </Routes>
            <button onClick={() => fetchData()} className="cursor-pointer bg-black w-40 py-3 text-white rounded-[3px] mt-9">Get Data</button>
        </div >
    )
}

export default home