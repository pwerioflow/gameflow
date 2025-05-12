import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function FinalCTASection() {
  return (
    <section id="contact" className="w-full py-24 bg-gradient-to-b from-gray-900 to-black text-white relative">
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <Image src="/images/squash-court.png" alt="Squash court" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>
      </div>
      <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to enter the <span className="text-gradient">Flow</span>?
        </h2>

        <p className="text-xl text-white/80 mb-10">
          Join the community of clubs and players transforming the sports experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
            <a href="https://cal.com/gameflow.tech/30min" target="_blank" rel="noopener noreferrer">
              Book a Demo
            </a>
          </Button>

          <Button variant="gradient" size="lg" className="w-full sm:w-auto">
            Start for Free at Your Club <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
