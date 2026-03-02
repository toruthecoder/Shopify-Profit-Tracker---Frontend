import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Triangle } from 'react-loader-spinner'

function OrdersDetails() {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/orders/${id}`)
                setOrder(res.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [id])

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
        <div className='mt-10'>
            <div className='grid grid-cols-2 text-[20px] mb-5'>
                <h1>Order {order.name}</h1>
                <p>Email: {order.email}</p>
                <p>totalPrice: {order.totalPrice}</p>
                <p>netProfit: {order.netProfit}</p>
                <p>refund: {order.refund}</p>
                <p>revenue: {order.revenue}</p>
                <p>discount: {order.discount}</p>
                <p>Shipping: {order.Shipping}</p>
            </div>

            <h2 className='text-[20px] mb-5'>Items</h2>
            <div className='grid grid-cols-2 gap-4'>
                {order?.items?.map((item, i) => (
                    <div
                        key={i}
                        className='flex gap-4 items-center border border-[#ccc] p-2.5 bg-white rounded-[3px] shadow-md mb-3'
                    >
                        <div>
                            <img src={item.image} width="180" alt={item.title} />
                        </div>

                        <div>
                            <h3 className='text-[16px]'>Title: {item.title}</h3>
                            <p className='text-[14px]'>Variant: {item.variantTitle}</p>
                            <p className='text-[14px]'>Price: PKR {item.price}</p>
                            <p className='text-[14px]'>Quantity: {item.quantity}</p>
                            <p className='text-[14px]'>SKU: {item.sku}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrdersDetails