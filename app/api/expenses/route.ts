// app/api/expenses/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/middleware/auth'
import { prisma } from '@/lib/prisma'

export const POST = withAuth(async (req) => {
    try {
        const userId = req.user!.id
        const { title, amount, currency, category, description } = await req.json()

        // Validation
        if (!title || !amount || !currency || !category) {
            return NextResponse.json(
                { error: 'Title, amount, currency, and category are required' },
                { status: 400 }
            )
        }

        if (amount <= 0) {
            return NextResponse.json(
                { error: 'Amount must be greater than 0' },
                { status: 400 }
            )
        }

        // Create expense in database
        const expense = await prisma.expense.create({
            data: {
                title,
                amount: parseFloat(amount),
                currency,
                category,
                description,
                paidById: userId,
                // Create a split for the user who paid (they owe themselves the full amount initially)
                splits: {
                    create: {
                        userId: userId,
                        amount: parseFloat(amount),
                        status: 'pending'
                    }
                }
            },
            include: {
                paidBy: {
                    select: {
                        id: true,
                        displayId: true,
                        avatar: true
                    }
                },
                splits: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                displayId: true,
                                avatar: true
                            }
                        }
                    }
                }
            }
        })

        // Create activity log
        await prisma.activity.create({
            data: {
                userId,
                type: 'expense_added',
                description: `Added expense: ${title}`,
                metadata: {
                    expenseId: expense.id,
                    amount: amount,
                    currency: currency,
                    category: category
                }
            }
        })

        return NextResponse.json({
            success: true,
            expense
        })

    } catch (error) {
        console.error('Expense creation error:', error)
        return NextResponse.json(
            { error: 'Failed to create expense' },
            { status: 500 }
        )
    }
})

export const GET = withAuth(async (req) => {
    try {
        const userId = req.user!.id
        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const skip = (page - 1) * limit

        const expenses = await prisma.expense.findMany({
            where: {
                OR: [
                    { paidById: userId },
                    { splits: { some: { userId } } }
                ]
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
            include: {
                paidBy: {
                    select: {
                        id: true,
                        displayId: true,
                        avatar: true
                    }
                },
                splits: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                displayId: true,
                                avatar: true
                            }
                        }
                    }
                },
                group: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        const totalExpenses = await prisma.expense.count({
            where: {
                OR: [
                    { paidById: userId },
                    { splits: { some: { userId } } }
                ]
            }
        })

        return NextResponse.json({
            success: true,
            expenses,
            pagination: {
                page,
                limit,
                total: totalExpenses,
                pages: Math.ceil(totalExpenses / limit)
            }
        })

    } catch (error) {
        console.error('Expenses fetch error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch expenses' },
            { status: 500 }
        )
    }
})
