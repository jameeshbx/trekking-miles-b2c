"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, MessageCircle,  CheckCircle } from "lucide-react"
import { useState } from "react"


export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  })
 
  const [submitStatus, ] = useState<{type: 'success' | 'error' | null, message: string}>({type: null, message: ''})

  
  const handleWhatsAppClick = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create a formatted message with all form data
    const message = `*New Enquiry from TrekkingMiles*%0A%0A` +
    `*Name:* ${formData.name || 'Not provided'}%0A` +
    `*Email:* ${formData.email || 'Not provided'}%0A` +
    `*Phone:* ${formData.phone || 'Not provided'}%0A` +
    `*Destination:* ${formData.destination || 'Not specified'}%0A` +
    `*Message:* ${formData.message || 'No message provided'}`;

    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/919447046426?text=${message}`, '_blank');
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function handleCallClick() {
    // Replace with your business phone number
    const phoneNumber = "+919447046426";
    window.open(`tel:${phoneNumber}`, '_blank');
  }

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
  Get in touch with our travel experts to plan your perfect getaway. We&apos;re here to make your dream trip a
  reality.
</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-black">
                <h3 className="text-2xl font-bold text-card-foreground mb-6">Send Us a Message</h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2">
  Phone Number <span className="text-red-500">*</span>
</label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="destination" className="block text-sm font-medium text-card-foreground mb-2">
                        Preferred Destination
                      </label>
                      <Input
                        id="destination"
                        name="destination"
                        type="text"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="e.g., Thailand, Nepal, Bali"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                      Message
                    </label>
                    <Textarea
  id="message"
  name="message"
  value={formData.message}
  onChange={handleInputChange}
  className="min-h-[120px]"
  placeholder="Tell us about your travel plans..."
/>
                  </div>

                  {submitStatus.message && (
                    <div className={`p-3 rounded-md ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <div className="flex items-center">
                        {submitStatus.type === 'success' && <CheckCircle className="h-5 w-5 mr-2" />}
                        {submitStatus.message}
                      </div>
                    </div>
                  )}

<div className="flex flex-col sm:flex-row gap-4 mt-6">
      {/* WhatsApp Button */}
      <Button
        type="button"
        onClick={handleWhatsAppClick}
        className="flex-1 bg-green-800 hover:bg-green-700 text-white py-3 text-lg font-semibold group transition-colors"
      >
        <MessageCircle className="h-5 w-5 mr-2" />
        WhatsApp Us
      </Button>

      {/* Call Button */}
      <Button
        type="button"
        onClick={handleCallClick}
        className="flex-1 bg-orange-800 hover:bg-orange-600 text-white py-3 text-lg font-semibold group transition-colors"
      >
        <Phone className="h-5 w-5 mr-2" />
        Call Us Now
      </Button>
    </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick Contact */}
            <Card className="bg-primary text-primary-foreground border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Phone className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-white">Call Us Now</h3>
                <p className="mb-4 opacity-90">Speak directly with our travel experts</p>
                <div className="flex flex-col sm:flex-row gap-4 ml-[156px]">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-orange-800 text-primary hover:bg-orange-800 font-semibold"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  9447046426
                </Button>
                

                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-orange-800 text-primary hover:bg-orange-800 font-semibold"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  9633779922
                </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email Us</h4>
                  <p className="text-muted-foreground">support@trekkingmiles.com</p>
                  
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">24/7 Support</h4>
                  <p className="text-muted-foreground">Emergency travel support available</p>
                  <p className="text-muted-foreground">WhatsApp: +91 9447046426</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 md:col-span-2"
              >
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Visit Our Office</h4>
                  <p className="text-muted-foreground">
                    TrekkingMiles Pvt Ltd, First Floor,<br/>
                    Integrated Startup Complex,<br/>
                    Kerala Technology Innovation Zone HMT Colony,<br/>
                    Kalamassery - Kochi, Kerala-683503
                  </p>
                </div>
              </motion.div>
            </div>

            
          </motion.div>
        </div>
      </div>
    </section>
  )
}
