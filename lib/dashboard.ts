// lib/dashboard.ts
import { prisma } from './prisma'

// Pi balance fetching function
export const getPiBalance = async (accessToken: string) => {
    try {
        const response = await fetch('https://api.minepi.com/v2/me/balance', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        console.log("user balence fetched with a api call", response)
        if (response.ok) {
            const balanceData = await response.json()
            return {
                available: balanceData.available || 0,
                locked: balanceData.locked || 0,
                total: (balanceData.available || 0) + (balanceData.locked || 0)
            }
        } else {
            console.error('Failed to fetch Pi balance:', response.status)
            return { available: 0, locked: 0, total: 0 }
        }
    } catch (error) {
        console.error('Pi balance fetch error:', error)
        return { available: 0, locked: 0, total: 0 }
    }
}

export const getDashboardData = async (userId: string, accessToken?: string) => {
    try {
        const [user, totalOwed, totalOwing, recentExpenses, recentActivity, piBalance] = await Promise.all([
            // User info
            prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    piUserId: true,
                    displayId: true,
                    avatar: true,
                    preferences: true,
                    createdAt: true,
                    groupMembers: {
                        include: {
                            group: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            }),

            // Total user owes (pending splits where user is debtor)
            prisma.expenseSplit.aggregate({
                where: {
                    userId,
                    status: 'pending'
                },
                _sum: {
                    amount: true
                }
            }),

            // Total owed to user (pending splits where user paid but others haven't)
            prisma.expenseSplit.aggregate({
                where: {
                    expense: {
                        paidById: userId
                    },
                    status: 'pending',
                    userId: {
                        not: userId
                    }
                },
                _sum: {
                    amount: true
                }
            }),

            // Recent expenses (limited for performance)
            prisma.expense.findMany({
                where: {
                    OR: [
                        { paidById: userId },
                        { splits: { some: { userId } } }
                    ]
                },
                orderBy: { createdAt: 'desc' },
                take: 10,
                select: {
                    id: true,
                    title: true,
                    amount: true,
                    currency: true,
                    category: true,
                    createdAt: true,
                    paidBy: {
                        select: {
                            displayId: true,
                            avatar: true
                        }
                    },
                    splits: {
                        select: {
                            amount: true,
                            status: true,
                            user: {
                                select: {
                                    displayId: true,
                                    avatar: true
                                }
                            }
                        }
                    }
                }
            }),

            // Recent activity
            prisma.activity.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                take: 10,
                select: {
                    id: true,
                    type: true,
                    description: true,
                    metadata: true,
                    createdAt: true
                }
            }),

            // Fetch Pi balance if access token provided
            accessToken ? getPiBalance(accessToken) : null
        ])

        // Calculate previous period data for comparison (simplified)
        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

        const [prevTotalOwed, prevTotalOwing] = await Promise.all([
            prisma.expenseSplit.aggregate({
                where: {
                    userId,
                    status: 'pending',
                    createdAt: { lte: oneMonthAgo }
                },
                _sum: { amount: true }
            }),
            prisma.expenseSplit.aggregate({
                where: {
                    expense: { paidById: userId },
                    status: 'pending',
                    userId: { not: userId },
                    createdAt: { lte: oneMonthAgo }
                },
                _sum: { amount: true }
            })
        ])

        const currentOwed = totalOwed._sum.amount || 0
        const currentOwing = totalOwing._sum.amount || 0
        const prevOwed = prevTotalOwed._sum.amount || 0
        const prevOwing = prevTotalOwing._sum.amount || 0

        return {
            user,
            financialSummary: {
                totalOwed: currentOwed,
                totalOwing: currentOwing,
                netBalance: currentOwing - currentOwed,
                piBalance: piBalance?.available || 0,

                // Calculate changes for better UX
                owedChange: prevOwed > 0 ? ((currentOwed - prevOwed) / prevOwed) * 100 : 0,
                owingChange: prevOwing > 0 ? ((currentOwing - prevOwing) / prevOwing) * 100 : 0
            },
            recentExpenses,
            recentActivity,
            piBalance
        }
    } catch (error) {
        console.error('Dashboard data fetch error:', error)
        throw error
    }
}
