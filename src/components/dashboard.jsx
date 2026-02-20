import axios from 'axios'
import { useState, useEffect } from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { PiUsersThreeLight } from "react-icons/pi";
import { PiMoneyWavyLight } from "react-icons/pi";
import { CiShoppingBasket } from "react-icons/ci";
import { PiArrowCounterClockwiseLight } from "react-icons/pi";
import { PiPackageThin } from "react-icons/pi";
import { CiDollar } from "react-icons/ci";
import { Triangle } from 'react-loader-spinner'
import { SlGraph } from "react-icons/sl";
import { BsGraphUp } from "react-icons/bs";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



const Dashboard = () => {

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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: '',
            },
        },
    };

    const chartData = {
        labels: data?.chartData?.map(order => {
            const d = new Date(order?.date);
            return `${d.getMonth() + 1}/${d.getDate()}/${String(d.getFullYear()).slice(-2)}`;
        }) || [],
        datasets: [
            {
                label: 'Sales',
                data: data?.chartData?.map(order =>
                    order.totalPrice
                ) || [],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.3)',
                fill: false,
                tension: 0.4,
            }, {
                label: 'Revenue',
                data: data?.chartData?.map(order =>
                    order.revenue
                ) || [],
                borderColor: '#008000',
                backgroundColor: '#008000',
                fill: false,
                tension: 0.4,
                range: 6000,
            }
        ],
    };
    return (
        <div className='flex flex-col'>
            <div className='mt-4 flex flex-col gap-5'>
                <div className='grid grid-cols-5 gap-8 w-full'>

                    <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[250px] h-[178px]'>
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

                    <div className='bg-white p-8 flex flex-col items-left rounded-4xl pl-4 w-[250px] h-[178px]'>
                        <div className='flex gap-4 items-center'>
                            <div className='bg-[#e7e7e7] p-2 rounded-4xl'>
                                <PiMoneyWavyLight size={35} />
                            </div>
                            <h1 className='text-[18px]'>Total Revenue</h1>
                        </div>
                        <div className='text-[41px] ml-2'>
                            {Math.floor(data?.stats?.totalRevenue)}
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

                    <div className='bg-white p-8 flex flex-col items-left rounded-4xl pl-4 w-[250px] h-[178px] '>
                        <div className='flex gap-4 items-center'>
                            <div className='bg-[#e7e7e7] p-2 rounded-4xl'>
                                <SlGraph size={35} className='p-0.5' />
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
                                <BsGraphUp size={35} className='p-1.5' />
                            </div>
                            <h1 className='text-[18px]'>Profit Margin</h1>
                        </div>
                        <div className='text-[41px] ml-2'>
                            {Math.floor(data?.stats?.profitMargin)}
                        </div>
                    </div>
                </div>

                <div className='flex flex-row justify-center items-center'>
                    <div className='flex flex-row gap-8'>
                        <div className='grid grid-cols-2 gap-8'>
                            <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[250px] h-[178px]'>
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

                            <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[250px] h-[178px]'>
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


                        </div>

                        <div className='flex'>
                            <div>
                                {data?.chartData && (
                                    <div className=' bg-white p-1 w-180 h-[378px] rounded-2xl flex items-center'>
                                        <Line options={options} data={chartData} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard