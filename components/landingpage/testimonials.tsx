"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    image: "/indian-woman-smiling.png",
    rating: 5,
    text: "TrekkingMiles made our Nepal adventure absolutely incredible! The guides were knowledgeable, the itinerary was perfect, and every detail was taken care of. We reached Everest Base Camp safely and had the experience of a lifetime.",
    trip: "Nepal - Everest Base Camp Trek",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi, India",
    image: "/indian-man-smiling-portrait.png",
    rating: 5,
    text: "Our family trip to Thailand was phenomenal! From the bustling streets of Bangkok to the serene beaches of Phuket, everything was organized perfectly. The kids loved every moment, and so did we.",
    trip: "Thailand - Family Package",
  },
  {
    id: 3,
    name: "Anita Patel",
    location: "Bangalore, India",
    image: "/indian-woman-happy-portrait.jpg",
    rating: 5,
    text: "The Kerala backwater cruise was magical! Floating through the serene waters, staying in traditional houseboats, and experiencing local culture - it was exactly what we needed for our anniversary.",
    trip: "Kerala - Backwater Experience",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Pune, India",
    image: "/indian-man-adventure-portrait.jpg",
    rating: 5,
    text: "Bali exceeded all expectations! The perfect blend of adventure and relaxation. From temple visits in Ubud to surfing in Canggu, TrekkingMiles crafted an itinerary that suited our adventurous spirits perfectly.",
    trip: "Bali - Adventure Package",
  },
  {
    id: 5,
    name: "Meera Joshi",
    location: "Chennai, India",
    image: "/indian-woman-travel-portrait.jpg",
    rating: 5,
    text: "Vietnam was a revelation! The food, the culture, the landscapes - everything was breathtaking. Ha Long Bay cruise was the highlight. Thank you TrekkingMiles for such a well-planned journey.",
    trip: "Vietnam - Cultural Explorer",
  },
  {
    id: 6,
    name: "Arjun Reddy",
    location: "Hyderabad, India",
    image: "/indian-man-beach-portrait.jpg",
    rating: 5,
    text: "Goa with TrekkingMiles was fantastic! They showed us hidden gems beyond the usual tourist spots. The local experiences, beach activities, and heritage walks made it truly special.",
    trip: "Goa - Hidden Gems Tour",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = {
    desktop: 3,
    tablet: 2,
    mobile: 1,
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage.desktop >= testimonials.length ? 0 : prev + itemsPerPage.desktop))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonials.length - itemsPerPage.desktop) : Math.max(0, prev - itemsPerPage.desktop),
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index * itemsPerPage.desktop)
  }

  const totalSlides = Math.ceil(testimonials.length / itemsPerPage.desktop)

  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance text-white dark:text-white">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty text-white dark:text-white">
            Don't just take our word for it. Here's what our happy travelers have to say about their incredible journeys
            with TrekkingMiles.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600  bg-white" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex + itemsPerPage.desktop >= testimonials.length}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white  rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-6 w-6 text-gray-600  bg-white" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden ">
            <div
              className="flex transition-transform duration-500 ease-in-out "
              style={{ transform: `translateX(-${(currentIndex / itemsPerPage.desktop) * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials
                      .slice(slideIndex * itemsPerPage.desktop, (slideIndex + 1) * itemsPerPage.desktop)
                      .map((testimonial, index) => (
                        <motion.div
                          key={testimonial.id}
                          initial={{ y: 50, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Card className="h-full bg-white text-black border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                              {/* Quote Icon */}
                              <Quote className="h-8 w-8 text-primary mb-4" />

                              {/* Rating */}
                              <div className="flex items-center space-x-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                                ))}
                              </div>

                              {/* Testimonial Text */}
                              <p className="text-card-foreground mb-6 text-pretty leading-relaxed">
                                "{testimonial.text}"
                              </p>

                              {/* Trip Info */}
                              <div className="bg-muted rounded-lg p-3 mb-4">
                                <p className="text-sm font-semibold text-primary">{testimonial.trip}</p>
                              </div>

                              {/* Author Info */}
                              <div className="flex items-center space-x-3">
                                <img
                                  src={testimonial.image || "/placeholder.svg"}
                                  alt={testimonial.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                  <h4 className="font-semibold text-card-foreground">{testimonial.name}</h4>
                                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  Math.floor(currentIndex / itemsPerPage.desktop) === index
                    ? "bg-primary scale-110"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
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
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Destinations</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
