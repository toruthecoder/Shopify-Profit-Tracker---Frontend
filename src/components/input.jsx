import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

function InputCosts() {
    const [formData, setFormData] = useState({
        paymentFees: '',
        transactionFees: '',
        packagingCosts: '',
        deliveryCosts: '',
        appCosts: '',
        shopifyCosts: '',
        marketingCosts: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            ...formData,
            month: new Date().toISOString().slice(0, 7)
        }

        console.log("sending:", payload)

        await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/form/data`,
            payload
        )
        toast.success(`Form Submitted.`)
    }



    return (
        <div>
            Input Costs Manually
            <div className='flex bg-white p-9 mt-7 rounded-[10px]'>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <label htmlFor="totalPaymentFees">Total Payment Fees</label>
                    <input type="number" name="paymentFees" onChange={handleChange} className='bg-[#e7e7e7] p-1 rounded-[5px] w-120 mb-5 pl-2' placeholder='Enter Costs Here' required />

                    <label htmlFor="totalTransactionFees">Total Transaction Fees</label>
                    <input type="number" name="transactionFees" onChange={handleChange} className='bg-[#e7e7e7] p-1 rounded-[5px] w-120 mb-5 pl-2' placeholder='Enter Costs Here' required />

                    <label htmlFor="packagingCosts">Packaging Cost Per Order</label>
                    <input type="number" name="packagingCosts" onChange={handleChange} className='bg-[#e7e7e7] p-1 rounded-[5px] w-120 mb-5 pl-2' placeholder='Enter Costs Here' required />

                    <label htmlFor="deliveryCosts">Delivery Cost Per Order</label>
                    <input type="number" name="deliveryCosts" onChange={handleChange} className='bg-[#e7e7e7] p-1 rounded-[5px] w-120 mb-5 pl-2' placeholder='Enter Costs Here' required />

                    <label htmlFor="AppCosts">Montly APP Costs</label>
                    <input type="number" name="appCosts" onChange={handleChange} className='bg-[#e7e7e7] p-1 rounded-[5px] w-120 mb-5 pl-2' placeholder='Enter Costs Here' required />

                    <label htmlFor="shopifyPlan">Shopify Plan</label>
                    <select type="number" name="shopifyCosts" onChange={handleChange} className='bg-[#e7e7e7] p-1 rounded-[5px] w-120 mb-5 pl-2' placeholder='Enter Costs Here' >
                        <option value='0'>choose a plan</option>
                        <option value='0'>3 days trail</option>
                        <option value='25'>Basic - 25$</option>
                        <option value='65'>Grow - 65$</option>
                        <option value='399'>Advanced - 399$</option>
                        <option value='2300'>Plus - 2300$</option>
                    </select>

                    <label htmlFor="marketingSend">Marketing Costs</label>
                    <input type="number" name="marketingCosts" onChange={handleChange} className='bg-[#e7e7e7] p-1 rounded-[5px] w-120 appearance-none pl-2' placeholder='Enter Costs Here' required />

                    <button className='px-4 py-1 bg-[#e7e7e7] mt-7 rounded-[5px] w-30 mx-auto cursor-pointer' type='submit'>submit</button>
                </form>
            </div>
        </div>
    )

}
export default InputCosts