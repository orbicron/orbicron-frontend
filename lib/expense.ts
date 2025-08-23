import { prisma } from "./prisma"
export const createExpenseWithSplits = async (
    title: string,
    amount: number,
    paidById: string,
    splitUserIds: string[],
    category?: string,
    groupId?: string
) => {
    const splitAmount = amount / splitUserIds.length

    const expense = await prisma.expense.create({
        data: {
            title,
            amount,
            category,
            paidById,
            groupId,
            splits: {
                create: splitUserIds.map(userId => ({
                    userId,
                    amount: splitAmount,
                    status: 'pending'
                }))
            }
        },
        include: {
            splits: {
                include: {
                    user: true
                }
            },
            paidBy: true
        }
    })

    return expense
}
