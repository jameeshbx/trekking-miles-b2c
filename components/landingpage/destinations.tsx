"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MapPin, Star, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import { useState } from "react"

const destinations = [
  {
    id: 1,
    name: "Thailand",
    image: "/thailand.png",
    description: "Explore ancient temples, pristine beaches, and vibrant culture in the Land of Smiles.",
    highlights: ["Bangkok Temples", "Phuket Beaches", "Chiang Mai Mountains"],
    rating: 4.9,
    price: "From ₹45,000",
  },
  {
    id: 2,
    name: "Goa",
    image: "/goa.png",
    description: "Relax on golden beaches, enjoy Portuguese architecture, and experience vibrant nightlife.",
    highlights: ["Beach Paradise", "Colonial Heritage", "Water Sports"],
    rating: 4.8,
    price: "From ₹25,000",
  },
  {
    id: 3,
    name: "Kerala",
    image: "/kerala.png",
    description: "Cruise through serene backwaters, explore spice plantations, and witness Ayurvedic traditions.",
    highlights: ["Backwater Cruises", "Spice Gardens", "Hill Stations"],
    rating: 4.9,
    price: "From ₹30,000",
  },
  {
    id: 4,
    name: "Vietnam",
    image: "/vietnam.png",
    description: "Discover stunning landscapes, rich history, and incredible street food culture.",
    highlights: ["Halong Bay", "Ho Chi Minh City", "Sapa Mountains"],
    rating: 4.7,
    price: "From ₹55,000",
  },
  {
    id: 5,
    name: "Bali",
    image: "/bali.png",
    description: "Experience spiritual temples, lush rice terraces, and world-class beaches.",
    highlights: ["Ubud Culture", "Beach Clubs", "Volcano Treks"],
    rating: 4.8,
    price: "From ₹50,000",
  },
  {
    id: 6,
    name: "Nepal",
    image: "/nepal.png",
    description: "Trek through the Himalayas, visit ancient monasteries, and witness breathtaking peaks.",
    highlights: ["Everest Base Camp", "Annapurna Circuit", "Kathmandu Valley"],
    rating: 4.9,
    price: "From ₹65,000",
  },
]

export default function DestinationsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1 // Mobile: 1 item
      if (window.innerWidth < 1024) return 2 // Tablet: 2 items
      return 3 // Desktop: 3 items
    }
    return 3
  }

  const [itemsPerSlide, setItemsPerSlide] = useState(3)

  const handleResize = () => {
    setItemsPerSlide(getItemsPerSlide())
  }

  useState(() => {
    if (typeof window !== "undefined") {
      setItemsPerSlide(getItemsPerSlide())
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  })

  const totalSlides = Math.ceil(destinations.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleCallbackRequest = () => {
    window.location.href = "tel:9447046426"
  }
  const handleWhatsAppMessage = (destinationName: string) => {
    const phoneNumber = "919447046426"; // Your WhatsApp number without the + sign
    const message = `Hi, I'm interested in the ${destinationName} package. Can you provide more details?`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }


  return (
    <section id="destinations" className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
            Popular Destinations
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto text-pretty">
            Discover our handpicked destinations across Asia, each offering unique experiences and unforgettable
            memories waiting to be made.
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-orange-600 scale-110" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              disabled={currentIndex === totalSlides - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                    {destinations
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((destination, index) => (
                        <motion.div
                          key={destination.id}
                          initial={{ y: 50, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="w-full"
                        >
                          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card shadow-lg text-white h-full">
                            <div className="relative overflow-hidden">
                              <img
                                src={
                                  destination.image || "/placeholder.svg?height=256&width=400&query=travel destination"
                                }
                                alt={destination.name}
                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-semibold text-white">{destination.rating}</span>
                              </div>
                              <div className="absolute bottom-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {destination.price}
                              </div>
                            </div>

                            <CardContent className="p-6 bg-white text-black flex-1 flex flex-col">
                              <div className="flex items-center space-x-2 mb-3">
                                <MapPin className="h-5 w-5 text-orange-600" />
                                <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                              </div>

                              <p className="text-gray-600 mb-4 text-pretty flex-1">{destination.description}</p>

                              <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Highlights:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {destination.highlights.map((highlight, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                                    >
                                      {highlight}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-2">
  <Button
    onClick={() => handleWhatsAppMessage(destination.name)}
    variant="outline"
    className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
  >
    <MessageCircle className="h-4 w-4 mr-2" />
    Send Message
  </Button>
  <Button
    onClick={handleCallbackRequest}
    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
  >
    <Phone className="h-4 w-4 mr-2" />
    Request Callback
  </Button>
</div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
         <p className="text-lg text-gray-300 mb-6">
  Can&apos;t find your dream destination? We create custom itineraries too!
</p>
          <Button
            size="lg"
            onClick={handleCallbackRequest}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4"
          >
            <Phone className="h-5 w-5 mr-2" />
            Plan Custom Trip
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
