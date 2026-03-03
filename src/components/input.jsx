import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { usePlan } from './usePlan'
import { useNavigate } from 'react-router-dom'

function InputCosts() {
    const { canInputCosts, isViewOnly, loading } = usePlan()
    const navigate = useNavigate()

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
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            ...formData,
            month: new Date().toISOString().slice(0, 7)
        }
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/form/data`, payload)
        toast.success('Form Submitted.')
    }

    // While loading plan status, show nothing to avoid flash
    if (loading) return null

    // Trial expired or no paid plan — show locked screen
    if (!canInputCosts) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] gap-6'>
                <div className='bg-white rounded-2xl shadow-md p-10 flex flex-col items-center gap-4 max-w-md text-center'>
                    <div className='text-6xl'>🔒</div>
                    <h2 className='text-[22px] font-bold text-gray-800'>
                        {isViewOnly ? 'Your trial has expired' : 'Feature locked'}
                    </h2>
                    <p className='text-gray-500 text-[15px]'>
                        {isViewOnly
                            ? 'Inputting costs is not available in view-only mode. Upgrade to a paid plan to continue.'
                            : 'This feature requires an active plan.'}
                    </p>
                    <button
                        onClick={() => navigate('/subscription')}
                        className='px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#4c8df6] cursor-pointer text-[16px] font-medium transition-colors'
                    >
                        View Plans
                    </button>
                </div>
            </div>
        )
    }

    // Full access
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

                    <label htmlFor="AppCosts">Monthly APP Costs</label>
                    <input type="number" name="appCosts" onChange={handleChange} className='bg-[#e7e7e7] p-1 rounded-[5px] w-120 mb-5 pl-2' placeholder='Enter Costs Here' required />

                    <label htmlFor="shopifyPlan">Shopify Plan</label>
                    <select name="shopifyCosts" onChange={handleChange} className='bg-[#e7e7e7] p-1 rounded-[5px] w-120 mb-5 pl-2'>
                        <option value='0'>choose a plan</option>
                        <option value='0'>3 days trial</option>
                        <option value='25'>Basic - 25$</option>
                        <option value='65'>Grow - 65$</option>
                        <option value='399'>Advanced - 399$</option>
                        <option value='2300'>Plus - 2300$</option>
                    </select>

                    <label htmlFor="marketingSend">Marketing Costs</label>
                    <input type="number" name="marketingCosts" onChange={handleChange} className='bg-[#e7e7e7] p-1 rounded-[5px] w-120 appearance-none pl-2' placeholder='Enter Costs Here' required />

                    <button className='px-4 py-1 text-white bg-[#3b82f6] hover:bg-[#4c8df6] mt-7 rounded-[5px] w-30 mx-auto cursor-pointer' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default InputCosts