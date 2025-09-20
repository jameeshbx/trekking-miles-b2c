"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone,  Star,  X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

// Callback Form Component
const CallbackForm = ({ destination, onClose }: { destination: string; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string; previewUrl?: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination,
          ...formData
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: `Thank you ${formData.fullName}! We'll contact you soon about ${destination}.`,
          previewUrl: result.previewUrl
        });
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
        });
        // Close form after 3 seconds
        setTimeout(onClose, 3000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h3 className="text-xl font-bold mb-4 text-white">Request Callback for {destination}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitStatus ? (
            <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {submitStatus.message}
              {submitStatus.previewUrl && (
                <div className="mt-2 text-sm">
                  <Link 
                    href={submitStatus.previewUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    View email preview
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  required
                  className="w-full p-2 border rounded-md text-black"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="w-full p-2 border rounded-md text-black"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="w-full p-2 border rounded-md text-black"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  type="button" 
                  onClick={onClose} 
                  variant="outline" 
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

const destinations = [
  {
    id: 1,
    name: "Thailand",
    image: "/thailand.png",
    description: "Discover Thailand's perfect blend of ancient traditions and modern attractions. From the bustling streets of Bangkok to the tranquil beaches of Phuket and the lush mountains of Chiang Mai, Thailand offers diverse experiences for every traveler. Immerse yourself in vibrant street markets, ornate temples, and world-renowned Thai cuisine.",
    highlights: ["Bangkok Temples", "Phuket Beaches", "Chiang Mai Mountains"],
    rating: 4.9,
    price: "From ₹14,500 per person",
  },
  {
    id: 2,
    name: "Goa",
    image: "/goa.png",
    description: "Experience the perfect beach getaway in Goa, where golden sands meet the Arabian Sea. Known for its Portuguese heritage, vibrant nightlife, and water sports, Goa offers a unique blend of relaxation and adventure. Explore colonial churches, spice plantations, and enjoy fresh seafood by the beach.",
    highlights: ["Beach Paradise", "Colonial Heritage", "Water Sports"],
    rating: 4.8,
    price: "From ₹4,999 per person",
  },
  {
    id: 3,
    name: "Kerala",
    image: "/kerala.png",
    description: "Welcome to 'God's Own Country', where emerald backwaters, spice-scented hills, and palm-fringed beaches create a serene paradise. Cruise on traditional houseboats through tranquil backwaters, witness Kathakali performances, and rejuvenate with authentic Ayurvedic treatments in this tropical haven.",
    highlights: ["Backwater Cruises", "Spice Gardens", "Hill Stations"],
    rating: 4.9,
    price: "From ₹7,999 per person",
  },
  {
    id: 4,
    name: "Vietnam",
    image: "/vietnam.png",
    description: "Journey through Vietnam's breathtaking landscapes, from the limestone karsts of Halong Bay to the terraced rice fields of Sapa. Experience the vibrant street food scene, explore ancient temples, and learn about the country's rich history while cruising along the Mekong Delta.",
    highlights: ["Halong Bay", "Ho Chi Minh City", "Sapa Mountains"],
    rating: 4.7,
    price: "From ₹4,599 per person",
  },
  {
    id: 5,
    name: "Bali",
    image: "/bali.png",
    description: "Discover the Island of the Gods, where spiritual traditions meet natural beauty. From the cultural heart of Ubud to the stunning beaches of Seminyak and the volcanic landscapes of Mount Batur, Bali offers a perfect mix of relaxation, adventure, and cultural immersion.",
    highlights: ["Ubud Culture", "Beach Clubs", "Volcano Treaks"],
    rating: 4.8,
    price: "From ₹10,999 per person",
  },
  {
    id: 6,
    name: "Nepal",
    image: "/nepal.png",
    description: "Experience the majesty of the Himalayas in Nepal, home to eight of the world's highest peaks. Trek to Everest Base Camp, explore ancient Buddhist monasteries, and witness breathtaking mountain vistas. The warm hospitality of the Nepalese people makes every journey unforgettable.",
    highlights: ["Everest Base Camp", "Annapurna Circuit", "Kathmandu Valley"],
    rating: 4.9,
    price: "From ₹12,999 per person",
  }
]

export default function DestinationsCarousel() {
  const [showForm, setShowForm] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");

  const openForm = (destination: string) => {
    setSelectedDestination(destination);
    setShowForm(true);
  };

  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-bold ">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-bold text-white">
            Explore our most sought-after destinations that promise unforgettable experiences and memories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg bg-white ">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 text-white"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-white text-sm">{destination.rating}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <p className="text-gray-600 mb-4 text-sm flex-grow">
                    {destination.description}
                  </p>
                  <div className="mt-4 pt-4 ">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg text-orange-600">{destination.price}</span>
                        <div className="flex items-center space-x-2 ">
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => openForm(destination.name)}
                            className="text-xs px-3 py-1 h-8 bg-orange-800"
                          >
                            Request Callback
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`https://wa.me/919447046426?text=Hi, I'm interested in ${destination.name} package. Can you provide more details?`, '_blank')}
                            className="text-xs px-3 py-1 h-8 bg-green-600 text-white border-green-200 hover:bg-green-200"
                          >
                            WhatsApp 
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => window.location.href = 'tel:9447046426'}
                            className="text-xs p-2 h-8 w-8 min-w-0"
                            title="Call Now"
                          >
                            <Phone className="h-4 w-4 text-green-800" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {showForm && (
        <CallbackForm
          destination={selectedDestination}
          onClose={() => setShowForm(false)}
        />
      )}
    </section>
  );
}