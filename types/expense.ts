export interface Expense {
    id: string
    title: string
    amount: number
    currency: 'PI' | 'USD'
    paidBy: string // Pi user ID
    splitBetween: string[] // Array of Pi user IDs
    category: ExpenseCategory
    date: Date
    description?: string
    receiptImage?: string
}

export interface Split {
    userId: string
    username: string
    amount: number
    paid: boolean
}

export type ExpenseCategory =
    | 'food'
    | 'transport'
    | 'accommodation'
    | 'entertainment'
    | 'shopping'
    | 'other'
