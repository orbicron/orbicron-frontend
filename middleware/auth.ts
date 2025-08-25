// middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyPiAccessToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface AuthRequest extends NextRequest {
    user?: {
        id: string
        piUserId: string
        displayId: string
    }
}

// In-memory cache for token verification (production: use Redis)
const tokenCache = new Map<string, {
    user: any,
    expiresAt: number
}>()

export const withAuth = (handler: (req: AuthRequest) => Promise<Response>) => {
    return async (req: NextRequest) => {
        try {
            // 1. Extract token from Authorization header
            const authHeader = req.headers.get('authorization')
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return NextResponse.json(
                    { error: 'Access token required' },
                    { status: 401 }
                )
            }

            const accessToken = authHeader.substring(7) // Remove "Bearer "

            // 2. Check cache first (avoid excessive Pi API calls)
            const cached = tokenCache.get(accessToken)
            if (cached && cached.expiresAt > Date.now()) {
                ; (req as AuthRequest).user = cached.user
                return handler(req as AuthRequest)
            }

            // 3. Verify token with Pi Platform
            const verification = await verifyPiAccessToken(accessToken)

            if (!verification.isValid) {
                return NextResponse.json(
                    { error: 'Invalid or expired access token' },
                    { status: 401 }
                )
            }

            // 4. Get user from your database using verified Pi User ID
            const user = await prisma.user.findUnique({
                where: { piUserId: verification.user.uid },
                select: {
                    id: true,
                    piUserId: true,
                    displayId: true,
                    avatar: true,
                    preferences: true
                }
            })

            if (!user) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                )
            }

            // 5. Cache verification result (15 minutes)
            tokenCache.set(accessToken, {
                user,
                expiresAt: Date.now() + 15 * 60 * 1000 // 15 minutes
            })

                // 6. Add user to request object
                ; (req as AuthRequest).user = user

            // 7. Continue to the actual handler
            return handler(req as AuthRequest)

        } catch (error) {
            console.error('Auth middleware error:', error)
            return NextResponse.json(
                { error: 'Authentication failed' },
                { status: 500 }
            )
        }
    }
}
