import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { Triangle } from 'react-loader-spinner'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { usePlan } from './usePlan'

function Orders() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const page = parseInt(searchParams.get('page')) || 1
    const popUpref = useRef(null)
    const navigate = useNavigate()
    const { canExportCSV } = usePlan()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/orders?page=${page}&limit=10&search=${search}&sort=${sort}`)
                setData(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [page, search, sort])

    useEffect(() => {
        const closePopUp = (e) => {
            if (popUpref.current && !popUpref.current.contains(e.target)) {
                setOrder(false)
            }
        }
        document.addEventListener('mousedown', closePopUp)
        return () => document.removeEventListener('mousedown', closePopUp)
    }, [])

    const handlePageChange = (newPage) => setSearchParams({ page: newPage })
    const handleOpen = (ordr) => navigate(`/orders/${ordr.orderId}`)
    const handleSort = (e) => setSort(e.target.value)

    const formatDate = (dateString) => {
        if (!dateString) return 'No date';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid Date';
            return date.toLocaleString();
        } catch (error) {
            console.error(error)
            return 'Invalid Date';
        }
    };

    const downloadCSV = async () => {
        if (!canExportCSV) { navigate('/subscription'); return }
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/store/orders/csv?t=${Date.now()}`;
            const response = await axios.get(url, { responseType: 'blob', headers: { 'Accept': 'text/csv' } });
            const blob = new Blob([response.data], { type: 'text/csv' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading CSV:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center absolute top-100">
                <Triangle visible={true} height="80" width="80" color="#3b82f6" ariaLabel="triangle-loading" />
            </div>
        )
    }

    const { totalPages, currentPage } = data?.pagination || {}

    return (
        <div className="order flex flex-col items-center justify-center mt-10">
            <div className='flex items-center gap-5 mb-5'>
                <p>Search: </p>
                <input type="text" placeholder='Search by title, email or id' className='w-85 h-8 rounded-[5px] pl-3 bg-white focus:outline-none focus:ring-0' value={search} onChange={(e) => setSearch(e.target.value)} />
                <p>Sort:
                    <select value={sort} onChange={handleSort} className='w-35 h-8 rounded-[5px] pl-3 ml-6 bg-white focus:outline-none focus:ring-0'>
                        <option value="0">SortBy</option>
                        <option value="1">Today</option>
                        <option value="2">Last 7 Days</option>
                        <option value="3">Last 30 Days</option>
                    </select>
                </p>

                {/* Gated CSV button */}
                {canExportCSV ? (
                    <button className="px-4 py-2 bg-[#3b82f6] text-white rounded hover:bg-[#4c8df6] cursor-pointer" onClick={downloadCSV}>
                        export Orders CSV
                    </button>
                ) : (
                    <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed flex items-center gap-1" onClick={() => navigate('/subscription')} title="Upgrade to export CSV">
                        🔒 export Orders CSV
                    </button>
                )}
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
                                    <td className='p-4 cursor-pointer'>{formatDate(order?.Date || order?.createdAt || order?.rawData?.created_at)}</td>
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

                <div className="flex gap-4 items-center justify-center mt-4">
                    <button onClick={() => handlePageChange(page - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-400 disabled:opacity-50">Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-400 disabled:opacity-40">Next</button>
                </div>
            </div>
        </div>
    )
}

export default Orders