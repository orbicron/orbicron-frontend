'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: '📸',
    title: 'AI Receipt Scanner',
    description: 'Scan any receipt, split instantly',
    details: 'Advanced OCR technology reads receipts in 75+ languages with 99% accuracy.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: '🧠',
    title: 'Smart Debt Optimization',
    description: 'Minimize transactions with algorithms',
    details: 'Graph theory algorithms reduce Pi token transfers by up to 80%.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: 'π',
    title: 'Pi Token Integration',
    description: 'Seamless cryptocurrency payments',
    details: 'Native Pi Network integration with instant, secure blockchain settlements.',
    color: 'from-green-500 to-emerald-500'
  },
]

export const FeaturesShowcase = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Powered by
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Advanced Technology
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of expense splitting with AI-powered features
            and blockchain-secured payments.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                {/* Gradient background effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className={`w-16 h-1 bg-gradient-to-r ${feature.color} rounded-full`}></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-purple-200 text-lg mb-4 font-medium">
                    {feature.description}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.details}
                  </p>
                </div>

                {/* Hover effect decoration */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full animate-pulse`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
