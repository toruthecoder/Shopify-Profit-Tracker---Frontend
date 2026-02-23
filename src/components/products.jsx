import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { Triangle } from 'react-loader-spinner'
import { useSearchParams } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";

const Products = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState('')
    const page = parseInt(searchParams.get('page')) || 1
    const popUpref = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/products?page=${page}&limit=8&search=${search}`)
                setData(response.data)
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
                setProduct(false)
            }
        }
        document.addEventListener('mousedown', closePopUp)
        return removeEventListener('mousedown', closePopUp)
    }, [popUpref])


    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage })
    }

    const handleOpen = (pro) => {
        setProduct(pro)
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
            <div className='flex items-center gap-5'>
                <p>Search: </p> <input type="text" placeholder='Search by title, description or id' className='w-85 h-8 rounded-[5px] pl-3 bg-white focus:outline-none focus:ring-0' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className='grid grid-cols-2 gap-2 items-start mt-4.5'>
                {data?.product?.map((product, index) => (
                    <div key={index} className='border border-[#ccc] p-[10px] bg-white rounded-[3px] cursor-pointer shadow-md hover:shadow-xl transition duration-300 ease-in-out' onClick={() => handleOpen(product)}>
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

            {
                product &&
                <div className='absolute inset-0 bg-black/10 flex items-center justify-center z-10'>
                    <div className='w-230 h-190 bg-white rounded-2xl flex flex-col p-10 mt-10' ref={popUpref}>
                        <div className='flex justify-between'>
                            <h1 className='text-[21px]'>Product Details</h1>
                            <RxCross1 className='cursor-pointer ' size={20} onClick={() => handleOpen()} />
                        </div>
                        <div className='flex gap-5'>
                            <div className='mt-5'>
                                <img src={product?.src} alt={product?.alt} className='object-contain' width={`${product?.wdth}px`} height={`${product?.hgth}px`} />
                            </div>
                            <div className=''>
                                <div className='flex flex-col mt-15 place-items-center gap-5'>
                                    <p className='font-light'><span className='text-[18px] font-semibold'>Product-Id</span> {product.id}</p>
                                    <p className='font-light'><span className='text-[18px] font-semibold'>Title</span> {product.title} </p>
                                    <p className='font-light'><span className='text-[18px] font-semibold'>Type</span> {product.type} </p>
                                    <p className='font-light'><span className='text-[18px] font-semibold'>Vendor</span> {product?.vendor} </p>
                                    <p className='font-light'><span className='text-[18px] font-semibold'>Description: </span> {product?.html} </p>
                                    <p className='font-light'><span className='text-[18px] font-semibold'>tags: </span> {product?.tags}</p>
                                </div>
                                <div className='text-[17px]'>
                                    <p>Created-At: <span className='font-light'>{new Date(product?.createdAt).toLocaleString()}</span> </p>
                                    <p>Updated-At: <span className='font-light'>{new Date(product?.updatedAt).toLocaleString()}</span> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

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
        </div >
    )
}

export default Products
