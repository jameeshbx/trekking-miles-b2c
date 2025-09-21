"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import Image from "next/image"

const upcomingTreks = [
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
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
             Treks & Campings
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join our expertly guided treks to some of the most spectacular mountain destinations in the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingTreks.map((trek, index) => (
            <motion.div
              key={trek.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border bg-white text-black h-full">
                <div className="relative overflow-hidden">
                  <Image
                    src={trek.image || "/placeholder.svg"}
                    alt={trek.name}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <CardContent className="p-6 bg-card text-card-foreground flex-1 flex flex-col">
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold text-card-foreground">{trek.name}</h3>
                  </div>

                  <p className="text-muted-foreground mb-4 text-pretty flex-1">{trek.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{trek.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{trek.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{trek.distance}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{trek.meetingPoint}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-orange-500">{trek.price}</span>
                    <Button 
                      className="bg-orange-800 hover:bg-orange-800 text-white"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
