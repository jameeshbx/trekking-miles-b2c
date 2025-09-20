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
                <Link href="/">
                  <Image src="/tm-logo.png" alt="TrekkingMiles Logo" width={200} height={100} priority />
                </Link>
              </div>
              <p className="text-background/80 mb-6 text-pretty leading-relaxed">
                Your trusted partner for unforgettable adventures across Asia. We specialize in creating personalized
                travel experiences that connect you with the world&apos;s most beautiful destinations, cultures, and memories
                that last a lifetime.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="bg-background/10 hover:bg-accent p-2 rounded-full transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="bg-background/10 hover:bg-accent p-2 rounded-full transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="bg-background/10 hover:bg-accent p-2 rounded-full transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="bg-background/10 hover:bg-accent p-2 rounded-full transition-colors">
                  <Youtube className="h-5 w-5" />
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
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#home" className="text-background/80 hover:text-accent transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#destinations" className="text-background/80 hover:text-accent transition-colors">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-background/80 hover:text-accent transition-colors">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-background/80 hover:text-accent transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-background/80 hover:text-accent transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-background/80 hover:text-accent transition-colors">
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
            >
              <h3 className="text-lg font-semibold mb-6">Popular Destinations</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/destinations/thailand" className="text-background/80 hover:text-accent transition-colors">
                    Thailand Tours
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/nepal" className="text-background/80 hover:text-accent transition-colors">
                    Nepal Trekking
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/bali" className="text-background/80 hover:text-accent transition-colors">
                    Bali Packages
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/vietnam" className="text-background/80 hover:text-accent transition-colors">
                    Vietnam Explorer
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/kerala" className="text-background/80 hover:text-accent transition-colors">
                    Kerala Backwaters
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/goa" className="text-background/80 hover:text-accent transition-colors">
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
          className="border-t border-background/20 py-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-background/60">Call Us</p>
                <button onClick={handleCallClick} className="font-semibold hover:text-accent transition-colors text-left">
                  +91 9447046426,<br/>+91 9633779922
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-background/60">Email Us</p>
                <Link 
                  href="mailto:support@trekkingmiles.com" 
                  className="font-semibold hover:text-accent transition-colors"
                >
                  support@trekkingmiles.com
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-background/60">Visit Us</p>
                <p className="font-semibold">TrekkingMiles Pvt Ltd,
                First Floor,<br/> Integrated Startup Complex,
                Kerala Technology Innovation Zone HMT Colony, <br/>Kalamassery -
                Kochi, Kerala-683503</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-background/60"> 2025 TrekkingMiles. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-background/60 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-background/60 hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="/cancellation-policy" className="text-background/60 hover:text-accent transition-colors">
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
