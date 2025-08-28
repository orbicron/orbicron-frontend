// app/api/payments/complete/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/middleware/auth'
import { prisma } from '@/lib/prisma'
import axios from "axios"
const config = {headers:{'Authorization':`Key uytbdc00bebbthjswpf42nmrwbcxaieshqetiggkxyluqg3txwmpjfl4zb3ymgbr`}}
const axiosClient = axios.create({baseURL:'https://api.minepi.com',timeout:20000})

export const POST = withAuth(async (req) => {
    try {
        const userId = req.user!.id
        const { paymentId, txid, receiverPublicKey, amount, currency } = await req.json()

        // Validation
        if (!paymentId || !txid) {
            return NextResponse.json(
                { error: 'Payment ID and transaction ID are required' },
                { status: 400 }
            )
        }

        // Update settlement record
        const settlement = await prisma.settlement.update({
            where: { piTransactionId: paymentId },
            data: {
                status: 'completed',
                piTransactionHash: txid,
                completedAt: new Date()
            }
        })
        const resFrPi = axiosClient.post(`/v2/payments/${paymentId}/complete`,{txid},config)
        return NextResponse.json({
            success: true,
            settlement,
            message: 'Payment completed successfully'
        })

    } catch (error) {
        console.error('Payment completion error:', error)
        return NextResponse.json(
            { error: 'Failed to complete payment' },
            { status: 500 }
        )
    }
})
