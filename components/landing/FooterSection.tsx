'use client'
import { motion } from 'framer-motion'

export const FooterSection = () => {
  return (
    <footer className="py-16 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo and tagline */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">PiSplit</h3>
            <p className="text-purple-300 text-lg">
              Splitting expenses smarter with Pi Network
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Support
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Pi Network
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            <p>© 2025 PiSplit. Built with ❤️ for the Pi Network community.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
