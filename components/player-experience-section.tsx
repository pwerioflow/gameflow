"use client"

import { useEffect, useRef, useState } from "react"
import { QrCode, Trophy, Users, Heart } from "lucide-react"

// Define the card data
const experienceCards = [
  {
    id: "checkin",
    title: "Effortless Check-In",
    description: "Scan, tap, and play - no paperwork needed.",
    icon: QrCode,
    video: "/videos/checkin.mp4",
    poster: "/images/checkin-poster.png",
  },
  {
    id: "scoreboard",
    title: "Live Scoreboard",
    description: "Track matches and share your victories.",
    icon: Trophy,
    video: "/videos/scoreboard.mp4",
    poster: "/images/scoreboard-poster.png",
  },
  {
    id: "queue",
    title: "Digital Queue",
    description: "Get notified when it's your turn to play.",
    icon: Users,
    video: "/videos/queue.mp4",
    poster: "/images/queue-poster.png",
  },
  {
    id: "community",
    title: "Player Community",
    description: "Connect with players and join local events.",
    icon: Heart,
    video: "/videos/arena.mp4",
    poster: "/images/community-poster.png",
  },
]

export default function PlayerExperienceSection() {
  // Create refs for each video element
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  // Track which cards are currently being hovered
  const [hoveredCards, setHoveredCards] = useState<{ [key: string]: boolean }>({})

  // Track if play is in progress to prevent interruptions
  const playInProgress = useRef<{ [key: string]: boolean }>({})

  // Handle mouse enter event to play video
  const handleMouseEnter = (id: string) => {
    setHoveredCards((prev) => ({ ...prev, [id]: true }))

    const video = videoRefs.current[id]
    if (video && !playInProgress.current[id]) {
      // Mark that play is in progress
      playInProgress.current[id] = true

      // Only play if video is paused
      if (video.paused) {
        video
          .play()
          .then(() => {
            // Play completed successfully
            playInProgress.current[id] = false
          })
          .catch((error) => {
            // Handle errors other than AbortError (which is expected when play is interrupted)
            if (error.name !== "AbortError") {
              console.error("Error playing video:", error)
            }
            playInProgress.current[id] = false
          })
      } else {
        playInProgress.current[id] = false
      }
    }
  }

  // Handle mouse leave event to pause video
  const handleMouseLeave = (id: string) => {
    setHoveredCards((prev) => ({ ...prev, [id]: false }))

    // Use setTimeout to add a small delay before pausing
    // This helps prevent rapid play/pause cycles
    setTimeout(() => {
      const video = videoRefs.current[id]
      // Only pause if the card is not being hovered
      if (video && !hoveredCards[id]) {
        video.pause()
      }
    }, 50)
  }

  // Initialize video refs and cleanup
  useEffect(() => {
    // Initialize playInProgress for all cards
    experienceCards.forEach((card) => {
      playInProgress.current[card.id] = false
    })

    // Cleanup function
    return () => {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          video.pause()
          video.src = ""
          video.load()
        }
      })
    }
  }, [])

  return (
    <section id="players" className="w-full py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The <span className="text-gradient">Player</span> Experience
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Arrive. Scan. Play. No paper. No confusion.</p>
        </div>

        {/* Card container with horizontal scroll */}
        <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth">
          {experienceCards.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 w-full md:w-[24%] snap-start relative overflow-hidden rounded-2xl shadow-md h-80 group cursor-pointer"
              onMouseEnter={() => handleMouseEnter(card.id)}
              onMouseLeave={() => handleMouseLeave(card.id)}
              onTouchStart={() => handleMouseEnter(card.id)} // For mobile devices
            >
              {/* Static poster image (visible before hover) */}
              <div
                className={`absolute inset-0 z-10 transition-opacity duration-500 ${
                  hoveredCards[card.id] ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${card.poster})` }}>
                  <div className="absolute inset-0 bg-black/60"></div>
                </div>
              </div>

              {/* Video (plays on hover) */}
              <video
                ref={(el) => (videoRefs.current[card.id] = el)}
                className={`absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 ${
                  hoveredCards[card.id] ? "scale-105" : "scale-100"
                }`}
                muted
                loop
                playsInline
                preload="none"
                poster={card.poster}
              >
                <source src={card.video} type="video/mp4" />
              </video>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20"></div>

              {/* Content */}
              <div className="absolute inset-0 z-30 p-8 flex flex-col justify-between">
                <div className="w-16 h-16 bg-gradient-to-r from-[#027CFF] to-[#89F94F]/50 rounded-full flex items-center justify-center mb-4">
                  <card.icon className="h-8 w-8 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{card.title}</h3>

                  {/* Description (only visible on hover) */}
                  <p
                    className={`text-white/90 transform transition-all duration-300 ${
                      hoveredCards[card.id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl font-light italic text-gradient">
            Track your spot. Share your wins. Join the community.
          </p>
        </div>
      </div>
    </section>
  )
}
