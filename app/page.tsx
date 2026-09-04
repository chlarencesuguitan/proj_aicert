import type { Metadata } from 'next'
import { getFeaturedCourses } from '@/lib/courses/queries'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { BenefitsSection } from '@/components/landing/BenefitsSection'
import { CertificationProcessSection } from '@/components/landing/CertificationProcessSection'
import { FaqSection } from '@/components/landing/FaqSection'
import { FeaturedCertifications } from '@/components/landing/FeaturedCertifications'
import { FinalCtaSection } from '@/components/landing/FinalCtaSection'
import { HeroSection } from '@/components/landing/HeroSection'
import { OneOnOneSection } from '@/components/landing/OneOnOneSection'
import { SelfPacedSection } from '@/components/landing/SelfPacedSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { TrainersSection } from '@/components/landing/TrainersSection'

export const metadata: Metadata = {
  title: {
    absolute: 'AQBAT AI Certification | Learn, Grow, Get Certified',
  },
  description:
    'Build job-ready AI skills with AQBAT certification programs. Explore self-paced and 1-on-1 AI training designed for professionals, creators, and teams.',
  openGraph: {
    title: 'AQBAT AI Certification',
    description:
      'Professional AI education and certification programs for learners at every stage.',
    type: 'website',
  },
}

export default async function HomePage() {
  const { data: featuredCourses, error } = await getFeaturedCourses(3)

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCertifications courses={featuredCourses} error={error} />
        <SelfPacedSection />
        <OneOnOneSection />
        <BenefitsSection />
        <CertificationProcessSection />
        <TrainersSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}
