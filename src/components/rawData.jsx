import axios from 'axios'
import { useState, useEffect } from 'react'
import { Triangle } from 'react-loader-spinner'
import { useSearchParams } from 'react-router-dom'

const RawData = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const page = parseInt(searchParams.get('page')) || 1

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/products?page=${page}&limit=8`)
                setData(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [page])

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage })
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
        <div className='flex flex-col items-center justify-center'>
            <div className='grid grid-cols-2 gap-2 items-start mt-4.5'>
                {data?.product?.map((product, index) => (
                    <div key={index} className='border border-[#ccc] p-[10px] bg-white rounded-[3px]'>
                        <h3 className='text-[16px]'>Title : {product.title}</h3>
                        <p className='text-[14px]'>Vendor: {product.vendor}</p>
                        <p className='text-[14px]'>Type: {product.type}</p>
                        <p className='text-[14px]'>Variants:</p>
                        <ul>
                            {product.variants?.map((variant, vIndex) => (
                                <li key={vIndex} className='text-[13px]'>
                                    {variant.variantTitle} - ${variant.variantPrice.$numberDecimal} - Stock: {variant.variantQuantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="flex gap-4 items-center justify-center my-6">
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
        </div>
    )
}

export default RawData
