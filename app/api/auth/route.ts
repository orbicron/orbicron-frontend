import { NextRequest, NextResponse } from 'next/server'
import { createOrGetUser } from '@/lib/user'

export async function POST(request: NextRequest) {
    try {
        const { piUserId } = await request.json()
        if (!piUserId) {
            return NextResponse.json(
                { error: 'Pi User ID is required' },
                { status: 400 }
            )
        }

        // Optional: Verify access token with Pi Platform
        // const isValidToken = await verifyPiAccessToken(accessToken)
        // if (!isValidToken) {
        //   return NextResponse.json({ error: 'Invalid access token' }, { status: 401 })
        // }

        // Create or get user from database
        const user = await createOrGetUser(piUserId)

        return NextResponse.json({
            success: true,
            user,
            message: 'User connected successfully'
        })

    } catch (error) {
        console.error('Pi connect API error:', error)
        return NextResponse.json(
            { error: 'Failed to connect user' },
            { status: 500 }
        )
    }
}
