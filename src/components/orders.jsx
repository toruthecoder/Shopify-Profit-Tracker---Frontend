import axios from 'axios'
import { useState, useEffect } from 'react'
import { Triangle } from 'react-loader-spinner'

function Orders() {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Function for getting all the data
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/data`)
                setData(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center absolute top-100">
                <Triangle
                    visible={true}
                    height="80"
                    width="80"
                    color="#3b82f6"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }

    return (
        <div className="order flex items-center justify-center mt-4.5">
            <div className='pt-10 bg-white p-10'>
                <table className='pt-10'>
                    <tbody className='bg-white'>
                        <tr className='bg-[#e7e7e7] text-gray-500'>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Revenue</th>
                            <th>Total Cost</th>
                            <th>Profit</th>
                            <th>Status</th>
                        </tr>

                        {data?.singleNetProfit?.map((order, index) => {

                            const totalPrice = Number(order.netProfit)
                            const revenue = order?.revenue
                            const cost = order?.totalPrice + order?.Shipping + order?.refund

                            return (
                                <tr key={index}>
                                    <td className='p-4'>{order.orderId}</td>

                                    <td className='p-4'>
                                        {new Date(order?.Date).toLocaleString()}
                                    </td>

                                    <td className='p-4'>{Math.round(revenue)} rs</td>

                                    <td className='p-4'>{Math.round(cost)} rs</td>

                                    <td className='p-4'>{Math.round(totalPrice)} rs</td>

                                    <td className='p-4'>
                                        {totalPrice > 0
                                            ? <span className='text-green-600 font-semibold'>profit</span>
                                            : <span className='text-red-600 font-semibold'>loss</span>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders


