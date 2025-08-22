// components/expenses/AddExpenseForm.tsx
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useExpenseStore } from "@/store/useExpense";
import { useAuthStore } from '@/store/authStore';

export const AddExpenseForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { addExpense } = useExpenseStore();
  const { user } = useAuthStore();

  const onSubmit = (data: any) => {
    const expense = {
      id: crypto.randomUUID(),
      title: data.title,
      amount: parseFloat(data.amount),
      currency: 'PI',
      paidBy: user.uid,
      splitBetween: [user.uid], // Start with just current user
      category: data.category,
      date: new Date(),
      description: data.description,
    };

    addExpense(expense);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register('title', { required: true })}
        placeholder="Expense title"
        className="w-full p-3 border rounded-lg"
      />
      
      <input
        {...register('amount', { required: true })}
        type="number"
        step="0.01"
        placeholder="Amount in Pi"
        className="w-full p-3 border rounded-lg"
      />

      <select
        {...register('category')}
        className="w-full p-3 border rounded-lg"
      >
        <option value="food">Food & Dining</option>
        <option value="transport">Transport</option>
        <option value="accommodation">Accommodation</option>
        <option value="entertainment">Entertainment</option>
        <option value="shopping">Shopping</option>
        <option value="other">Other</option>
      </select>

      <textarea
        {...register('description')}
        placeholder="Description (optional)"
        className="w-full p-3 border rounded-lg"
        rows={3}
      />

      <button
        type="submit"
        className="w-full bg-purple-600 text-white p-3 rounded-lg"
      >
        Add Expense
      </button>
    </form>
  );
};
