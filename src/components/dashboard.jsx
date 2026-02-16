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
        <div className='mt-4 flex gap-8 flex-row'>

            <div className='flex flex-col gap-6'>
                <h1 className="text-[20px] font-bold">Inventory</h1>
                <div>
                    <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[230px]'>
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

                    <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[230px] mt-6'>
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

                    <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[230px] mt-6'>
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
                </div>
            </div>

            <div className='grid grid-cols-4 gap-6 w-full mt-[52px]'>

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

                <div className='bg-white p-8 flex flex-col items-left rounded-4xl pl-4 w-[250px] h-[178px] -mt-47'>
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

                <div className='bg-white p-8 flex flex-col items-left rounded-4xl pl-4 w-[250px] h-[178px] -mt-47'>
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
    )
}

export default Dashboard