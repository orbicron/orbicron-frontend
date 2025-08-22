import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProfileState {
    preferences: {
        theme: 'light' | 'dark' | 'auto'
        currency: 'PI' | 'USD' | 'EUR'
        language: string
        notifications: Record<string, boolean>
        animationsEnabled: boolean
        compactMode: boolean
    }
    updatePreferences: (preferences: Partial<ProfileState['preferences']>) => void

    userStats: {
        totalTransactions: number
        totalSettled: number
        activeGroups: number
        achievements: number
        level: number
    }
    updateStats: (stats: Partial<ProfileState['userStats']>) => void
}

export const useProfileStore = create<ProfileState>()(
    persist(
        (set) => ({
            preferences: {
                theme: 'dark',
                currency: 'PI',
                language: 'en',
                notifications: {},
                animationsEnabled: true,
                compactMode: false
            },
            updatePreferences: (newPreferences) =>
                set((state) => ({
                    preferences: { ...state.preferences, ...newPreferences }
                })),

            userStats: {
                totalTransactions: 0,
                totalSettled: 0,
                activeGroups: 0,
                achievements: 0,
                level: 1
            },
            updateStats: (newStats) =>
                set((state) => ({
                    userStats: { ...state.userStats, ...newStats }
                }))
        }),
        { name: 'orbicron-profile' }
    )
)
