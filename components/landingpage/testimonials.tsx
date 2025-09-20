"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
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
  Don&apos;t just take our word for it. Here&apos;s what our happy travelers have to say about their incredible journeys
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
  &ldquo;{testimonial.text}&rdquo;
</p>

                              {/* Trip Info */}
                              <div className="bg-muted rounded-lg p-3 mb-4">
                                <p className="text-sm font-semibold text-primary">{testimonial.trip}</p>
                              </div>

                              {/* Author Info */}
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={testimonial.image || "/placeholder.svg"}
                                  alt={testimonial.name}
                                  width={48}
                                  height={48}
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
