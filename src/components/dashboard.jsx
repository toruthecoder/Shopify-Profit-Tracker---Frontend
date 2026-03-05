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
import { FaFire } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { usePlan } from './usePlan'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    // usePlan loading does NOT block the dashboard from rendering
    const { canExportCSV, isViewOnly, plan, trialDaysRemaining } = usePlan()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/data`)
                setData(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const downloadCSV = async () => {
        if (!canExportCSV) { navigate('/subscription'); return }
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/data/csv`, { responseType: 'blob' })
            const blob = new Blob([res.data], { type: 'text/csv' })
            const downloadURL = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadURL
            link.setAttribute('download', 'Monthly_Summary.csv')
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error) {
            console.error('Error downloading CSV:', error);
        }
    }

    // Only the store data fetch blocks the render — NOT usePlan
    if (loading) {
        return (
            <div className="flex justify-center items-center absolute top-100">
                <Triangle visible={true} height="80" width="80" color="#3b82f6" ariaLabel="triangle-loading" />
            </div>
        )
    }

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: '' },
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
                data: data?.chartData?.map(order => order.totalPrice) || [],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.3)',
                fill: false,
                tension: 0.4,
            },
            {
                label: 'Revenue',
                data: data?.chartData?.map(order => order.revenue) || [],
                borderColor: '#008000',
                backgroundColor: '#008000',
                fill: false,
                tension: 0.4,
            }
        ],
    };

    return (
        <div className='flex flex-col items-center w-full mt-1'>
            {/* Trial expired banner */}
            {isViewOnly && (
                <div className='w-full bg-red-500 text-white text-center py-2 text-sm font-medium flex items-center justify-center gap-3'>
                    Your have No Plan — view-only mode.
                    <button onClick={() => navigate('/subscription')} className='bg-white text-red-500 text-xs font-bold px-3 py-1 rounded hover:bg-red-50'>
                        Upgrade Now
                    </button>
                </div>
            )}
            {/* Trial active banner */}
            {plan === 'trial' && !isViewOnly && (
                <div className='w-full bg-orange-400 text-white text-center py-2 text-sm font-medium flex items-center justify-center gap-3'>
                    Free trial: {trialDaysRemaining} day{trialDaysRemaining !== 1 ? 's' : ''} remaining.
                    <button onClick={() => navigate('/subscription')} className='bg-white text-orange-500 text-xs font-bold px-3 py-1 rounded hover:bg-orange-50'>
                        Upgrade
                    </button>
                </div>
            )}

            <div className='mt-4 flex flex-col gap-3 w-full max-w-7xl'>
                <div className='w-full flex justify-between items-center mb-2'>
                    <div
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        onClick={() => navigate('/products')}
                    >
                        <FaFire className="text-xl animate-pulse" />
                        <div>
                            <h3 className="font-bold text-base">Hot Products 🔥</h3>
                            <p className="text-xs opacity-90">Click to see top 5 best sellers</p>
                        </div>
                    </div>

                    {canExportCSV ? (
                        <button className="px-4 py-2 bg-[#3b82f6] text-white rounded hover:bg-[#4c8df6] cursor-pointer text-sm" onClick={downloadCSV}>
                            export Monthly-Summary CSV
                        </button>
                    ) : (
                        <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed text-sm flex items-center gap-2" onClick={() => navigate('/subscription')}>
                            🔒 export Monthly-Summary CSV
                        </button>
                    )}
                </div>

                <div className='grid grid-cols-5 gap-4 w-full mb-2'>
                    <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[250px] h-[178px]'>
                        <div className='flex items-center gap-4 mb-1'>
                            <div className='bg-[#e7e7e7] p-1.5 rounded-4xl'><PiPackageThin size={35} /></div>
                            <h1 className='text-[18px] font-medium'>Products</h1>
                        </div>
                        <div className='text-[41px] ml-2 font-semibold'>{data?.stats?.totalProducts}</div>
                    </div>
                    <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[250px] h-[178px]'>
                        <div className='flex items-center gap-4 mb-1'>
                            <div className='bg-[#e7e7e7] p-1.5 rounded-4xl'><PiMoneyWavyLight size={20} /></div>
                            <h1 className='text-[18px] font-medium'>Revenue</h1>
                        </div>
                        <div className='text-[41px] ml-2 font-semibold'>{Math.floor(data?.stats?.totalRevenue)}</div>
                    </div>
                    <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[250px] h-[178px]'>
                        <div className='flex items-center gap-4 mb-1'>
                            <div className='bg-[#e7e7e7] p-1.5 rounded-4xl'><CiDollar size={20} /></div>
                            <h1 className='text-[18px] font-medium'>Costs</h1>
                        </div>
                        <div className='text-[41px] ml-2 font-semibold'>{Math.floor(data?.stats?.totalCosts)}</div>
                    </div>
                    <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[250px] h-[178px]'>
                        <div className='flex items-center gap-4 mb-1'>
                            <div className='bg-[#e7e7e7] p-1.5 rounded-4xl'><SlGraph size={20} /></div>
                            <h1 className='text-[18px] font-medium'>Net Profit</h1>
                        </div>
                        <div className='text-[41px] ml-2 font-semibold'>{Math.floor(data?.stats?.netProfit)}</div>
                    </div>
                    <div className='bg-white p-8 flex flex-col justify-center items-left rounded-4xl pl-4 w-[250px] h-[178px]'>
                        <div className='flex items-center gap-4 mb-1'>
                            <div className='bg-[#e7e7e7] p-1.5 rounded-4xl'><BsGraphUp size={20} /></div>
                            <h1 className='text-[18px] font-medium'>Margin</h1>
                        </div>
                        <div className='text-[41px] ml-2 font-semibold'>{Math.floor(data?.stats?.profitMargin)}%</div>
                    </div>
                </div>

                <div className='flex gap-3 w-full'>
                    <div className='grid grid-cols-2 gap-2 w-1/3 h-90'>
                        <div className='flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl shadow-sm border border-blue-200 hover:shadow-md transition-shadow'>
                            <div className='flex items-center justify-between mb-1'>
                                <div className='bg-blue-500 p-1.5 rounded-lg text-white'><CiShoppingBasket size={18} /></div>
                                <span className='text-xs font-medium text-blue-600 bg-blue-200 px-2 py-0.5 rounded-full'>Total</span>
                            </div>
                            <div className='text-4xl font-bold text-gray-800'>{data?.stats?.totalOrders}</div>
                            <div className='text-xl text-gray-500 mt-1'>Orders</div>
                        </div>
                        <div className='flex flex-col justify-between bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl shadow-sm border border-purple-200 hover:shadow-md transition-shadow'>
                            <div className='flex items-center justify-between mb-1'>
                                <div className='bg-purple-500 p-1.5 rounded-lg text-white'><PiArrowCounterClockwiseLight size={18} /></div>
                                <span className='text-xs font-medium text-purple-600 bg-purple-200 px-2 py-0.5 rounded-full'>Total</span>
                            </div>
                            <div className='text-4xl font-bold text-gray-800'>{data?.stats?.totalReturns}</div>
                            <div className='text-xl text-gray-500 mt-1'>Refunds</div>
                        </div>
                        <div className='flex flex-col justify-between bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl shadow-sm border border-green-200 hover:shadow-md transition-shadow'>
                            <div className='flex items-center justify-between mb-1'>
                                <div className='bg-green-500 p-1.5 rounded-lg text-white'><CiShoppingCart size={18} /></div>
                                <span className='text-xs font-medium text-green-600 bg-green-200 px-2 py-0.5 rounded-full'>Total</span>
                            </div>
                            <div className='text-4xl font-bold text-gray-800'>{Math.floor(data?.stats?.salesResult)}</div>
                            <div className='text-xl text-gray-500 mt-1'>Sales</div>
                        </div>
                        <div className='flex flex-col justify-between bg-gradient-to-br from-amber-50 to-amber-100 p-3 rounded-xl shadow-sm border border-amber-200 hover:shadow-md transition-shadow'>
                            <div className='flex items-center justify-between mb-1'>
                                <div className='bg-amber-500 p-1.5 rounded-lg text-white'><PiUsersThreeLight size={18} /></div>
                                <span className='text-xs font-medium text-amber-600 bg-amber-200 px-2 py-0.5 rounded-full'>Unique</span>
                            </div>
                            <div className='text-4xl font-bold text-gray-800'>{data?.stats?.totalCustomer}</div>
                            <div className='text-xl text-gray-500 mt-1'>Customers</div>
                        </div>
                    </div>
                    <div className='flex-1'>
                        {data?.chartData && (
                            <div className='bg-white p-3 rounded-xl shadow-sm border border-gray-200'>
                                <Line options={options} data={chartData} height={160} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard