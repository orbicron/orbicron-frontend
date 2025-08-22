// hooks/usePiSDK.ts - Updated for sandbox testing
'use client';
import { useEffect, useState } from 'react';

declare global {
    interface Window { Pi: any; }
}

export const usePiSDK = () => {
    const [piSDK, setPiSDK] = useState<any>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Pi) {
            const initializePi = async () => {
                await window.Pi.init({
                    version: "2.0",
                    sandbox: true // Always true for development[1]
                });
                setPiSDK(window.Pi);
                setIsInitialized(true);
                console.log('Pi SDK initialized in sandbox mode');
            };
            initializePi();
        }
    }, []);

    const authenticate = async () => {
        if (!piSDK) return null;

        try {
            const scopes = ['username', 'payments'];
            console.log('Attempting Pi authentication with scopes:', scopes);

            const authResult = await piSDK.authenticate(scopes, onIncompletePaymentFound);
            setUser(authResult.user);

            // Store auth data for testing
            localStorage.setItem('pi_user', JSON.stringify(authResult.user));
            localStorage.setItem('pi_access_token', authResult.accessToken);

            console.log('Pi authentication successful:', authResult.user);
            return authResult;
        } catch (error) {
            console.error('Pi authentication failed:', error);
            return null;
        }
    };

    const onIncompletePaymentFound = (payment: any) => {
        console.log('Incomplete payment found:', payment);
        return piSDK.completePayment(payment.identifier);
    };

    return { piSDK, isInitialized, user, authenticate };
};
