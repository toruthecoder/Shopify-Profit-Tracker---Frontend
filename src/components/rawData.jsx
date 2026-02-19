import axios from 'axios'
import { useState, useEffect } from 'react'

const RawData = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/store/products`)
                setData(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            {data?.product?.map((product, index) => (
                <div key={index} className='border border-[#ccc] p-[10px] my-[17px] bg-white'>
                    <h3>Title : {product.title}</h3>
                    <p>Vendor: {product.vendor}</p>
                    <p>Type: {product.product_type}</p>
                    <p>Variants:</p>
                    <ul>
                        {product.variants.map((variant, vIndex) => (
                            <li key={vIndex}>
                                {variant.title} - ${variant.price.$numberDecimal} - Stock: {variant.inventory_quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default RawData
