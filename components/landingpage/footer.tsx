"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  const handleCallClick = () => {
    window.location.href = "tel:9447046426"
  }

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <Link href="/">
                  <Image 
                    src="/tm-logo.png" 
                    alt="TrekkingMiles Logo" 
                    width={150} 
                    height={75} 
                    className="sm:w-[200px] sm:h-[100px]" 
                    priority 
                  />
                </Link>
              </div>
              <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                Your trusted partner for unforgettable adventures across Asia. We specialize in creating personalized
                travel experiences that connect you with the world&apos;s most beautiful destinations, cultures, and memories
                that last a lifetime.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <Link href="#" className="bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full transition-colors">
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link href="#" className="bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full transition-colors">
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link href="#" className="bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full transition-colors">
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link href="#" className="bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full transition-colors">
                  <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link href="#home" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#destinations" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                    Travel Blog
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Popular Destinations */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-1 lg:col-span-1"
            >
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Popular Destinations</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link href="/destinations/thailand" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                    Thailand Tours
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/nepal" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                    Nepal Trekking
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/bali" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                    Bali Packages
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/vietnam" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                    Vietnam Explorer
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/kerala" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                    Kerala Backwaters
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/goa" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                    Goa Beaches
                  </Link>
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
          className="border-t border-white/20 py-6 sm:py-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Phone */}
            <div className="flex items-start space-x-3">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 mt-1 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-white/60 mb-1">Call Us</p>
                <button 
                  onClick={handleCallClick} 
                  className="font-semibold hover:text-orange-500 transition-colors text-left text-sm sm:text-base"
                >
                  +91 9447046426
                  <br className="sm:hidden" />
                  <span className="sm:block">+91 9633779922</span>
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-3">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 mt-1 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-white/60 mb-1">Email Us</p>
                <Link 
                  href="mailto:support@trekkingmiles.com" 
                  className="font-semibold hover:text-orange-500 transition-colors text-sm sm:text-base break-all"
                >
                  support@trekkingmiles.com
                </Link>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-3 sm:col-span-2 lg:col-span-1">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 mt-1 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-white/60 mb-1">Visit Us</p>
                <p className="font-semibold text-sm sm:text-base leading-relaxed">
                  TrekkingMiles Pvt Ltd, First Floor,
                  <br />Integrated Startup Complex,
                  <br />Kerala Technology Innovation Zone 
                  <br />HMT Colony, Kalamassery - Kochi, 
                  <br />Kerala-683503
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-xs sm:text-sm text-white/60 text-center sm:text-left">
              © 2025 TrekkingMiles. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <Link href="/privacy-policy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cancellation-policy" className="text-white/60 hover:text-white transition-colors">
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}