'use client'
import { ExpenseHeader } from '@/components/expenses/ExpenseHeader'

export default function ExpensesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <ExpenseHeader />
      {children}
    </div>
  )
}
