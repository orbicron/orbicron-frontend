// app/api/payments/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/middleware/auth'
import { prisma } from '@/lib/prisma'

export const POST = withAuth(async (req) => {
    try {
        const userId = req.user!.id
        const {
            receiverPublicKey,
            amount,
            currency = 'PI',
            category,
            description,
            paymentType = 'quick_pay'
        } = await req.json()

        // Validation
        if (!receiverPublicKey || !amount) {
            return NextResponse.json(
                { error: 'Receiver public key and amount are required' },
                { status: 400 }
            )
        }

        if (amount <= 0) {
            return NextResponse.json(
                { error: 'Amount must be greater than 0' },
                { status: 400 }
            )
        }

        // For hackathon demo, we'll simulate the Pi Network payment
        // In production, this would integrate with Pi SDK payment APIs
        const simulatedTxId = `pi_tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        // Create payment record in database
        const payment = await prisma.settlement.create({
            data: {
                fromUserId: userId,
                toUserId: "", // We don't know the receiver's internal user ID from public key
                amount: parseFloat(amount),
                status: 'completed', // In real implementation, this would start as 'pending'
                piTransactionId: simulatedTxId,
                metadata: {
                    receiverPublicKey,
                    currency,
                    category: category || null,
                    description: description || null,
                    paymentType,
                    simulatedPayment: true // Mark as simulated for demo
                }
            }
        })

        // Create expense record if category provided
        if (category) {
            const expense = await prisma.expense.create({
                data: {
                    title: `Payment to ${receiverPublicKey.slice(0, 8)}...`,
                    amount: parseFloat(amount),
                    currency,
                    category,
                    description,
                    paidById: userId,
                    splits: {
                        create: {
                            userId: userId,
                            amount: parseFloat(amount),
                            status: 'settled' // Already paid
                        }
                    }
                }
            })
        }

        // Create activity log
        await prisma.activity.create({
            data: {
                userId,
                type: 'payment_sent',
                description: `Sent ${amount} ${currency} via Quick Pay`,
                metadata: {
                    paymentId: payment.id,
                    receiverPublicKey,
                    amount,
                    currency,
                    piTransactionId: simulatedTxId
                }
            }
        })

        return NextResponse.json({
            success: true,
            payment,
            piTransactionId: simulatedTxId,
            message: 'Payment processed successfully'
        })

    } catch (error) {
        console.error('Payment processing error:', error)
        return NextResponse.json(
            { error: 'Failed to process payment' },
            { status: 500 }
        )
    }
})

// Get payment history
export const GET = withAuth(async (req) => {
    try {
        const userId = req.user!.id
        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const skip = (page - 1) * limit

        const payments = await prisma.settlement.findMany({
            where: {
                OR: [
                    { fromUserId: userId },
                    { toUserId: userId }
                ]
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
            include: {
                fromUser: {
                    select: {
                        displayId: true,
                        avatar: true
                    }
                },
                toUser: {
                    select: {
                        displayId: true,
                        avatar: true
                    }
                }
            }
        })

        return NextResponse.json({
            success: true,
            payments,
            pagination: {
                page,
                limit,
                total: payments.length
            }
        })

    } catch (error) {
        console.error('Payment history fetch error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch payment history' },
            { status: 500 }
        )
    }
})
