"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { BarChart3, Calendar, Settings } from "lucide-react"

export default function ClubBenefitsSection() {
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
    <section id="clubs" ref={sectionRef} className="w-full py-24 bg-gray-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Left content - scrolls normally */}
          <div className="md:w-1/2 z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              For <span className="text-gradient">Clubs</span> & Managers
            </h2>

            <p className="text-xl mb-8 text-white/80">Turn your sports spaces into unforgettable experiences.</p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-gradient-to-r from-[#027CFF] to-[#89F94F]/50 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Smart Court Management</h3>
                  <p className="text-white/70">
                    Automate bookings, manage schedules, and optimize court usage with real-time data.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-gradient-to-r from-[#027CFF] to-[#89F94F]/50 p-2 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Insightful Analytics</h3>
                  <p className="text-white/70">
                    Understand usage patterns, peak hours, and member preferences to make data-driven decisions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-gradient-to-r from-[#027CFF] to-[#89F94F]/50 p-2 rounded-lg">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Rule Automation</h3>
                  <p className="text-white/70">
                    Set custom rules for bookings, time limits, and court rotation that run automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right image - fixed during scroll with parallax effect */}
          <div className="md:w-1/2 relative hidden md:block">
            <div
              className="sticky top-24"
              style={{
                transform: `translateY(${parallaxOffset}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <div className="relative h-[600px] w-full rounded-xl overflow-hidden">
                <Image
                  src="/images/club-manager.png"
                  alt="Club manager using GameFlow on tablet"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Mobile image (shown only on mobile) */}
          <div className="md:hidden w-full">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
              <Image
                src="/images/club-manager.png"
                alt="Club manager using GameFlow on tablet"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
