'use client'
import { PiAuth } from '@/components/auth/PiAuth'
import { FloatingReceiptAnimation } from './FloatingReceiptAnimation'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main headline */}
        <div className="mb-8">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-500/20 backdrop-blur-md rounded-full border border-purple-300/30">
            <span className="text-purple-200 text-sm font-medium">
              🚀 Powered by Pi Network Blockchain
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Split Expenses
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Smarter with Pi Tokens
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered receipt scanning meets instant Pi settlements. 
            The future of group expense management is here.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mb-16">
          <PiAuth />
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors group">
              <span>Watch Demo</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400 text-sm">No credit card required</span>
          </div>
        </div>

        {/* Floating Animation */}
        <div className="relative">
          <FloatingReceiptAnimation />
        </div>
      </div>
    </section>
  )
}
