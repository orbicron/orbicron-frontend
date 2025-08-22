'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { PlayIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'

const screenshots = [
  {
    title: 'Dashboard Overview',
    description: 'Clean, intuitive expense tracking',
    image: '📊'
  },
  {
    title: 'AI Receipt Scanner',
    description: 'Instant receipt processing',
    image: '📱'
  },
  {
    title: 'Pi Token Payments',
    description: 'Seamless crypto settlements',
    image: '💰'
  },
  {
    title: 'Group Management',
    description: 'Easy expense splitting',
    image: '👥'
  },
]

export const AppPreviewSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeScreenshot, setActiveScreenshot] = useState(0)

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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See PiSplit in
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of expense splitting with our interactive demo
            and comprehensive app preview.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* App Preview/Demo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 aspect-[3/4] flex flex-col items-center justify-center">
              {/* Demo Video Placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Play button overlay */}
                <button className="group relative z-10 bg-white/10 backdrop-blur-md rounded-full p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110">
                  <PlayIcon className="w-12 h-12 text-white group-hover:text-purple-300" />
                </button>

                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
                <motion.div
                  className="absolute top-4 left-4 w-8 h-8 bg-purple-400/30 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  className="absolute bottom-6 right-6 w-6 h-6 bg-pink-400/30 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 1,
                  }}
                />
              </div>

              {/* Device Frame */}
              <div className="absolute inset-4 border-2 border-white/10 rounded-2xl pointer-events-none"></div>
            </div>

            {/* Mobile indicator */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
              <DevicePhoneMobileIcon className="w-4 h-4 text-purple-300" />
              <span className="text-white text-sm font-medium">Mobile Optimized</span>
            </div>
          </motion.div>

          {/* Screenshots Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Key Features Preview
            </h3>

            <div className="space-y-4">
              {screenshots.map((screenshot, index) => (
                <motion.div
                  key={screenshot.title}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeScreenshot === index
                      ? 'bg-purple-500/20 border-purple-300/50'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setActiveScreenshot(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{screenshot.image}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {screenshot.title}
                      </h4>
                      <p className="text-purple-200">
                        {screenshot.description}
                      </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full transition-colors ${
                      activeScreenshot === index ? 'bg-purple-400' : 'bg-white/20'
                    }`}></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                Try Interactive Demo
              </button>
              <button className="flex-1 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                View All Features
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
