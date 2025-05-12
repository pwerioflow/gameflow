import HeroSection from "@/components/hero-section"
import MissionSection from "@/components/mission-section"
import PlayerExperienceSection from "@/components/player-experience-section"
import ClubBenefitsSection from "@/components/club-benefits-section"
import CoachesSection from "@/components/coaches-section"
import TestimonialsSection from "@/components/testimonials-section"
import FinalCTASection from "@/components/final-cta-section"
import Footer from "@/components/footer"
import PhotoGallery from "@/components/photo-gallery"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-20">
      <HeroSection />
      <MissionSection />
      <PlayerExperienceSection />
      <ClubBenefitsSection />
      <CoachesSection />
      <PhotoGallery />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
