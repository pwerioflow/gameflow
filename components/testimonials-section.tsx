"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "Now our club feels like a real hub. Everyone wants to play.",
    name: "João",
    role: "Beach Tennis Player",
    image: "/images/player-profile-1.png",
  },
  {
    id: 2,
    quote: "GameFlow transformed how we manage our tennis courts. Our members love the simplicity.",
    name: "Maria",
    role: "Tennis Club Manager",
    image: "/images/player-profile-2.png",
  },
  {
    id: 3,
    quote: "The digital queue feature eliminated all the arguments about who's next. Game changer!",
    name: "Carlos",
    role: "Soccer Field Owner",
    image: "/images/player-profile-3.png",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="w-full py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            What Our <span className="text-green-400">Community</span> Says
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/50 hover:bg-gray-800 p-2 rounded-full"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-12">
                  <div className="bg-gray-800/30 p-10 rounded-xl text-center">
                    <div className="mx-auto mb-6 bg-green-500/20 p-3 rounded-full w-fit">
                      <Quote className="h-6 w-6 text-green-400" />
                    </div>

                    <p className="text-xl md:text-2xl font-light italic mb-8">"{testimonial.quote}"</p>

                    <div className="flex items-center justify-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-white/70 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/50 hover:bg-gray-800 p-2 rounded-full"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-green-400" : "bg-gray-600"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
