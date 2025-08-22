// hooks/useExpenses.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Expense } from '@/types/expense';

interface ExpenseState {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    updateExpense: (id: string, expense: Partial<Expense>) => void;
    deleteExpense: (id: string) => void;
    getExpensesByGroup: (groupId: string) => Expense[];
}

export const useExpenseStore = create<ExpenseState>()(
    persist(
        (set, get) => ({
            expenses: [],
            addExpense: (expense) =>
                set((state) => ({ expenses: [...state.expenses, expense] })),
            updateExpense: (id, updates) =>
                set((state) => ({
                    expenses: state.expenses.map(exp =>
                        exp.id === id ? { ...exp, ...updates } : exp
                    )
                })),
            deleteExpense: (id) =>
                set((state) => ({
                    expenses: state.expenses.filter(exp => exp.id !== id)
                })),
            getExpensesByGroup: (groupId) =>
                get().expenses.filter(exp => exp.groupId === groupId),
        }),
        { name: 'pisplit-expenses' }
    )
);
