// app/api/payments/approve/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/middleware/auth'
import { prisma } from '@/lib/prisma'

export const POST = withAuth(async (req) => {
    try {
        const userId = req.user!.id
        console.log(userId)
        const {
            paymentId,
            receiverPublicKey,
            amount,
            currency = 'PI',
            category,
            description,
            paymentType = 'quick_pay'
        } = await req.json()

        // Validation
        if (!paymentId || !receiverPublicKey || !amount) {
            return NextResponse.json(
                { error: 'Payment ID, receiver public key and amount are required' },
                { status: 400 }
            )
        }

        // Create pending settlement record
        const settlement = await prisma.settlement.create({
            data: {
                fromUserId: userId,
                toUserId: null, // External transfer
                receiverPublicKey: receiverPublicKey,
                amount: parseFloat(amount),
                status: 'pending',
                piTransactionId: paymentId,
                blockchainNetwork: 'testnet',
                metadata: {
                    currency,
                    category: category || null,
                    description: description || null,
                    paymentType,
                    receiverPublicKey,
                    approved: true
                }
            }
        })

        return NextResponse.json({
            success: true,
            settlement,
            message: 'Payment approved successfully'
        })

    } catch (error) {
        console.error('Payment approval error:', error)
        return NextResponse.json(
            { error: 'Failed to approve payment' },
            { status: 500 }
        )
    }
})
