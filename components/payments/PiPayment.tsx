'use client';
import { usePiSDK } from '@/hooks/usePiSDK';
import { useState } from 'react';

interface PiPaymentProps {
  amount: number;
  recipientId: string;
  expenseId: string;
  onSuccess: () => void;
  onError: (error: any) => void;
}

export const PiPayment = ({ amount, recipientId, expenseId, onSuccess, onError }: PiPaymentProps) => {
  const { piSDK } = usePiSDK();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!piSDK) return;
    
    setIsProcessing(true);

    try {
      const paymentData = {
        amount: amount,
        memo: `PiSplit expense payment - ${expenseId}`,
        metadata: { 
          expenseId,
          recipientId,
          type: 'expense_settlement'
        }
      };

      const payment = await piSDK.createPayment(paymentData, {
        onReadyForServerApproval: (paymentId: string) => {
          console.log('Payment ready for approval:', paymentId);
          // In a real app, you'd call your backend here
          // For now, we'll auto-approve for demo purposes
        },
        onReadyForServerCompletion: (paymentId: string, txid: string) => {
          console.log('Payment completed:', paymentId, txid);
          // Store payment record locally
          const paymentRecord = {
            paymentId,
            txid,
            expenseId,
            amount,
            recipientId,
            timestamp: Date.now(),
            status: 'completed'
          };
          
          localStorage.setItem(`payment_${paymentId}`, JSON.stringify(paymentRecord));
          onSuccess();
        },
        onCancel: (paymentId: string) => {
          console.log('Payment cancelled:', paymentId);
          setIsProcessing(false);
        },
        onError: (error: any) => {
          console.error('Payment error:', error);
          onError(error);
          setIsProcessing(false);
        }
      });

    } catch (error) {
      console.error('Payment creation failed:', error);
      onError(error);
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isProcessing}
      className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
    >
      {isProcessing ? 'Processing...' : `Pay ${amount} π`}
    </button>
  );
};
