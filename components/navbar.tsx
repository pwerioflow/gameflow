"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Define the navigation items
const navItems = [
  { name: "Mission", href: "#mission" },
  { name: "Players", href: "#players" },
  { name: "Clubs", href: "#clubs" },
  { name: "Coaches", href: "#coaches" },
  { name: "Features", href: "#features" },
  { name: "Stories", href: "#stories" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll events to determine active section and navbar background
  useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled
      setScrolled(window.scrollY > 10)

      // Determine which section is currently in view
      const sections = navItems
        .map((item) => {
          const element = document.querySelector(item.href)
          if (element) {
            const rect = element.getBoundingClientRect()
            return {
              name: item.name,
              visible: rect.top <= 200 && rect.bottom >= 200,
              top: rect.top,
            }
          }
          return null
        })
        .filter(Boolean)

      // Find the section closest to the top of the viewport
      const visibleSection = sections.find((section) => section?.visible)
      const closestSection = sections.reduce((prev, current) => {
        if (!prev) return current
        if (!current) return prev
        return Math.abs(current.top) < Math.abs(prev.top) ? current : prev
      }, null)

      setActiveSection(visibleSection?.name || closestSection?.name || "")
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/90 backdrop-blur-sm shadow-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="font-audiowide text-2xl">
            <span className="text-white">Game</span>
            <span className="text-[#007BFF]">Flow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#007BFF]",
                  activeSection === item.name ? "text-[#007BFF]" : "text-white/80",
                )}
                onClick={handleLinkClick}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/10">
              Log In
            </Button>
            <Button size="sm" className="bg-[#007BFF] hover:bg-[#0056b3] text-white">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-base font-medium transition-colors py-2",
                    activeSection === item.name ? "text-[#007BFF]" : "text-white/80",
                  )}
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                <Button variant="outline" className="text-white border-white hover:bg-white/10 w-full">
                  Log In
                </Button>
                <Button className="bg-[#007BFF] hover:bg-[#0056b3] text-white w-full">Get Started</Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
