"use client"

import { useState, useEffect } from "react"
import BikeShowcase from "@/components/bike-showcase"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <header className="relative z-10 pt-6 px-8">
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="max-w-7xl mx-auto w-full px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-[#8BAF56]">SUZUKI</span> SPORT BIKES
          </h1>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Experience the perfect blend of power, performance, and precision with Suzuki's legendary sport bikes.
          </p>
          {mounted && <BikeShowcase />}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-8 border-t border-[#2F4F2F]/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">© 2025 Suzuki Motor Corporation. ILLUSTRATIVE LANDING PAGE ONLY. Developed: Bianca Alves.</p>
          <div className="flex space-x-4">
            <div className="w-8 h-8 rounded-full bg-[#2F4F2F] flex items-center justify-center hover:bg-[#4A6522] transition-colors cursor-pointer">
              <span className="text-xs">FB</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#2F4F2F] flex items-center justify-center hover:bg-[#4A6522] transition-colors cursor-pointer">
              <span className="text-xs">IG</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#2F4F2F] flex items-center justify-center hover:bg-[#4A6522] transition-colors cursor-pointer">
              <span className="text-xs">YT</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

