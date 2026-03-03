import { useState } from "react";
import { LuCircleDot } from "react-icons/lu";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Subscription() {
    const [loadingPlan, setLoadingPlan] = useState(null)
    const [email, setEmail] = useState(localStorage.getItem('userEmail') || '')
    const [emailError, setEmailError] = useState('')
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const success = searchParams.get('success')
    const canceled = searchParams.get('canceled')
    const successPlan = searchParams.get('plan')

    const validateEmail = () => {
        if (!email || !email.includes('@')) {
            setEmailError('Please enter a valid email address.')
            return false
        }
        setEmailError('')
        return true
    }

    const handleGetStarted = async (plan) => {
        if (!validateEmail()) return
        localStorage.setItem('userEmail', email)
        setLoadingPlan(plan)

        try {
            if (plan === 'free') {
                const res = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/stripe/free-trial`,
                    { email }
                )
                console.log('Free trial response:', res.data)
                // Only navigate AFTER successful response
                navigate('/')
                return
            }

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/stripe/checkout`,
                { plan, email }
            )
            window.location.href = response.data.url
        } catch (error) {
            console.error('Checkout error:', error)
        } finally {
            setLoadingPlan(null)
        }
    }

    return (
        <div className="bg-[#e7e7e7] min-h-screen">
            <div>
                <h1 className="text-center text-[72px] mt-10 leading-none">
                    The perfect plan <br /> for every budget
                </h1>
                <p className="text-center text-[18px] mt-10 text-gray-500">
                    Software that returns more money than you spend.
                </p>

                <div className="flex flex-col items-center mt-8 gap-1">
                    <input
                        type="email"
                        placeholder="Enter your email to get started"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-80 h-11 rounded-lg pl-4 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-[15px]"
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>

                {success && (
                    <div className="mx-auto mt-6 max-w-lg bg-green-100 border border-green-400 text-green-800 rounded-xl px-6 py-4 text-center text-[16px] font-medium">
                        Payment successful! You are now on the <span className="font-bold capitalize">{successPlan} Plan</span>. Welcome aboard!
                    </div>
                )}
                {canceled && (
                    <div className="mx-auto mt-6 max-w-lg bg-red-100 border border-red-400 text-red-800 rounded-xl px-6 py-4 text-center text-[16px] font-medium">
                        Payment was canceled. No charges were made.
                    </div>
                )}

                <div className="mb-24 mt-16">
                    <div className="flex items-stretch justify-center gap-12">
                        <div className="max-w-93 px-8 py-15 bg-white text-center rounded-2xl flex flex-col">
                            <h1 className="text-[32px] leading-none tracking-none mb-6">Free Plan</h1>
                            <p className="text-[18px] mb-8">Test the app before purchasing. Full access for 7 days, then view-only mode.</p>
                            <h1 className="text-[40px] font-semibold mb-8">7 Days Trial</h1>
                            <button onClick={() => handleGetStarted('free')} disabled={loadingPlan === 'free'}
                                className="text-[25px] text-white rounded-[15px] px-21 py-3 bg-[#3b82f6] cursor-pointer hover:bg-[#5291f5] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                                {loadingPlan === 'free' ? 'Starting...' : 'Get Started'}
                            </button>
                            <ul className="mt-8 text-[19px] text-left">
                                <li className="flex items-center gap-2"><LuCircleDot />Connect Unlimited Store</li>
                                <li className="flex items-center gap-2"><LuCircleDot />Get Insights</li>
                                <li className="flex items-center gap-2"><LuCircleDot />Input Costs</li>
                                <li className="flex items-center gap-2"><LuCircleDot />Export CSV Data</li>
                                <li className="flex items-center gap-2 text-gray-400 text-[15px] mt-1">* View-only after 7 days</li>
                            </ul>
                        </div>

                        <div className="max-w-93 px-8 py-15 text-white bg-[#3b82f6] text-center rounded-2xl flex flex-col">
                            <h1 className="text-[32px] leading-none tracking-none mb-6">Starter Plan</h1>
                            <p className="text-[18px] mb-8">The perfect plan for early stage startups that want to launch quickly.</p>
                            <h1 className="text-[40px] font-semibold mb-8">$15 / monthly</h1>
                            <button onClick={() => handleGetStarted('starter')} disabled={loadingPlan === 'starter'}
                                className="text-[25px] rounded-[15px] px-21 py-3 text-[#3b82f6] bg-white cursor-pointer hover:bg-[#538ff0] hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                                {loadingPlan === 'starter' ? 'Redirecting...' : 'Get Started'}
                            </button>
                            <ul className="mt-8 text-[19px] text-left">
                                <li className="flex items-center gap-2"><LuCircleDot />Connect Unlimited Store</li>
                                <li className="flex items-center gap-2"><LuCircleDot />Get NewsLetters through Email</li>
                                <li className="flex items-center gap-2"><LuCircleDot />Input Costs</li>
                                <li className="flex items-center gap-2"><LuCircleDot />Export CSV Data</li>
                            </ul>
                        </div>

                        <div className="max-w-93 px-8 py-15 bg-white text-center rounded-2xl flex flex-col">
                            <h1 className="text-[32px] leading-none tracking-none mb-6">Pro Plan</h1>
                            <p className="text-[18px] mb-8">Best suited for businesses looking for all features including insights through emails.</p>
                            <h1 className="text-[40px] font-semibold mb-8">$29 / monthly</h1>
                            <button onClick={() => handleGetStarted('pro')} disabled={loadingPlan === 'pro'}
                                className="text-[25px] text-white rounded-[15px] px-21 py-3 bg-[#3b82f6] cursor-pointer hover:bg-[#5291f5] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                                {loadingPlan === 'pro' ? 'Redirecting...' : 'Get Started'}
                            </button>
                            <ul className="mt-8 text-[19px] text-left">
                                <li className="flex items-center gap-2"><LuCircleDot />Connect Unlimited Store</li>
                                <li className="flex items-center gap-2"><LuCircleDot />Get Insights</li>
                                <li className="flex items-center gap-2"><LuCircleDot />Input Costs</li>
                                <li className="flex items-center gap-2"><LuCircleDot />Export CSV Data</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription