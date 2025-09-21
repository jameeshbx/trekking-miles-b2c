"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Abhilash Parayil",
    location: "Kochi, India",
    image: "/images/abhilash.png",
    rating: 5,
    text: "Five stars aren't enough for their service, so I added a few more! Jokes apart, I had a wonderful experience with Trekking Miles during my trek to Agasthyarkoodam. Their support began 14 days before the trek, helping me with preparation workouts that proved invaluable on the trail.",
    trip: "Kerala - Agasthyarkoodam Trek"
  },
  {
    id: 2,
    name: "Abhishek ghani",
    location: "Mumbai, India",
    image: "/images/abhishek.png",
    rating: 5,
    text: "I had an absolutely fantastic experience on this tour! Everything was perfectly organized from start to finish. The guide was knowledgeable, friendly, and made the trip both fun and informative. The sights were breathtaking, and I really appreciated the little details that made the experience feel personalized.",
    trip: "Himachal - Spiti Valley Expedition"
  },
  {
    id: 3,
    name: "Saneesh Kumar",
    location: "Delhi, India",
    image: "/images/saneesh kumar.png",
    rating: 5,
    text: "Thank you to the team Trekkingmiles for organizing a fantastic Dubai trip! Everything was smooth, from the itinerary to the on-ground support. Truly appreciate your attention to detail—will recommend your services to others.",
    trip: "Dubai - Ultimate Experience"
  },
  {
    id: 4,
    name: "Praveesh Kumar",
    location: "Hyderabad, India",
    image: "/images/praveesh.png",
    rating: 5,
    text: "Wonderful Experience…Can expect well-planned arrangements for trekking, ensuring a safe and enjoyable experience. Good work Team…Hope to see all of you very soon.🫡❤️",
    trip: "Uttarakhand - Valley of Flowers"
  },
  {
    id: 5,
    name: "Sruthy Mohan",
    location: "Bangalore, India",
    image: "/images/swapna.png",
    rating: 5,
    text: "Trekkingmiles exceeded all expectations as a travel partner. Their team was experienced, polite, and attentive from start to finish. The entire trip was well organized. I strongly recommend Trekkingmiles 💯",
    trip: "Ladakh - Chadar Trek"
  },
  {
    id: 6,
    name: "Meera Joshi",
    location: "Pune, India",
    image: "/images/swapna.png",
    rating: 5,
    text: "Had a great experience with trekking miles. The team was helpful, well-organized, and made the whole trip smooth and enjoyable. Highly recommended for anyone planning stress-free travel.",
    trip: "Sikkim - Goecha La Trek"
  },
  {
    id: 7,
    name: "Shamila",
    location: "Calicut, Kerala",
    image: "/images/shamila.png",
    rating: 5,
    text: "A big thanks to Trekking miles for making my Dubai trip so smooth and memorable. Your service was really excellent. I had the chance to explore the places what I wish,  Burj Khalifa, Desert Safari, and the colorful Miracle Garden.",
    trip: "Dubai - Premium Package"
  },
  {
    id: 8,
    name: "Arsha Es",
    location: "Trivandrum, Kerala",
    image: "/images/arsha.png",
    rating: 5,
    text: "We had a wonderful family trip to Dubai, and Trekkingmiles did a great job organizing everything. The planning was smooth, the arrangements were reliable, and the trip was hassle-free. Thanks to the team for making our vacation so enjoyable and memorable!",
    trip: "Dubai - Family Holiday"
  },
  {
    id: 9,
    name: "Divya Velloli",
    location: "Mysore, India",
    image: "/images/divya.png",
    rating: 5,
    text: "The experience with Trekking Miles was a great one!! From the time of booking till the trip ended, the friendly & courteous approach by the whole Team just made memories in our hearts. Thank you for the lovely trip.",
    trip: "Kerala - Backwaters & Beaches"
  },
  {
    id: 10,
    name: "Krishna Murali",
    location: "Kannur, Kerala",
    image: "/images/krishna.png",
    rating: 5,
    text: "Had a wonderful experience with Trekking Miles Adventure – well-organized, safe, and memorable. The team was professional, friendly, and made the trek truly enjoyable!",
    trip: "Himachal - Hampta Pass Trek"
  },
  {
    id: 11,
    name: "Sreejith MM",
    location: "Muscat, Oman",
    image: "/images/sreejith.png",
    rating: 5,
    text: "Had an incredible time with Trekkingmile Adventures! Everything was well organized, the team was professional, and the guides were super friendly. Truly an unforgettable experience!",
    trip: "Uttarakhand - Kedarkantha Trek"
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [screenSize, setScreenSize] = useState('desktop')

  // Responsive items per page
  const getItemsPerPage = () => {
    if (screenSize === 'mobile') return 1
    if (screenSize === 'tablet') return 2
    return 3 // desktop
  }

  const itemsPerPage = getItemsPerPage()

  // Handle screen size detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setScreenSize('mobile')
      } else if (width < 1024) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    // Initial check
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Reset current index when screen size changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [screenSize])

  const nextSlide = () => {
    const maxIndex = testimonials.length - itemsPerPage
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    const maxIndex = testimonials.length - itemsPerPage
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const totalSlides = Math.max(1, testimonials.length - itemsPerPage + 1)
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < testimonials.length - itemsPerPage

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto px-4">
            Don&apos;t just take our word for it. Here&apos;s what our happy travelers have to say about their incredible journeys with TrekkingMiles.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Arrows - Hidden on mobile, visible on tablet+ */}
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 z-10 bg-white rounded-full p-2 lg:p-3 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 lg:h-6 lg:w-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 z-10 bg-white rounded-full p-2 lg:p-3 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4 lg:h-6 lg:w-6 text-gray-600" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: (index % itemsPerPage) * 0.1 }}
                  viewport={{ once: true }}
                  className={`${
                    screenSize === 'mobile' 
                      ? 'w-full' 
                      : screenSize === 'tablet' 
                        ? 'w-1/2' 
                        : 'w-1/3'
                  } flex-shrink-0 px-2 sm:px-3 lg:px-4`}
                >
                  <Card className="h-full bg-white text-black border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-4 sm:p-5 lg:p-6">
                      {/* Quote Icon */}
                      <Quote className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary mb-3 sm:mb-4" />

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-3 sm:mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-card-foreground mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed line-clamp-4 sm:line-clamp-none">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>

                      {/* Trip Info */}
                      <div className="bg-muted rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm font-semibold text-primary">{testimonial.trip}</p>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-card-foreground text-sm sm:text-base">{testimonial.name}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="sm:hidden flex justify-center space-x-4 mt-4">
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className="bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className="bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                  currentIndex === index
                    ? "bg-primary scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">4.9/5</div>
              <div className="text-xs sm:text-sm text-white">Average Rating</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">10,000+</div>
              <div className="text-xs sm:text-sm text-white">Happy Customers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">50+</div>
              <div className="text-xs sm:text-sm text-white">Destinations</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">15+</div>
              <div className="text-xs sm:text-sm text-white">Years Experience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}