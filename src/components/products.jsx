import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { Triangle } from 'react-loader-spinner'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";
import { FaFire } from "react-icons/fa";
import { usePlan } from './usePlan'

const Products = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [hotProducts, setHotProducts] = useState([])
    const [loadingHot, setLoadingHot] = useState(true)
    const page = parseInt(searchParams.get('page')) || 1
    const popUpref = useRef(null)
    const navigate = useNavigate()
    const { canExportCSV } = usePlan()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/products?page=${page}&limit=8&search=${search}&sort=${sort}`)
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
        const fetchHotProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/products/hot?days=30`)
                setHotProducts(response.data.products || [])
            } catch (error) {
                console.error('Error fetching hot products:', error)
            } finally {
                setLoadingHot(false)
            }
        }
        fetchHotProducts()
    }, [])

    useEffect(() => {
        const closePopUp = (e) => {
            if (popUpref.current && !popUpref.current.contains(e.target)) setProduct(null)
        }
        document.addEventListener('mousedown', closePopUp)
        return () => document.removeEventListener('mousedown', closePopUp)
    }, [])

    const handlePageChange = (newPage) => setSearchParams({ page: newPage })
    const handleOpen = (pro) => setProduct(pro)
    const handleSort = (e) => setSort(e.target.value)

    const handleHotProductOpen = (hp) => {
        setProduct({
            id: hp.productId,
            title: hp.title,
            src: hp.image,
            alt: hp.title,
            vendor: hp.productData?.vendor || '',
            type: hp.productData?.type || '',
            tags: '',
            html: '',
            createdAt: null,
            updatedAt: null,
        })
    }

    const downloadCSV = async () => {
        if (!canExportCSV) { navigate('/subscription'); return }
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/products/csv`, { responseType: 'blob' })
            const blob = new Blob([res.data], { type: 'text/csv' })
            const downloadURL = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadURL
            link.setAttribute('download', 'products.csv')
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error) {
            console.error('Error downloading CSV:', error)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center absolute top-100">
                <Triangle visible={true} height="80" width="80" color="#3b82f6" ariaLabel="triangle-loading" />
            </div>
        )
    }

    const { totalPages, currentPage } = data?.pagination || {}

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            {/* Hot Products Banner */}
            <div className='w-full max-w-4xl mb-6'>
                <div className='bg-white rounded-xl shadow-md p-4'>
                    <div className='flex items-center gap-2 mb-3'>
                        <FaFire className='text-orange-500 text-lg' />
                        <h2 className='font-bold text-base'>Top 5 Hot Selling Products (Last 30 Days)</h2>
                    </div>
                    {loadingHot ? (
                        <div className='flex justify-center py-4'>
                            <Triangle visible={true} height="40" width="40" color="#f97316" ariaLabel="triangle-loading" />
                        </div>
                    ) : hotProducts.length > 0 ? (
                        <div className='flex gap-3'>
                            {hotProducts.map((hp, index) => (
                                <div key={index} className='flex-1 flex flex-col items-center bg-orange-50 border border-orange-100 rounded-lg p-3 hover:shadow-md hover:border-orange-400 transition-all cursor-pointer' onClick={() => handleHotProductOpen(hp)}>
                                    <div className='relative mb-2'>
                                        <img src={hp.image || 'https://via.placeholder.com/60'} alt={hp.title} className='w-14 h-14 object-cover rounded-full border-2 border-orange-300' onError={(e) => { e.target.src = 'https://via.placeholder.com/60' }} />
                                        <span className='absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold'>{index + 1}</span>
                                    </div>
                                    <p className='text-xs font-semibold text-center line-clamp-2 mb-1'>{hp.title}</p>
                                    <p className='text-xs text-orange-600 font-bold'>{hp.soldQuantity} sold</p>
                                    <p className='text-xs text-gray-500'>${hp.revenue?.toFixed(2)} revenue</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-sm text-gray-400 text-center py-4'>No sales data for the last 30 days.</p>
                    )}
                </div>
            </div>

            {/* Search / Sort / Export */}
            <div className='flex items-center gap-5 mb-4'>
                <p>Search: </p>
                <input type="text" placeholder='Search by title, description or id' className='w-85 h-8 rounded-[5px] pl-3 bg-white focus:outline-none focus:ring-0' value={search} onChange={(e) => setSearch(e.target.value)} />
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
                        export Products CSV
                    </button>
                ) : (
                    <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed flex items-center gap-1" onClick={() => navigate('/subscription')} title="Upgrade to export CSV">
                        🔒 export Products CSV
                    </button>
                )}
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-2 gap-4 items-start mt-2'>
                {data?.product?.map((productItem, index) => (
                    <div key={index} className='border border-[#ccc] p-4 bg-white rounded-lg cursor-pointer shadow-md hover:shadow-xl transition duration-300 ease-in-out' onClick={() => handleOpen(productItem)}>
                        <h3 className='text-[16px] font-semibold'>Title: {productItem.title}</h3>
                        <p className='text-[14px]'>Vendor: {productItem.vendor}</p>
                        <p className='text-[14px]'>Type: {productItem.type}</p>
                        <p className='text-[14px] mt-2 font-medium'>Variants:</p>
                        <ul className='grid grid-cols-3 gap-1'>
                            {productItem.variants?.map((variant, vIndex) => (
                                <li key={vIndex} className='text-[12px] bg-gray-50 p-1 rounded'>
                                    {variant.variantTitle} - ${variant.variantPrice?.$numberDecimal || 'N/A'} - Stock: {variant.variantQuantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Product Details Popup */}
            {product && (
                <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
                    <div className='w-[800px] max-h-[90vh] bg-white rounded-2xl flex flex-col p-6 overflow-y-auto' ref={popUpref}>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className='text-[21px] font-bold'>Product Details</h1>
                            <RxCross1 className='cursor-pointer' size={24} onClick={() => setProduct(null)} />
                        </div>
                        <div className='flex gap-6'>
                            <div className='w-1/3'>
                                {product?.src ? (
                                    <img src={product.src} alt={product.alt || product.title} className='w-full h-auto object-contain rounded-lg border' />
                                ) : (
                                    <div className='w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center'>No image</div>
                                )}
                            </div>
                            <div className='w-2/3'>
                                <div className='space-y-3'>
                                    <p><span className='font-semibold'>Product ID:</span> {product.id}</p>
                                    <p><span className='font-semibold'>Title:</span> {product.title}</p>
                                    <p><span className='font-semibold'>Type:</span> {product.type}</p>
                                    <p><span className='font-semibold'>Vendor:</span> {product.vendor}</p>
                                    {product.html && <p><span className='font-semibold'>Description:</span> {product.html}</p>}
                                    {product.tags && <p><span className='font-semibold'>Tags:</span> {product.tags}</p>}
                                </div>
                                <div className='mt-4 text-sm text-gray-600'>
                                    {product.createdAt && <p>Created: {new Date(product.createdAt).toLocaleString()}</p>}
                                    {product.updatedAt && <p>Updated: {new Date(product.updatedAt).toLocaleString()}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pagination */}
            <div className="flex gap-4 items-center justify-center my-6">
                <button onClick={() => handlePageChange(page - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-400 disabled:opacity-50">Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-400 disabled:opacity-40">Next</button>
            </div>
        </div>
    )
}

export default Products