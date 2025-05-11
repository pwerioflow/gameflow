import Image from "next/image"
import { BarChart3, Calendar, Settings } from "lucide-react"

export default function ClubBenefitsSection() {
  return (
    <section className="w-full py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              For <span className="text-green-400">Clubs</span> & Managers
            </h2>

            <p className="text-xl mb-8 text-white/80">Turn your sports spaces into unforgettable experiences.</p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-500/20 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Smart Court Management</h3>
                  <p className="text-white/70">
                    Automate bookings, manage schedules, and optimize court usage with real-time data.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-500/20 p-2 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Insightful Analytics</h3>
                  <p className="text-white/70">
                    Understand usage patterns, peak hours, and member preferences to make data-driven decisions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-500/20 p-2 rounded-lg">
                  <Settings className="h-6 w-6 text-green-400" />
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

          <div className="md:w-1/2 relative">
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
              <Image
                src="/images/club-manager.png"
                alt="Club manager using GameFlow on tablet"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
