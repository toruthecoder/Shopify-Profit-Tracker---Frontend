import axios from 'axios'
import { useState, useEffect } from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { PiUsersThreeLight } from "react-icons/pi";
import { PiMoneyWavyLight } from "react-icons/pi";
import { CiShoppingBasket } from "react-icons/ci";
import { PiArrowCounterClockwiseLight } from "react-icons/pi";
import { PiPackageThin } from "react-icons/pi";
import { CiDollar } from "react-icons/ci";

const Dashboard = () => {

    const [data, setData] = useState(null)
    const [odata, setOdata] = useState(null);

    useEffect(() => {
        // Function for getting all the data
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/data`)
                setData(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        // Function for getting the Order data
        const getOrderData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/orders`)
                console.log(res.data)
                setOdata(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        getOrderData()
    }, [])

    return (
        <div className='flex flex-col'>
            <div className='mt-4 flex gap-6 flex-row'>
                <div className='flex flex-col'>

                    <div>
                        <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[250px]'>
                            <div className='flex gap-4 items-center'>
                                <div className='bg-[#e7e7e7] p-2 rounded-4xl'>
                                    <CiShoppingBasket size={35} />
                                </div>
                                <h1 className='text-[18px]'>total orders</h1>
                            </div>
                            <div className='text-[41px] ml-2'>
                                <h1>{data?.stats?.totalOrders}</h1>
                            </div>
                        </div>

                        <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[250px] mt-6'>
                            <div className='flex gap-4 items-center'>
                                <div className='bg-[#e7e7e7] p-2 rounded-4xl'>
                                    <PiArrowCounterClockwiseLight size={35} />
                                </div>
                                <h1 className='text-[18px]'>total Refunds</h1>
                            </div>
                            <div className='text-[41px] ml-2'>
                                <h1>{data?.stats?.totalReturns}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-6 w-full'>

                    <div className='bg-white p-8 flex flex-col items-left rounded-4xl pl-4 w-[250px] h-[178px]'>
                        <div className='flex gap-4 items-center'>
                            <div className='bg-[#e7e7e7] p-2 rounded-4xl'>
                                <CiShoppingCart size={35} />
                            </div>
                            <h1 className='text-[18px]'>Total Sales</h1>
                        </div>
                        <div className='text-[41px] ml-2'>
                            {Math.floor(data?.stats?.salesResult)}
                        </div>
                    </div>

                    <div className='bg-white p-8 flex flex-col items-left rounded-4xl pl-4 w-[250px] h-[178px]'>
                        <div className='flex gap-4 items-center'>
                            <div className='bg-[#e7e7e7] p-2 rounded-4xl'>
                                <PiUsersThreeLight size={35} />
                            </div>
                            <h1 className='text-[18px]'>Total Customers</h1>
                        </div>
                        <div className='text-[41px] ml-2'>
                            {data?.stats?.totalCustomer}
                        </div>
                    </div>

                    <div className='bg-white p-8 flex flex-col items-left rounded-4xl pl-4 w-[250px] h-[178px]'>
                        <div className='flex gap-4 items-center'>
                            <div className='bg-[#e7e7e7] p-2 rounded-4xl'>
                                <PiMoneyWavyLight size={35} />
                            </div>
                            <h1 className='text-[18px]'>Total Revenue</h1>
                        </div>
                        <div className='text-[41px] ml-2'>
                            {Math.floor(data?.stats?.totalRevenue)} Rs
                        </div>
                    </div>

                    <div className='bg-white p-8 flex flex-col items-left rounded-4xl pl-4 w-[250px] h-[178px]'>
                        <div className='flex gap-4 items-center'>
                            <div className='bg-[#e7e7e7] p-2 rounded-4xl'>
                                <CiDollar size={35} />
                            </div>
                            <h1 className='text-[18px]'>Total Costs</h1>
                        </div>
                        <div className='text-[41px] ml-2'>
                            {Math.floor(data?.stats?.totalCosts)}
                        </div>
                    </div>

                    <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[250px]'>
                        <div className='flex gap-4 items-center'>
                            <div className='bg-[#e7e7e7] p-2 rounded-4xl'>
                                <PiPackageThin size={35} />
                            </div>
                            <h1 className='text-[18px]'>total Products</h1>
                        </div>
                        <div className='text-[41px] ml-2'>
                            <h1>{data?.stats?.totalProducts}</h1>
                        </div>
                    </div>

                    <div className='bg-white p-8 flex flex-col items-left rounded-4xl pl-4 w-[250px] h-[178px] '>
                        <div className='flex gap-4 items-center'>
                            <div className='bg-[#e7e7e7] p-2 rounded-4xl'>
                                <CiDollar size={35} />
                            </div>
                            <h1 className='text-[18px]'>Net Profit</h1>
                        </div>
                        <div className='text-[41px] ml-2'>
                            {Math.floor(data?.stats?.netProfit)}
                        </div>
                    </div>

                    <div className='bg-white p-8 flex flex-col items-left rounded-4xl pl-4 w-[250px] h-[178px] '>
                        <div className='flex gap-4 items-center'>
                            <div className='bg-[#e7e7e7] p-2 rounded-4xl'>
                                <CiDollar size={35} />
                            </div>
                            <h1 className='text-[18px]'>Profit Margin</h1>
                        </div>
                        <div className='text-[41px] ml-2'>
                            {Math.floor(data?.stats?.profitMargin)}
                        </div>
                    </div>
                </div>

            </div>

            <div className="order flex items-center justify-center mt-10">
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
                            <tr className=''>
                                <td className='p-4'>
                                    {odata?.order?.map((order, index) => (
                                        <div key={index} className='p-2'>{order.orderId}</div>
                                    ))}
                                </td>
                                <td className='p-4'>
                                    {odata?.order?.map((order, index) => (
                                        <div key={index} className='p-2'>
                                            {new Date(order?.rawData?.updated_at).toLocaleString()}
                                        </div>
                                    ))}
                                </td>
                                <td className='p-4'>
                                    {
                                        odata?.order?.map((order, index) => (
                                            <div key={index} className='p-2'>
                                                {Math.round(order?.totalPrice - order?.rawData?.total_discounts - order?.rawData?.total_cash_rounding_refund_adjustment_set?.presentment_money?.amount)} rs
                                            </div>
                                        ))
                                    }
                                </td>
                                <td className='p-4'>
                                    {
                                        odata?.order?.map((order, index) => (
                                            <div key={index} className='p-2'>
                                                {Math.round(order?.totalPrice) + Math.round(order?.rawData?.total_shipping_price_set?.presentment_money?.amount) +
                                                    Math.round(order?.rawData?.total_cash_rounding_refund_adjustment_set?.presentment_money?.amount)} rs
                                            </div>
                                        ))
                                    }
                                </td>
                                <td className='p-4'>
                                    {data?.singleNetProfit?.map((order, index) => (
                                        <div key={index} className='p-2'>
                                            {order?.netProfit} rs
                                        </div>
                                    ))}
                                </td>
                                <td className='p-6'>
                                    {data?.singleNetProfit?.map((order, index) => (
                                        <div key={index} className='p-2'>
                                            {order?.netProfit > 0 ? <div className='text-green-600 font-semibold'>profit</div> : <div className='text-red-600 font-semibold'>loss</div>}
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard