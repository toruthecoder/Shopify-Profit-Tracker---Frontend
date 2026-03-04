import { useState, useEffect } from 'react'
import axios from 'axios'

export const usePlan = () => {
    const [planData, setPlanData] = useState({
        plan: null,
        loading: true,
        canExportCSV: false,
        canInputCosts: false,
        isViewOnly: true,
    })

    useEffect(() => {
        const fetchPlan = async () => {
            const email = localStorage.getItem('userEmail')
            if (!email) {
                setPlanData({
                    plan: 'none',
                    isTrialActive: false,
                    trialStartDate: null,
                    trialEndDate: null,
                    trialDaysRemaining: 0,
                    subscriptionStatus: null,
                    canExportCSV: false,
                    canInputCosts: false,
                    isViewOnly: true,
                    loading: false,
                })
                return
            }

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/stripe/plan-status?email=${email}`
                )
                const data = res.data

                // Enable features only if trial is active or paid plan is active
                const isActive = data.plan === 'starter' || data.plan === 'pro' || (data.plan === 'trial' && data.isTrialActive)

                setPlanData({
                    ...data,
                    loading: false,
                    canExportCSV: isActive,
                    canInputCosts: isActive,
                    isViewOnly: !isActive,
                })
            } catch (err) {
                console.log(err)
                setPlanData({
                    plan: 'none',
                    loading: false,
                    canExportCSV: false,
                    canInputCosts: false,
                    isViewOnly: true,
                })
            }
        }

        fetchPlan()
    }, [])

    return planData
}