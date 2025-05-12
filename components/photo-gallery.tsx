"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const galleryImages = [
  {
    src: "/images/tennis-court.png",
    alt: "Tennis court with players",
    caption: "Professional tennis facilities",
  },
  {
    src: "/images/beach-tennis.png",
    alt: "Beach tennis players",
    caption: "Beach tennis tournaments",
  },
  {
    src: "/images/soccer-field.png",
    alt: "Soccer field",
    caption: "Soccer fields managed with GameFlow",
  },
  {
    src: "/images/squash-court.png",
    alt: "Squash court",
    caption: "Modern squash facilities",
  },
]

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section className="w-full py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Experience <span className="text-green-400">GameFlow</span> in Action
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-white/80 mb-4">
              GameFlow transforms how your members interact with your facilities. From seamless check-ins to automated
              court management, we handle the logistics so you can focus on creating memorable experiences.
            </p>
            <p className="text-lg text-white/80">
              Our platform adapts to your unique club rules and preferences, ensuring a perfect fit for your operation
              while providing the data insights you need to grow and improve.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative h-64 overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black border-0">
          {selectedImage !== null && (
            <div className="relative aspect-video">
              <Image
                src={galleryImages[selectedImage].src || "/placeholder.svg"}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium">{galleryImages[selectedImage].caption}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
