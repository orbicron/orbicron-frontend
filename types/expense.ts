// types/expense.ts
export interface Expense {
    id: string;
    title: string;
    amount: number;
    currency: 'PI' | 'USD';
    paidBy: string; // Pi user ID
    splitBetween: string[];
    category: ExpenseCategory;
    date: Date;
    description?: string;
    receiptImage?: string;
    groupId?: string
}

export interface Split {
    userId: string;
    username: string;
    amount: number;
    paid: boolean;
}

export type ExpenseCategory = 'food' | 'transport' | 'accommodation' | 'entertainment' | 'shopping' | 'other';
