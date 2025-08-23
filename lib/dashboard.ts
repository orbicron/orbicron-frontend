import { prisma } from "./prisma"
export const getDashboardData = async (userId: string) => {
    const [user, totalOwed, totalOwing, recentExpenses, recentActivity] = await Promise.all([
        // User info
        prisma.user.findUnique({
            where: { id: userId },
            include: {
                groupMembers: {
                    include: {
                        group: true
                    }
                }
            }
        }),

        // Total user owes
        prisma.expenseSplit.aggregate({
            where: {
                userId,
                status: 'pending'
            },
            _sum: {
                amount: true
            }
        }),

        // Total owed to user
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

        // Recent expenses
        prisma.expense.findMany({
            where: {
                OR: [
                    { paidById: userId },
                    { splits: { some: { userId } } }
                ]
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
            include: {
                paidBy: true,
                splits: {
                    include: {
                        user: true
                    }
                }
            }
        }),

        // Recent activity
        prisma.activity.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 10
        })
    ])

    return {
        user,
        financialSummary: {
            totalOwed: totalOwed._sum.amount || 0,
            totalOwing: totalOwing._sum.amount || 0,
            netBalance: (totalOwing._sum.amount || 0) - (totalOwed._sum.amount || 0)
        },
        recentExpenses,
        recentActivity
    }
}
