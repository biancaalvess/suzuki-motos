"use client"

import React, { useState, useEffect } from "react"
import { ChevronRight, ChevronLeft, Gauge, Zap, Weight, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Bike data
const bikeData = [
  {
    id: 1,
    name: "GSX-R1000R",
    bgColor: "#3A5311", // Dark moss green
    image: "https://i.pinimg.com/736x/31/69/22/316922b528af905ebd0c064c4182682c.jpg",
    description:
      "The Suzuki GSX-R1000R is the flagship superbike that represents Suzuki's commitment to performance. With advanced electronics and race-derived technology, it delivers exceptional power and handling.",
    specs: {
      engine: "999.8cc, 4-cylinder",
      power: "202 HP",
      weight: "203 kg",
      topSpeed: "299 km/h",
    },
  },
  {
    id: 2,
    name: "Hayabusa",
    bgColor: "#4A6522", // Moss green
    image: "https://i.pinimg.com/736x/aa/75/84/aa7584ab5d9de725d1c2718ef88176a8.jpg",
    description:
      "The legendary Suzuki Hayabusa combines breathtaking acceleration with smooth handling. Known for its distinctive aerodynamic styling and powerful engine, it's an icon in the motorcycle world.",
    specs: {
      engine: "1340cc, 4-cylinder",
      power: "188 HP",
      weight: "264 kg",
      topSpeed: "299 km/h",
    },
  },
  {
    id: 3,
    name: "GSX-S750",
    bgColor: "#2F4F2F", // Dark green
    image: "https://i.pinimg.com/736x/15/a4/3a/15a43a836bd37f201da5457e123cc798.jpg",
    description:
      "The Suzuki GSX-S750 offers the perfect balance between the agility of a 600cc and the power of a 1000cc. It delivers an exceptional power-to-weight ratio for both street and track riding.",
    specs: {
      engine: "749cc, 4-cylinder",
      power: "114 HP",
      weight: "213 kg",
      topSpeed: "225 km/h",
    },    
  },
]

export default function BikeShowcase() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right, 0 for initial

  const next = () => {
    if (activeSlide < bikeData.length - 1) {
      setDirection(1)
      setActiveSlide(activeSlide + 1)
    }
  }

  const prev = () => {
    if (activeSlide > 0) {
      setDirection(-1)
      setActiveSlide(activeSlide - 1)
    }
  }

  const getStyles = (index: number) => {
    if (activeSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      }
    else if (activeSlide - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      }
    else if (activeSlide + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      }
    else if (activeSlide - 2 === index)
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      }
    else if (activeSlide + 2 === index)
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8,
      }
    else if (index < activeSlide - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7,
      }
    else if (index > activeSlide + 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7,
      }
  }

  // Trigger particle effect on slide change
  useEffect(() => {
    const event = new CustomEvent("slideChange", { detail: { direction } })
    window.dispatchEvent(event)
  }, [direction])

  return (
    <div className="w-full flex flex-col items-center">
      {/* carousel */}
      <div className="relative perspective-[1000px] transform-style-[preserve-3d] w-[362px] h-[450px] mx-auto">
        {bikeData.map((bike, i) => (
          <React.Fragment key={bike.id}>
            <motion.div
              className="w-[362px] h-[450px] transition-all duration-500 absolute top-0 rounded-xl border border-[#8BAF56]/20"
              style={{
                background: `linear-gradient(135deg, ${bike.bgColor}, #121212)`,
                boxShadow: activeSlide === i ? `0 0 30px ${bike.bgColor}70` : `0 5px 20px ${bike.bgColor}30`,
                ...getStyles(i),
              }}
              animate={{
                filter: activeSlide === i ? "brightness(1.2)" : "brightness(1)",
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col text-white p-6 h-full relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10 z-0">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id={`grid-${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#grid-${i})`} />
                  </svg>
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2 text-center">{bike.name}</h2>
                  <div className="text-center mb-4 relative">
                    <img
                      src={bike.image || "/placeholder.svg"}
                      alt={bike.name}
                      className="mx-auto h-[180px] object-contain"
                    />
                    {activeSlide === i && (
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-gradient-to-t from-[#8BAF56]/50 to-transparent blur-md" />
                    )}
                  </div>
                  <p className="text-sm mb-4">{bike.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs mt-auto">
                    <div className="flex items-center gap-1 bg-black/30 p-2 rounded">
                      <Zap size={16} className="text-[#8BAF56]" />
                      <span>{bike.specs.engine}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/30 p-2 rounded">
                      <Gauge size={16} className="text-[#8BAF56]" />
                      <span>{bike.specs.power}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/30 p-2 rounded">
                      <Weight size={16} className="text-[#8BAF56]" />
                      <span>{bike.specs.weight}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/30 p-2 rounded">
                      <Clock size={16} className="text-[#8BAF56]" />
                      <span>{bike.specs.topSpeed}</span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {activeSlide === i && (
                      <motion.div
                        className="flex space-x-4 mt-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <button className="px-6 py-2 bg-[#3A5311] hover:bg-[#4A6522] rounded-full transition-colors text-sm">
                          Learn More
                        </button>
                        <button className="px-6 py-2 border border-[#8BAF56] rounded-full hover:bg-[#8BAF56]/20 transition-colors text-sm">
                          Select
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="absolute w-full h-[60px] -bottom-[60px] rounded-xl"
              style={{
                background: `linear-gradient(to bottom, ${bike.bgColor}40, transparent)`,
                ...getStyles(i),
              }}
              animate={{
                opacity: activeSlide === i ? 0.8 : 0.4,
              }}
            />
          </React.Fragment>
        ))}
      </div>
      {/* carousel */}

      <div className="flex justify-center mt-24 gap-8">
        <motion.button
          className="w-12 h-12 bg-[#2F4F2F] rounded-full flex items-center justify-center hover:bg-[#4A6522] transition-colors"
          onClick={prev}
          disabled={activeSlide === 0}
          whileTap={{ scale: 0.9 }}
          whileHover={{
            boxShadow: "0 0 15px rgba(139, 175, 86, 0.5)",
            scale: 1.05,
          }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          className="w-12 h-12 bg-[#2F4F2F] rounded-full flex items-center justify-center hover:bg-[#4A6522] transition-colors"
          onClick={next}
          disabled={activeSlide === bikeData.length - 1}
          whileTap={{ scale: 0.9 }}
          whileHover={{
            boxShadow: "0 0 15px rgba(139, 175, 86, 0.5)",
            scale: 1.05,
          }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {bikeData.map((_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full ${activeSlide === i ? "bg-[#8BAF56]" : "bg-gray-600"}`}
            animate={{
              scale: activeSlide === i ? 1.5 : 1,
              backgroundColor: activeSlide === i ? "#8BAF56" : "#4B5563",
            }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setDirection(i > activeSlide ? 1 : -1)
              setActiveSlide(i)
            }}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  )
}

