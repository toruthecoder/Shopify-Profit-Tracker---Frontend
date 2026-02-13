import axios from 'axios'
import { useState, useEffect } from 'react'

const Dashboard = () => {

    const [data, setData] = useState(null)
    const user = JSON.parse(localStorage.getItem('user'))
    const shop = user.shop;
    const initailDataSync = user.initialSyncDone;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/data`)
                setData(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className='mt-4 flex gap-8'>

            <div>
                <h1 className="text-[20px] font-bold">Shop Info</h1>
                <div>
                    <h1>Shop Name: {shop}</h1>
                    <h1>DataSync: {initailDataSync === true ? 'yes' : 'No'}</h1>
                </div>
            </div>

            <div>
                <h1 className="text-[20px] font-bold">Inventory</h1>
                <div>
                    <h1>total orders: {data?.stats?.totalOrders}</h1>
                    <h1>total Refunds: {data?.stats?.totalReturns}</h1>
                    <h1>total Products: {data?.stats?.totalProducts}</h1>
                </div>
            </div>

            {/* <div className="mt-2">
                <h1>orders</h1>
                <div>
                    <ul>
                        <li>Order ID : </li>
                        <li>Created date : </li>
                        <li>Line items : </li>
                        <li>Total price : </li>
                        <li>Shipping charged : </li>
                    </ul>
                </div>
            </div>

            <div className="mt-2">
                <h1>refunds</h1>
                <div>
                    <ul>
                        <li>Refund amount : </li>
                        <li>Refund date : </li>
                    </ul>
                </div>
            </div> */}
        </div>
    )
}

export default Dashboard