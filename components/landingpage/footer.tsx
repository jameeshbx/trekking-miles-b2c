"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {  Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  const handleCallClick = () => {
    window.location.href = "tel:9447046426"
  }

  return (
    <footer className="bg-black text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-2 mb-6">
                
               <Image src="/tm-logo.png" alt="" width={200} height={100} />
              </div>
              <p className="text-background/80 mb-6 text-pretty leading-relaxed">
  Your trusted partner for unforgettable adventures across Asia. We specialize in creating personalized
  travel experiences that connect you with the world&apos;s most beautiful destinations, cultures, and memories
  that last a lifetime.
</p>
              <div className="flex space-x-4">
                <a href="#" className="bg-background/10 hover:bg-accent p-2 rounded-full transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-background/10 hover:bg-accent p-2 rounded-full transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-background/10 hover:bg-accent p-2 rounded-full transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-background/10 hover:bg-accent p-2 rounded-full transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#home" className="text-background/80 hover:text-accent transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#destinations" className="text-background/80 hover:text-accent transition-colors">
                    Destinations
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-background/80 hover:text-accent transition-colors">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-background/80 hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-accent transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-accent transition-colors">
                    Travel Blog
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Popular Destinations */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Popular Destinations</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-background/80 hover:text-accent transition-colors">
                    Thailand Tours
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-accent transition-colors">
                    Nepal Trekking
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-accent transition-colors">
                    Bali Packages
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-accent transition-colors">
                    Vietnam Explorer
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-accent transition-colors">
                    Kerala Backwaters
                  </a>
                </li>
                <li>
                  <a href="#" className="text-background/80 hover:text-accent transition-colors">
                    Goa Beaches
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Contact Bar */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-background/20 py-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-background/60">Call Us</p>
                <button onClick={handleCallClick} className="font-semibold hover:text-accent transition-colors">
                  +91 9447046426
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-background/60">Email Us</p>
                <a href="mailto:support@trekkingmiles.com" className="font-semibold hover:text-accent transition-colors">
                  support@trekkingmiles.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-background/60">Visit Us</p>
                <p className="font-semibold">TrekkingMiles Pvt Ltd,

First Floor,<br/> Integrated Startup Complex,

<br/>Kerala Technology Innovation Zone HMT Colony, <br/>Kalamassery -

Kochi, Kerala-683503</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-background/60">© 2025 TrekkingMiles. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                Cancellation Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
