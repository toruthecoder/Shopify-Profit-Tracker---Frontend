import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { Triangle } from 'react-loader-spinner'
import { useSearchParams } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";

function Orders() {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState('')
    const page = parseInt(searchParams.get('page')) || 1
    const popUpref = useRef(null)

    useEffect(() => {
        // Function for getting all the data
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/orders?page=${page}&limit=10&search=${search}`)
                setData(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [page, search])

    useEffect(() => {
        const closePopUp = (e) => {
            if (popUpref.current && !popUpref.current.contains(e.target)) {
                setOrder(false)
            }
        }
        document.addEventListener('mousedown', closePopUp)
        return removeEventListener('mousedown', closePopUp)
    }, [popUpref])

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage })
    }

    const handleOpen = (ordr) => {
        setOrder(ordr)
    }

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

    const { totalPages, currentPage } = data?.pagination || {}

    return (
        <div className="order flex flex-col items-center justify-center ">
            <div className='flex items-center gap-5 mb-5'>
                <p>Search: </p> <input type="text" placeholder='Search by title, description or id' className='w-85 h-8 rounded-[5px] pl-3 bg-white focus:outline-none focus:ring-0' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className='pt-10 bg-white p-10 pb-5'>
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
                                <tr key={index} onClick={() => handleOpen(order)} className='hover:bg-blue-50'>
                                    <td className='p-4 cursor-pointer'>{order.orderId}</td>

                                    <td className='p-4 cursor-pointer'>
                                        {new Date(order?.Date).toLocaleString()}
                                    </td>

                                    <td className='p-4 cursor-pointer'>{Math.round(revenue)} rs</td>

                                    <td className='p-4 cursor-pointer'>{Math.round(cost)} rs</td>

                                    <td className='p-4 cursor-pointer'>{Math.round(totalPrice)} rs</td>

                                    <td className='p-4'>
                                        {totalPrice > 0
                                            ? <span className='text-green-600 font-semibold cursor-pointer'>profit</span>
                                            : <span className='text-red-600 font-semibold cursor-pointer'>loss</span>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {order &&
                    <div className='absolute inset-0 bg-black/10 flex items-center justify-center z-10'>
                        <div className='w-230 h-190 bg-white rounded-2xl flex flex-col p-10 mt-10' ref={popUpref}>
                            <div className='flex justify-between'>
                                <h1 className='text-[21px]'>Order Details</h1>
                                <RxCross1 className='cursor-pointer ' size={20} onClick={() => handleOpen()} />
                            </div>
                            <div className='grid grid-cols-2 gap-2 mt-15 place-items-center'>
                                <p className='flex flex-col bg-[#e7e7e7] w-[300px] p-4 rounded-[5px]'><span className='text-[18px]'>Order-Id</span> {order.orderId}</p>
                                <p className='flex flex-col bg-[#e7e7e7] w-[300px] p-4 rounded-[5px]'><span className='text-[18px]'>Order-name</span> {order?.name} </p>
                                <p className='flex flex-col bg-[#e7e7e7] w-[300px] p-4 rounded-[5px]'><span className='text-[18px]'>Order-email</span> {order?.email} </p>
                                <p className='flex flex-col bg-[#e7e7e7] w-[300px] p-4 rounded-[5px]'><span className='text-[18px]'>Order-currency</span> {order?.currency} </p>
                                <p className='flex flex-col bg-[#e7e7e7] w-[300px] p-4 rounded-[5px]'><span className='text-[18px]'>Order-Price</span> {order?.totalPrice} </p>
                                <p className='flex flex-col bg-[#e7e7e7] w-[300px] p-4 rounded-[5px]'><span className='text-[18px]'>Order-refund</span> {order?.refund}</p>
                                <p className='flex flex-col bg-[#e7e7e7] w-[300px] p-4 rounded-[5px]'><span className='text-[18px]'>Order-discount</span> {order?.discount} </p>
                                <p className='flex flex-col bg-[#e7e7e7] w-[300px] p-4 rounded-[5px]'><span className='text-[18px]'>Order-shipping</span> {order?.Shipping} </p>
                                <p className='flex flex-col bg-[#e7e7e7] w-[300px] p-4 rounded-[5px]'><span className='text-[18px]'>Order-revenue</span> {order?.revenue} </p>
                                <p className='flex flex-col bg-[#e7e7e7] w-[300px] p-4 rounded-[5px]'><span className='text-[18px]'>Order-netProfit</span> {order?.netProfit} </p>
                            </div>
                            <div className='flex justify-between mt-10 text-[17px] p-15'>
                                <p>Order-createdAt: {new Date(order?.createdAt).toLocaleString()} </p>
                                <p>Order-UpdatedAt: {new Date(order?.updatedAt).toLocaleString()} </p>
                            </div>
                        </div>
                    </div>
                }
                <div className="flex gap-4 items-center justify-center mt-4">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-400 disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span>Page {currentPage} of {totalPages}</span>

                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-400 disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            </div >
        </div >
    )
}

export default Orders


