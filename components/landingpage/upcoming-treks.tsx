"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Users, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface Trek {
  id: number
  name: string
  image: string
  date: string
  duration: string
  distance: string
  price: string
  meetingPoint: string
  description: string
}

const upcomingTreks: Trek[] = [
  {
    id: 1,
    name: "Gaumukh Tapovan Trek",
    image: "/images/i1.png",
    date: "October 15, 2025",
    duration: "7 Nights 8 Days",
    distance: "40 km",
    price: "₹16,200",
    meetingPoint: "Dehradun to Dehradun",
    description: "Trek to the Gaumukh Glacier and Tapovan meadow, the source of the River Ganges.",
  },
  {
    id: 2,
    name: "Annapurna Base Camp Trek",
    image: "/images/i2.png",
    date: "October 10, 2025",
    duration: "8 Nights 9 Days ",
    distance: "70 km",
    price: "₹30,000",
    meetingPoint: "Pokhara to Pokhara",
    description: "Breathtaking mountain views, cultural immersion, and the rewarding experience."
  },
  {
    id: 3,
    name: "Bali Pass Trek",
    image: "/images/i3.png",
    date: "October 18, 2025",
    duration: "7 Nights 8 Days",
    distance: "56 km",
    price: "₹21,500",
    meetingPoint: "Dehradun to Dehradun",
    description: "Chasing high altitudes and epic views in the Himalayas.",
  },
]

export default function UpcomingTreks() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  const nextSlide = () => {
    if (isMobile) {
      setCurrentSlide((prev) => (prev + 1) % upcomingTreks.length)
    } else if (isTablet) {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(upcomingTreks.length / 2))
    }
  }

  const prevSlide = () => {
    if (isMobile) {
      setCurrentSlide((prev) => (prev - 1 + upcomingTreks.length) % upcomingTreks.length)
    } else if (isTablet) {
      setCurrentSlide((prev) => (prev - 1 + Math.ceil(upcomingTreks.length / 2)) % Math.ceil(upcomingTreks.length / 2))
    }
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance text-white">
            Treks & Campings
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty text-white px-2 sm:px-0">
            Join our expertly guided treks to some of the most spectacular mountain destinations in the world.
          </p>
        </motion.div>

        {/* Mobile & Tablet Carousel Controls */}
        {(isMobile || isTablet) && (
          <div className="flex justify-center items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex gap-2">
              {Array.from({ 
                length: isMobile ? upcomingTreks.length : Math.ceil(upcomingTreks.length / 2) 
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Treks Grid/Carousel */}
        <div className={`
          ${isMobile || isTablet ? 'overflow-hidden' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'}
        `}>
          {(isMobile || isTablet) ? (
            <motion.div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (isMobile ? 100 : 50)}%)`
              }}
            >
              {upcomingTreks.map((trek, index) => (
                <motion.div
                  key={trek.id}
                  className={`${isMobile ? 'w-full' : 'w-1/2'} flex-shrink-0 px-2 sm:px-3`}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TrekCard trek={trek} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            upcomingTreks.map((trek, index) => (
              <motion.div
                key={trek.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TrekCard trek={trek} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

function TrekCard({ trek }: { trek: Trek }) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border bg-white text-black h-full">
      <div className="relative overflow-hidden">
        <div
          className="w-full h-48 sm:h-56 md:h-64 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{
            backgroundImage: `url(${trek.image || "/placeholder.svg"})`
          }}
        />
      </div>

      <CardContent className="p-4 sm:p-6 bg-card text-card-foreground flex-1 flex flex-col">
        <div className="flex items-center space-x-2 mb-2 sm:mb-3">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
          <h3 className="text-lg sm:text-xl font-bold text-card-foreground line-clamp-2">{trek.name}</h3>
        </div>

        <p className="text-muted-foreground mb-3 sm:mb-4 text-pretty flex-1 text-sm sm:text-base line-clamp-3">{trek.description}</p>

        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">{trek.date}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">{trek.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">{trek.distance}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">{trek.meetingPoint}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto gap-3 sm:gap-4">
          <span className="text-xl sm:text-2xl font-bold text-orange-500">{trek.price}</span>
          <Button 
            className="w-full sm:w-auto bg-orange-800 hover:bg-orange-800 text-white py-2 sm:py-3 text-sm sm:text-base"
            onClick={() => {
              const message = `Hi, I'm interested in the ${trek.name} (${trek.duration}) starting on ${trek.date}. Can you share more details?`;
              window.open(`https://api.whatsapp.com/send?phone=919447046426&text=${encodeURIComponent(message)}`, '_blank');
            }}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}