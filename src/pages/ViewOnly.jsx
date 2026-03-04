import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlan } from '../hooks/usePlan'
import axios from 'axios'

// Button to cancel Stripe subscription
const CancelSubscriptionButton = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleCancel = async () => {
        const email = localStorage.getItem('userEmail')
        if (!email) return

        setLoading(true)
        setMessage('')

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/stripe/cancel-subscription`,
                { email }
            )
            setMessage(res.data.message)
        } catch (err) {
            console.error(err)
            setMessage(err.response?.data?.error || 'Cancellation failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mt-2">
            <button
                onClick={handleCancel}
                disabled={loading}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
                {loading ? 'Canceling...' : 'Cancel Subscription'}
            </button>
            {message && <p className="text-sm mt-1 text-gray-700">{message}</p>}
        </div>
    )
}

// Component that gates features based on plan
export const PlanGate = ({ feature, children }) => {
    const plan = usePlan()
    const navigate = useNavigate()

    if (plan.loading) return null

    if (!plan[feature]) {
        return (
            <div className="relative inline-block group">
                <div className="opacity-40 pointer-events-none select-none">
                    {children}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={() => navigate('/subscription')}
                        className="bg-[#3b82f6] text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap hover:bg-blue-600"
                    >
                        Upgrade to unlock
                    </button>
                </div>
            </div>
        )
    }

    return children
}

// Banner shown at top of pages for trial, expired, or active subscription
const ViewOnlyBanner = () => {
    const plan = usePlan()
    const navigate = useNavigate()

    if (plan.loading) return null

    if (plan.plan === 'none') {
        return (
            <div className="bg-blue-500 text-white text-center py-2 flex flex-col items-center gap-2">
                <span>Choose a plan to unlock features.</span>
                <button
                    onClick={() => navigate('/subscription')}
                    className="bg-white text-blue-500 text-xs font-bold px-3 py-1 rounded hover:bg-blue-50"
                >
                    Choose Plan
                </button>
            </div>
        )
    }

    if (plan.plan === 'expired') {
        return (
            <div className="w-full bg-red-500 text-white text-center py-2 px-4 text-sm font-medium flex flex-col items-center gap-2">
                <span>Your free trial has expired. You are in view-only mode.</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate('/subscription')}
                        className="bg-white text-red-500 text-xs font-bold px-3 py-1 rounded hover:bg-red-50 transition-colors"
                    >
                        Upgrade Now
                    </button>
                </div>
            </div>
        )
    }

    if (plan.plan === 'trial' && plan.isTrialActive) {
        return (
            <div className="w-full bg-orange-400 text-white text-center py-2 px-4 text-sm font-medium flex flex-col items-center gap-2">
                <span>
                    Free trial: {plan.trialDaysRemaining} day
                    {plan.trialDaysRemaining !== 1 ? 's' : ''} remaining.
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate('/subscription')}
                        className="bg-white text-orange-500 text-xs font-bold px-3 py-1 rounded hover:bg-orange-50 transition-colors"
                    >
                        Upgrade
                    </button>
                </div>
            </div>
        )
    }

    if (plan.plan === 'starter' || plan.plan === 'pro') {
        return (
            <div className="w-full bg-green-500 text-white text-center py-2 px-4 text-sm font-medium flex flex-col items-center gap-2">
                <span>You're on the {plan.plan} plan.</span>
                <CancelSubscriptionButton />
            </div>
        )
    }

    return null
}

export default ViewOnlyBanner