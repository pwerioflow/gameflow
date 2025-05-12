"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Clock, Award, LucideActivity } from "lucide-react"

export default function CoachesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [sectionTop, setSectionTop] = useState(0)
  const [sectionHeight, setSectionHeight] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  // Initialize and handle scroll events
  useEffect(() => {
    const handleResize = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setSectionTop(rect.top + window.scrollY)
        setSectionHeight(rect.height)
        setWindowHeight(window.innerHeight)
      }
    }

    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    // Initial setup
    handleResize()
    handleScroll()

    // Add event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Calculate parallax effect
  const isInView = scrollPosition + windowHeight > sectionTop && scrollPosition < sectionTop + sectionHeight
  const parallaxOffset = isInView ? (scrollPosition - sectionTop) * 0.4 : 0

  return (
    <section id="coaches" ref={sectionRef} className="w-full py-24 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Left image - fixed during scroll with parallax effect */}
          <div className="md:w-1/2 relative hidden md:block order-2 md:order-1">
            <div
              className="sticky top-24"
              style={{
                transform: `translateY(${parallaxOffset}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <div className="relative h-[600px] w-full rounded-xl overflow-hidden">
                <Image
                  src="/images/coach.png"
                  alt="Coach training players on court"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Mobile image (shown only on mobile) */}
          <div className="md:hidden w-full order-1">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
              <Image
                src="/images/coach.png"
                alt="Coach training players on court"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
          </div>

          {/* Right content - scrolls normally */}
          <div className="md:w-1/2 z-10 order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              For <span className="text-green-400">Coaches</span>
            </h2>

            <p className="text-xl mb-8 text-white/80">Elevate your training sessions and player development.</p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-500/20 p-2 rounded-lg">
                  <Clock className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Efficient Scheduling</h3>
                  <p className="text-white/70">
                    Manage your coaching sessions and player bookings in one central platform.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-500/20 p-2 rounded-lg">
                  <LucideActivity className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Performance Tracking</h3>
                  <p className="text-white/70">
                    Monitor player progress and performance with detailed statistics and insights.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-500/20 p-2 rounded-lg">
                  <Award className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Training Programs</h3>
                  <p className="text-white/70">
                    Create and manage custom training programs tailored to individual player needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
