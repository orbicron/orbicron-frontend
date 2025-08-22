'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const FloatingReceiptAnimation = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative w-full max-w-4xl mx-auto h-96 flex items-center justify-center">
      {/* Main Receipt */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl">🧾</div>
            <div className="text-purple-300 text-sm">Scanning...</div>
          </div>
          
          <div className="space-y-3">
            <div className="h-3 bg-white/20 rounded w-3/4"></div>
            <div className="h-3 bg-white/20 rounded w-1/2"></div>
            <div className="h-3 bg-white/20 rounded w-2/3"></div>
            <div className="border-t border-white/20 pt-3 mt-4">
              <div className="h-4 bg-purple-400/50 rounded w-1/3 ml-auto"></div>
            </div>
          </div>
        </div>

        {/* Scanning line effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </motion.div>

      {/* Floating elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 rounded-full bg-purple-400/30 backdrop-blur-sm"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          style={{
            left: `${20 + (i * 10)}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
        </motion.div>
      ))}
    </div>
  )
}
