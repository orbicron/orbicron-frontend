'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Digital Nomad',
    text: 'PiSplit revolutionized how our travel group splits expenses. The AI scanner is incredibly accurate!',
    piVerified: true,
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    name: 'Mike Rodriguez',
    role: 'College Student',
    text: 'Finally, no more awkward money conversations. Pi token settlements are instant and transparent.',
    piVerified: true,
    rating: 5,
    avatar: '👨‍🎓'
  },
  {
    name: 'Emma Thompson',
    role: 'Freelancer',
    text: 'The debt optimization feature saved our group from dozens of unnecessary transactions.',
    piVerified: false,
    rating: 5,
    avatar: '👩‍💻'
  },
]

const stats = [
  { label: 'Pi Users Trust Us', value: '10,000+' },
  { label: 'Expenses Split Daily', value: '50,000+' },
  { label: 'Pi Tokens Settled', value: '1M+' },
  { label: 'Customer Satisfaction', value: '99%' },
]

export const SocialProofSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-purple-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Pi Network Community
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of Pi users who trust PiSplit for fair and transparent expense splitting.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              className="relative p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-purple-300/30 transition-all duration-300 group"
            >
              {/* Testimonial Content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white text-lg mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-purple-300 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  
                  {testimonial.piVerified && (
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-semibold flex items-center gap-1">
                        π Verified
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
              <div className="text-green-400">🔒</div>
              <span className="text-white font-medium">Pi Network Verified</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
              <div className="text-blue-400">🛡️</div>
              <span className="text-white font-medium">Blockchain Secured</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
              <div className="text-purple-400">⚡</div>
              <span className="text-white font-medium">Instant Settlements</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
