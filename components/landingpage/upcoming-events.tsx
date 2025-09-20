"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock, Ticket } from "lucide-react"
import Image from "next/image"

const upcomingEvents = [
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
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-black">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance text-white">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty text-white">
            Join our exciting events and workshops designed to enhance your travel experiences and knowledge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group overflow-hidden bg-white text-black hover:shadow-xl transition-all duration-300 border-border bg-white h-full">
                <div className="relative overflow-hidden text-black">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.name}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 text-black px-4 py-2 rounded-lg shadow-lg font-bold text-base">
                    {event.price.replace('From ', '')}
                  </div>
                </div>

                <CardContent className="p-6 bg-white text-black flex-1 flex flex-col text-black">
                  <div className="flex items-center space-x-2 mb-3">
                    <Ticket className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold text-card-foreground">{event.name}</h3>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6">{event.description}</p>

                  <div className="space-y-2 mb-6 ">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{event.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.meetingPoint}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      const message = `Hi, I'm interested in booking ${event.name} on ${event.date}. Can you provide more details?`;
                      const encodedMessage = encodeURIComponent(message);
                      window.open(`https://wa.me/919447046426?text=${encodedMessage}`, '_blank');
                    }}
                    className="w-full bg-orange-800 hover:bg-orange-800 text-white font-bold"
                  >
                    Book now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
