'use client'
import { PiAuth } from '@/components/auth/PIAuth'

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">PiSplit</h1>
        <p className="text-gray-600 text-center mb-8">
          Smart expense splitting with Pi tokens
        </p>
        
        <div className="text-center">
          <PiAuth />
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Phase 1: Foundation Setup Complete</p>
          <p>Pi Network SDK Integration Ready</p>
        </div>
      </div>
    </main>
  )
}
