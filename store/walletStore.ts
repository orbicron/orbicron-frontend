// store/walletStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PiWallet {
    address: string | null
    publicKey: string | null
    balance: {
        available: number
        locked: number
        total: number
    } | null
}

interface WalletState {
    // Connection state
    isConnected: boolean
    isConnecting: boolean
    wallet: PiWallet | null
    error: string | null

    // Actions
    connectWallet: () => Promise<void>
    disconnectWallet: () => void
    clearError: () => void
    updateBalance: (balance: PiWallet['balance']) => void
}

export const useWalletStore = create<WalletState>()(
    persist(
        (set, get) => ({
            isConnected: false,
            isConnecting: false,
            wallet: null,
            error: null,

            connectWallet: async () => {
                const { isConnecting } = get()
                if (isConnecting) return // Prevent multiple connection attempts

                set({ isConnecting: true, error: null })

                try {
                    // Check if Pi SDK is available
                    if (typeof window === 'undefined' || !window.Pi) {
                        throw new Error('Pi Network is not available. Please use Pi Browser.')
                    }

                    // Authenticate with Pi Network (from your existing Pi SDK)
                    const auth = await window.Pi.authenticate(['payments'], onIncompletePaymentFound)

                    if (auth.user && auth.accessToken) {
                        // For wallet, we'll simulate getting wallet info
                        // In real implementation, this would come from Pi Wallet integration
                        const walletData: PiWallet = {
                            address: `π${auth.user.uid.slice(0, 8)}...${auth.user.uid.slice(-8)}`,
                            publicKey: auth.user.uid,
                            balance: {
                                available: Math.random() * 1000 + 500, // Simulated balance
                                locked: Math.random() * 100 + 50,
                                total: 0
                            }
                        }

                        walletData.balance && (walletData.balance.total = walletData.balance.available + walletData.balance.locked)

                        // Store wallet connection
                        set({
                            isConnected: true,
                            isConnecting: false,
                            wallet: walletData,
                            error: null
                        })

                        // Store in localStorage for persistence
                        localStorage.setItem('pi_wallet_connected', 'true')
                        localStorage.setItem('pi_wallet_data', JSON.stringify(walletData))

                        console.log('Wallet connected successfully:', walletData)
                    } else {
                        throw new Error('Failed to authenticate with Pi Network')
                    }
                } catch (error: any) {
                    console.error('Wallet connection error:', error)
                    set({
                        isConnecting: false,
                        error: error.message || 'Failed to connect wallet'
                    })
                }
            },

            disconnectWallet: () => {
                set({
                    isConnected: false,
                    isConnecting: false,
                    wallet: null,
                    error: null
                })

                // Clear localStorage
                localStorage.removeItem('pi_wallet_connected')
                localStorage.removeItem('pi_wallet_data')

                console.log('Wallet disconnected')
            },

            clearError: () => {
                set({ error: null })
            },

            updateBalance: (balance) => {
                const { wallet } = get()
                if (wallet) {
                    set({
                        wallet: { ...wallet, balance }
                    })
                }
            }
        }),
        {
            name: 'pi-wallet-store',
            // Only persist connection status, not sensitive wallet data
            partialize: (state) => ({
                isConnected: state.isConnected,
                wallet: state.wallet ? {
                    address: state.wallet.address,
                    publicKey: null, // Don't persist sensitive data
                    balance: state.wallet.balance
                } : null
            })
        }
    )
)

// Helper function for incomplete payments (Pi SDK requirement)
function onIncompletePaymentFound(payment: any) {
    console.log('Incomplete payment found:', payment)
    // Handle incomplete payments if needed
}
