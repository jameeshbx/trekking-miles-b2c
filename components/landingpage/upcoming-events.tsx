"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock, Ticket, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface Event {
  id: number
  name: string
  image: string
  date: string
  duration: string
  location: string
  meetingPoint: string
  price: string
  description: string
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    name: "Day out program in Kumbalangi",
    image: "/images/kumba.png",
    date: "October 4, 2025",
    duration: "1 Day",
    location: "Kumbalangi, Kochi, Kerala",
    meetingPoint: "Kochi to Kochi",
    price: "From ₹2,500 per person",
    description: "Experience the serene backwaters and authentic village life of India's first model fishing village.",
  },
  {
    id: 2,
    name: "Goa Girls Only",
    image: "/images/goa.png",
    date: "October 17, 2025",
    duration: "2 Night 3 Days",
    location: "North Goa, South Goa",
    meetingPoint: "Madgaon to Madgaon",
    price: "From ₹5,999 per person",
    description: "An exclusive girls-only beach getaway with water sports and sunset parties in South Goa.",
  },
  {
    id: 3,
    name: "Kolukkumalai",
    image: "/images/koluku.png",
    date: "October 11, 2025",
    duration: "1 Night 2 Days",
    meetingPoint: "kochi to kochi",
    price: "From ₹3,600 per person",
    location: "Munnar, Kerala",
    description: "Girls only camping at Suryanelli,Munnar with Kolukkumalai sunrise trek.",
  },
]

export default function UpcomingEvents() {
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
      setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length)
    } else if (isTablet) {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(upcomingEvents.length / 2))
    }
  }

  const prevSlide = () => {
    if (isMobile) {
      setCurrentSlide((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length)
    } else if (isTablet) {
      setCurrentSlide((prev) => (prev - 1 + Math.ceil(upcomingEvents.length / 2)) % Math.ceil(upcomingEvents.length / 2))
    }
  }

  const getVisibleEvents = () => {
    if (!isMobile && !isTablet) {
      return upcomingEvents // Show all on desktop
    }
    
    if (isMobile) {
      return [upcomingEvents[currentSlide]] // Show one on mobile
    }
    
    // Tablet: show 2
    const startIndex = currentSlide * 2
    return upcomingEvents.slice(startIndex, startIndex + 2)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 text-black">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance text-white">
            Upcoming Events
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty text-white px-2 sm:px-0">
            Join our exciting events and workshops designed to enhance your travel experiences and knowledge.
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
                length: isMobile ? upcomingEvents.length : Math.ceil(upcomingEvents.length / 2) 
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

        {/* Events Grid/Carousel */}
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
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className={`${isMobile ? 'w-full' : 'w-1/2'} flex-shrink-0 px-2 sm:px-3`}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            getVisibleEvents().map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <EventCard event={event} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

function EventCard({ event }: { event: Event }) {
  return (
    <Card className="group overflow-hidden bg-white text-black hover:shadow-xl transition-all duration-300 border-border h-full">
      <div className="relative overflow-hidden text-black">
        <div
          className="w-full h-48 sm:h-56 md:h-64 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{
            backgroundImage: `url(${event.image || "/placeholder.svg"})`
          }}
        />
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 text-black px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg font-bold text-sm sm:text-base">
          {event.price.replace('From ', '')}
        </div>
      </div>

      <CardContent className="p-4 sm:p-6 bg-white text-black flex-1 flex flex-col">
        <div className="flex items-center space-x-2 mb-2 sm:mb-3">
          <Ticket className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
          <h3 className="text-lg sm:text-xl font-bold text-card-foreground line-clamp-2">{event.name}</h3>
        </div>

        <p className="text-sm text-muted-foreground mb-4 sm:mb-6 line-clamp-3">{event.description}</p>

        <div className="space-y-2 mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">{event.date}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">{event.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">{event.meetingPoint}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <Button 
          onClick={() => {
            const message = `Hi, I'm interested in booking ${event.name} on ${event.date}. Can you provide more details?`;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/919447046426?text=${encodedMessage}`, '_blank');
          }}
          className="w-full bg-orange-800 hover:bg-orange-800 text-white font-bold py-2 sm:py-3 text-sm sm:text-base"
        >
          Book now
        </Button>
      </CardContent>
    </Card>
  )
}