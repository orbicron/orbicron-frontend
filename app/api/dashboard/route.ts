// app/api/dashboard/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/middleware/auth'
import { getDashboardData } from '@/lib/dashboard'

export const GET = withAuth(async (req) => {
    try {
        const userId = req.user!.id
        console.log(userId)
        // Get access token for Pi balance fetch
        const authHeader = req.headers.get('authorization')
        console.log(authHeader)
        const accessToken = authHeader?.substring(7) // Remove "Bearer "

        const dashboardData = await getDashboardData(userId, accessToken)
        console.log(dashboardData)
        return NextResponse.json({
            success: true,
            data: dashboardData
        })
    } catch (error) {
        console.error('Dashboard API error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch dashboard data' },
            { status: 500 }
        )
    }
})
