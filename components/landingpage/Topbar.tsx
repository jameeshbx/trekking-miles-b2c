"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"

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
      className="fixed top-0 left-0 right-0 z-50  backdrop-blur-md  shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            
           <img src="/tm-logo.png" alt="" width={100} height={50} />
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:flex items-center space-x-8"
          >
            <a href="#home" className="text-foreground hover:text-primary transition-colors duration-200 text-white">
              Home
            </a>
            <a href="#destinations" className="text-foreground hover:text-primary transition-colors duration-200 text-white">
              Destinations
            </a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors duration-200 text-white">
              Reviews
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors duration-200 text-white">
              Contact
            </a>
          </motion.nav>

          {/* Call Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                onClick={handleCallClick}
                className="hidden sm:flex items-center space-x-2 bg-orange-800 hover:bg-green-800 text-primary-foreground"
              >
                <Phone className="h-4 w-4" />
                <span >Call Now</span>
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            className="md:hidden py-4 border-t border-border"
          >
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-foreground hover:text-primary transition-colors duration-200">
                Home
              </a>
              <a href="#destinations" className="text-foreground hover:text-primary transition-colors duration-200">
                Destinations
              </a>
              <a href="#testimonials" className="text-foreground hover:text-primary transition-colors duration-200">
                Reviews
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors duration-200">
                Contact
              </a>
              <Button
                onClick={handleCallClick}
                className="w-full sm:hidden bg-primary hover:bg-primary/90 text-primary-foreground"
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
