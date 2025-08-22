'use client'
import { useEffect, useState } from 'react'

declare global {
    interface Window {
        Pi: any
    }
}

export const usePiSDK = () => {
    const [piSDK, setPiSDK] = useState<any>(null)
    const [isInitialized, setIsInitialized] = useState(false)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Pi) {
            const initializePi = async () => {
                try {
                    await window.Pi.init({
                        version: "2.0",
                        sandbox: process.env.NODE_ENV !== 'production'
                    })
                    setPiSDK(window.Pi)
                    setIsInitialized(true)
                    console.log('Pi SDK initialized successfully')
                } catch (error) {
                    console.error('Pi SDK initialization failed:', error)
                }
            }

            if (document.readyState === 'complete') {
                initializePi()
            } else {
                window.addEventListener('load', initializePi)
            }

            return () => window.removeEventListener('load', initializePi)
        }
    }, [])

    const authenticate = async () => {
        if (!piSDK) return null

        try {
            const scopes = ['username', 'payments']
            const authResult = await piSDK.authenticate(scopes, onIncompletePaymentFound)
            setUser(authResult.user)
            localStorage.setItem('pi_user', JSON.stringify(authResult.user))
            localStorage.setItem('pi_access_token', authResult.accessToken)
            return authResult
        } catch (error) {
            console.error('Pi authentication failed:', error)
            return null
        }
    }

    const onIncompletePaymentFound = (payment: any) => {
        console.log('Incomplete payment found:', payment)
        return piSDK.completePayment(payment.identifier)
    }

    return { piSDK, isInitialized, user, authenticate }
}
