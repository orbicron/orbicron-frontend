import { NextRequest, NextResponse } from 'next/server'
import { getDashboardData } from '@/lib/dashboard'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        if (!userId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 })
        }

        const dashboardData = await getDashboardData(userId)
        return NextResponse.json(dashboardData)

    } catch (error) {
        console.error('Dashboard API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
