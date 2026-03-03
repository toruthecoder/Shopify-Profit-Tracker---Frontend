import { useNavigate } from 'react-router-dom'
import { usePlan } from '../hooks/usePlan'

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

// Banner shown at top of pages when trial is active or expired
const ViewOnlyBanner = () => {
    const plan = usePlan()
    const navigate = useNavigate()

    if (plan.loading) return null

    if (plan.plan === 'expired') {
        return (
            <div className="w-full bg-red-500 text-white text-center py-2 px-4 text-sm font-medium flex items-center justify-center gap-3">
                Your free trial has expired. You are in view-only mode.
                <button
                    onClick={() => navigate('/subscription')}
                    className="bg-white text-red-500 text-xs font-bold px-3 py-1 rounded hover:bg-red-50 transition-colors"
                >
                    Upgrade Now
                </button>
            </div>
        )
    }

    if (plan.plan === 'trial' && plan.isTrialActive) {
        return (
            <div className="w-full bg-orange-400 text-white text-center py-2 px-4 text-sm font-medium flex items-center justify-center gap-3">
                Free trial: {plan.trialDaysRemaining} day{plan.trialDaysRemaining !== 1 ? 's' : ''} remaining.
                <button
                    onClick={() => navigate('/subscription')}
                    className="bg-white text-orange-500 text-xs font-bold px-3 py-1 rounded hover:bg-orange-50 transition-colors"
                >
                    Upgrade
                </button>
            </div>
        )
    }

    return null
}

export default ViewOnlyBanner