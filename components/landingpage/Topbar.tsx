"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleCallClick = () => {
    window.location.href = "tel:9447046426"
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            <Link href="/">
              <Image 
                src="/tm-logo.png" 
                alt="Trekking Miles Logo" 
                width={80} 
                height={40} 
                className="sm:w-[100px] sm:h-[50px]" 
                priority 
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:flex items-center space-x-6 lg:space-x-8"
          >
            <Link href="#home" className="text-white hover:text-primary transition-colors duration-200 text-sm lg:text-base">
              Home
            </Link>
            <Link href="#destinations" className="text-white hover:text-primary transition-colors duration-200 text-sm lg:text-base">
              Destinations
            </Link>
            <Link href="#testimonials" className="text-white hover:text-primary transition-colors duration-200 text-sm lg:text-base">
              Reviews
            </Link>
            <Link href="#contact" className="text-white hover:text-primary transition-colors duration-200 text-sm lg:text-base">
              Contact
            </Link>
          </motion.nav>

          {/* Call Button & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                onClick={handleCallClick}
                className="hidden sm:flex items-center space-x-2 bg-orange-800 hover:bg-green-800 text-white px-3 py-2 text-sm lg:px-4 lg:text-base"
              >
                <Phone className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden lg:inline">Call Now</span>
                <span className="lg:hidden">Call</span>
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4 border-t border-white/20"
          >
            <nav className="flex flex-col space-y-4">
              <Link 
                href="#home" 
                className="text-white hover:text-primary transition-colors duration-200 py-2 px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="#destinations" 
                className="text-white hover:text-primary transition-colors duration-200 py-2 px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link 
                href="#testimonials" 
                className="text-white hover:text-primary transition-colors duration-200 py-2 px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                href="#contact" 
                className="text-white hover:text-primary transition-colors duration-200 py-2 px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button
                onClick={() => {
                  handleCallClick()
                  setIsMenuOpen(false)
                }}
                className="w-full sm:hidden bg-orange-800 hover:bg-green-800 text-white mt-4"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}