"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCallClick = () => {
    window.location.href = "tel:9447046426";
  };

  const router = useRouter();

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

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
            <button
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-primary transition-colors duration-200 text-sm lg:text-base"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("destinations")}
              className="text-white hover:text-primary transition-colors duration-200 text-sm lg:text-base"
            >
              Destinations
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-white hover:text-primary transition-colors duration-200 text-sm lg:text-base"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-primary transition-colors duration-200 text-sm lg:text-base"
            >
              Contact
            </button>
          </motion.nav>

          {/* Call Button & Mobile Menu */}
          <div className="flex flex-col items-center space-x-2 sm:space-x-4">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center space-x-2"
            >
              <Button
                variant="outline"
                className="hidden md:flex items-center space-x-2 bg-orange-800 hover:bg-green-800 text-white px-3 py-2 text-sm lg:px-4 lg:text-base"
                onClick={() => router.push("/auth/signin")}
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button
                onClick={handleCallClick}
                className="hidden md:flex items-center space-x-2 bg-orange-800 hover:bg-green-800 text-white px-3 py-2 text-sm lg:px-4 lg:text-base"
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
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
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
              <button
                onClick={() => scrollToSection("home")}
                className="text-white hover:text-primary transition-colors duration-200 py-2 px-2 text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("destinations")}
                className="text-white hover:text-primary transition-colors duration-200 py-2 px-2 text-left"
              >
                Destinations
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-white hover:text-primary transition-colors duration-200 py-2 px-2 text-left"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-primary transition-colors duration-200 py-2 px-2 text-left"
              >
                Contact
              </button>
              <Button
                onClick={() => {
                  handleCallClick();
                  setIsMenuOpen(false);
                }}
                className="w-full sm:hidden bg-orange-800 hover:bg-green-800 text-white mt-4"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>

              <Button
                variant="outline"
                className="w-full sm:hidden bg-orange-800 hover:bg-green-800 text-white mt-4"
              >
                <User className="h-4 w-4 mr-2 mb-2" />
                Sign In
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
