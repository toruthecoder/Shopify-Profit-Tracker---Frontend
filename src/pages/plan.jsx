import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


// Fetch plan info
const usePlan = () => {
    const [planData, setPlanData] = useState({ plan: null, loading: true })

    useEffect(() => {
        const fetchPlan = async () => {
            const email = localStorage.getItem('userEmail')
            if (!email) {
                setPlanData({ plan: 'none', isTrialActive: false, trialStartDate: null, trialEndDate: null, trialDaysRemaining: 0, subscriptionStatus: null, loading: false })
                return
            }

            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stripe/plan-status?email=${email}`)
                setPlanData({ ...res.data, loading: false })
            } catch {
                setPlanData({ plan: 'none', loading: false })
            }
        }

        fetchPlan()
    }, [])

    return planData
}

// Format date
const formatDate = (dateStr) => {
    if (!dateStr) return "-"
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
}

// Cancel subscription button
const CancelSubscriptionButton = ({ onCancelled }) => {
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')

    const handleCancel = async () => {
        const email = localStorage.getItem('userEmail')
        if (!email) return
        setLoading(true)
        setMsg('')
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/stripe/cancel-subscription`, { email })
            setMsg(res.data.message)
            onCancelled && onCancelled()
        } catch (err) {
            setMsg(err.response?.data?.error || 'Cancel failed')
        } finally { setLoading(false) }
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            <button onClick={handleCancel} disabled={loading} className="bg-red-500 hover:bg-red-600 text-white px-12 py-3 rounded">
                {loading ? 'Canceling...' : 'Cancel Subscription'}
            </button>
            {msg && <p className="text-sm text-gray-700">{msg}</p>}
        </div>
    )
}

// Main Plan Component
const Plan = () => {
    const plan = usePlan()
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(0)
    if (plan.loading) return null

    const handleCancelled = () => setRefresh(r => r + 1)
    const isPaid = plan.plan === 'starter' || plan.plan === 'pro'

    const progress = plan.trialDaysRemaining && plan.trialEndDate && plan.trialStartDate
        ? Math.max(0, 100 - ((plan.trialDaysRemaining / 7) * 100))
        : 0

    return (
        <div key={refresh} className="w-140 mx-auto p-6 flex flex-col gap-6 mt-21">
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Your Plan</h2>

                {plan.plan === 'none' && <>
                    <p className="text-gray-600">You don't have any plan.</p>
                    <button onClick={() => navigate('/subscription')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2">Choose Plan</button>
                </>}

                {plan.plan === 'expired' && <>
                    <p className="text-red-600 font-medium">Your trial has expired.</p>
                    <button onClick={() => navigate('/subscription')} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2">Upgrade Now</button>
                </>}

                {(plan.plan === 'trial' || isPaid) && <>
                    <p className={`font-medium ${plan.plan === 'trial' ? 'text-orange-600' : 'text-green-600'}`}>
                        {plan.plan === 'trial' ? 'You are on a free trial' : `You are on the ${plan.plan} plan`}
                    </p>
                    {plan.subscriptionStatus && <p>Subscription Status: {plan.subscriptionStatus}</p>}
                    {plan.trialStartDate && <p>Plan started: {formatDate(plan.trialStartDate)}</p>}
                    {plan.trialEndDate && <p>Plan ends: {formatDate(plan.trialEndDate)}</p>}
                    {plan.trialDaysRemaining > 0 && <p>Days remaining: {plan.trialDaysRemaining}</p>}

                    {/* Progress Bar */}
                    {plan.trialDaysRemaining > 0 && <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div className="bg-orange-500 h-3 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>}

                    <div className="flex flex-col md:flex-row gap-2 mt-2">
                        <button
                            onClick={() => navigate('/subscription')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-1 rounded whitespace-nowrap"
                        >
                            Change Plan
                        </button>
                        {isPaid && <CancelSubscriptionButton onCancelled={handleCancelled} />}
                    </div>
                </>}
            </div>
        </div>
    )
}

export default Plan