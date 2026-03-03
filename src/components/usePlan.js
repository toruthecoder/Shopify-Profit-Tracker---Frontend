import { useState, useEffect } from 'react'
import axios from 'axios'

export const usePlan = () => {
    const [planData, setPlanData] = useState({
        plan: null,
        isTrialActive: false,
        trialDaysRemaining: 0,
        canExportCSV: false,
        canInputCosts: false,
        isViewOnly: false,
        loading: true,
        error: null,
    })

    useEffect(() => {
        const fetchPlanStatus = async () => {
            // Your localStorage key is 'userEmail' — match it exactly
            const email = localStorage.getItem('userEmail')

            if (!email) {
                // No email = no user = lock everything down
                setPlanData({
                    plan: 'expired',
                    isTrialActive: false,
                    trialDaysRemaining: 0,
                    canExportCSV: false,
                    canInputCosts: false,
                    isViewOnly: true,
                    loading: false,
                    error: null,
                })
                return
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/stripe/plan-status?email=${encodeURIComponent(email)}`
                )
                setPlanData({ ...response.data, loading: false, error: null })
            } catch (error) {
                console.error('Failed to fetch plan status:', error)
                setPlanData({
                    plan: 'trial',
                    isTrialActive: true,
                    trialDaysRemaining: 0,
                    canExportCSV: true,
                    canInputCosts: true,
                    isViewOnly: false,
                    loading: false,
                    error: error.message,
                })
            }
        }

        fetchPlanStatus()
    }, [])

    return planData
}