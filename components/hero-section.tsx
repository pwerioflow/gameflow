"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Video background with overlay */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/videos/sports-montage.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
          GameFlow. <span className="block md:inline">Organize the game.</span>{" "}
          <span className="text-green-400">Unleash the emotion.</span>
        </h1>

        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          The digital platform that transforms how sports courts are managed, bringing people together through play.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => setVideoOpen(true)}
            variant="outline"
            size="lg"
            className="bg-transparent border-white text-white hover:bg-white/10 group"
          >
            <Play className="mr-2 h-4 w-4 group-hover:text-white" /> Watch the Video
          </Button>

          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
            Try GameFlow Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Video modal */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="about:blank"
              title="GameFlow Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
