import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import HowItWorks from "@/components/how-it-works"
import ServicesOverview from "@/components/services-overview"
import Testimonials from "@/components/testimonials"
import TrustSection from "@/components/trust-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import EmergencyBanner from "@/components/emergency-banner"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <EmergencyBanner />
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <ServicesOverview />
        <Testimonials />
        <TrustSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  )
}
