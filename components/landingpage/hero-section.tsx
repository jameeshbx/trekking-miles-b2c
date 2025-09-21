"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Users, Award } from "lucide-react"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const backgroundImages = [
    "/hero.png",
    "/Adventure.jpg",
    "/beach.webp",
    "/honeymoon.webp",
    "/paragliding.avif",
    "/white.jpg",
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setNextImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
      
      const timer = setTimeout(() => {
        setCurrentImageIndex(nextImageIndex)
        setIsTransitioning(false)
      }, 1000)
      
      return () => clearTimeout(timer)
    }, 4000)

    return () => clearInterval(interval)
  }, [nextImageIndex, backgroundImages.length])

  const handleCallClick = () => {
    window.location.href = "tel:9447046426"
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        {/* Current Image */}
        <motion.div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isTransitioning ? 0 : 1,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        
        {/* Next Image */}
        <motion.div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundImages[nextImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isTransitioning ? 1 : 0,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-balance leading-tight"
          >
            Explore the World&apos;s
            <span className="text-primary block">Hidden Gems</span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto text-pretty px-2 sm:px-0"
          >
            Discover breathtaking destinations across Asia with expert guides, personalized itineraries, and
            unforgettable adventures that last a lifetime.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-2 sm:px-0"
          >
            <Button
              size="lg"
              onClick={handleCallClick}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold group"
            >
              Start Your Adventure
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white text-white bg-secondary hover:bg-secondary/90 hover:text-secondary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
            >
              View Destinations
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-2 sm:px-0"
          >
            <div className="flex flex-col items-center">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-1 sm:mb-2" />
              <div className="text-lg sm:text-xl md:text-2xl font-bold">10,000+</div>
              <div className="text-xs sm:text-sm md:text-base text-white/80 text-center">Happy Travelers</div>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-1 sm:mb-2" />
              <div className="text-lg sm:text-xl md:text-2xl font-bold">50+</div>
              <div className="text-xs sm:text-sm md:text-base text-white/80 text-center">Destinations</div>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-1 sm:mb-2" />
              <div className="text-lg sm:text-xl md:text-2xl font-bold">5+</div>
              <div className="text-xs sm:text-sm md:text-base text-white/80 text-center">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1 sm:mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}