import { create } from 'zustand'

interface AnalyticsState {
    selectedTimeRange: 'week' | 'month' | 'quarter' | 'year'
    setTimeRange: (range: 'week' | 'month' | 'quarter' | 'year') => void

    // Chart preferences
    chartType: 'line' | 'bar'
    setChartType: (type: 'line' | 'bar') => void

    // Achievements
    achievements: any[]
    userStats: {
        level: number
        experiencePoints: number
        totalEarned: number
    }
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
    selectedTimeRange: 'month',
    setTimeRange: (range) => set({ selectedTimeRange: range }),

    chartType: 'line',
    setChartType: (type) => set({ chartType: type }),

    achievements: [],
    userStats: {
        level: 1,
        experiencePoints: 0,
        totalEarned: 0
    }
}))
