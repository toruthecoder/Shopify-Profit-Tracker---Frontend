import Nav from '../components/navbar.jsx'
import Dashboard from '../components/dashboard.jsx'
import RawData from '../components/rawData.jsx'
import Input from '../components/input.jsx'
import Orders from '../components/orders.jsx'
import { Routes, Route } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";

function home() {

    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div className="flex flex-col justify-center items-center">
            <div className='w-full p-9 rounded-2xl'>
                <div className='bg-white w-full flex justify-between items-center px-8 py-2 rounded-2xl'>
                    <h1 className='text-[31px]'>Profit Tracker</h1>
                    <div className='flex items-center gap-2'>
                        <FaUserCircle size={30} />
                        {user.shop.slice(0, 11)}
                    </div>
                </div>
            </div>
            <Routes>
                <Route path='/' element={<Nav />} >
                    <Route index element={<Dashboard />} />
                    <Route path='rawdata' element={<RawData />} />
                    <Route path='orders' element={<Orders />} />
                    <Route path='input' element={<Input />} />
                </Route>
            </Routes>
        </div >
    )
}

export default home