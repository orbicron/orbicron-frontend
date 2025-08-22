'use client'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesShowcase } from '@/components/landing/FeaturesShowcase'
import { SocialProofSection } from '@/components/landing/SocialProofSection'
import { AppPreviewSection } from '@/components/landing/AppPreviewSection'
import { FooterSection } from '@/components/landing/FooterSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HeroSection />
      <FeaturesShowcase />
      <SocialProofSection />
      <AppPreviewSection />
      <FooterSection />
    </main>
  )
}
