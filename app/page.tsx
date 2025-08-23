'use client'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesShowcase } from '@/components/landing/FeaturesShowcase'
import { SocialProofSection } from '@/components/landing/SocialProofSection'
import { AppPreviewSection } from '@/components/landing/AppPreviewSection'
import { FooterSection } from '@/components/landing/FooterSection'
import { usePiSDK } from '@/hooks/usePiSDK'

export default function Home() {
  const {piSDK} =usePiSDK();
  console.log("this is the pi sdk message in page",piSDK)
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
