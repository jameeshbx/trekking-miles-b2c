"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Callback Form Component
const CallbackForm = ({
  destination,
  onClose,
}: {
  destination: string;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
    previewUrl?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          ...formData,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: `Thank you ${formData.fullName}! We'll contact you soon about ${destination}.`,
          previewUrl: result.previewUrl,
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
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black pr-8">
          Request Callback for {destination}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {submitStatus ? (
            <div
              className={`p-3 sm:p-4 rounded-md ${
                submitStatus.success
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <p className="text-sm sm:text-base">{submitStatus.message}</p>
              {submitStatus.previewUrl && (
                <div className="mt-2 text-xs sm:text-sm">
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
                <label className="block text-sm font-medium mb-1 text-black">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  required
                  className="w-full p-2 sm:p-3 border rounded-md text-black text-sm sm:text-base"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="w-full p-2 sm:p-3 border rounded-md text-black text-sm sm:text-base"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="w-full p-2 sm:p-3 border rounded-md text-black text-sm sm:text-base"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

const destinations = [
  {
    id: 1,
    name: "Thailand",
    image: "/thailand.png",
    description:
      "Discover Thailand's perfect blend of ancient traditions and modern attractions. From the bustling streets of Bangkok to the tranquil beaches of Phuket and the lush mountains of Chiang Mai, Thailand offers diverse experiences for every traveler.",
    highlights: ["Bangkok Temples", "Phuket Beaches", "Chiang Mai Mountains"],
    rating: 4.9,
    price: "From ₹14,500 per person",
  },
  {
    id: 2,
    name: "Goa",
    image: "/goa.png",
    description:
      "Experience the perfect beach getaway in Goa, where golden sands meet the Arabian Sea. Known for its Portuguese heritage, vibrant nightlife, and water sports, Goa offers a unique blend of relaxation and adventure.",
    highlights: ["Beach Paradise", "Colonial Heritage", "Water Sports"],
    rating: 4.8,
    price: "From ₹4,999 per person",
  },
  {
    id: 3,
    name: "Kerala",
    image: "/kerala.png",
    description:
      "Welcome to 'God's Own Country', where emerald backwaters, spice-scented hills, and palm-fringed beaches create a serene paradise. Cruise on traditional houseboats through tranquil backwaters.",
    highlights: ["Backwater Cruises", "Spice Gardens", "Hill Stations"],
    rating: 4.9,
    price: "From ₹7,999 per person",
  },
  {
    id: 4,
    name: "Vietnam",
    image: "/vietnam.png",
    description:
      "Journey through Vietnam's breathtaking landscapes, from the limestone karsts of Halong Bay to the terraced rice fields of Sapa. Experience the vibrant street food scene and rich history.",
    highlights: ["Halong Bay", "Ho Chi Minh City", "Sapa Mountains"],
    rating: 4.7,
    price: "From ₹4,599 per person",
  },
  {
    id: 5,
    name: "Bali",
    image: "/bali.png",
    description:
      "Discover the Island of the Gods, where spiritual traditions meet natural beauty. From the cultural heart of Ubud to stunning beaches and volcanic landscapes.",
    highlights: ["Ubud Culture", "Beach Clubs", "Volcano Treks"],
    rating: 4.8,
    price: "From ₹10,999 per person",
  },
  {
    id: 6,
    name: "Nepal",
    image: "/nepal.png",
    description:
      "Experience the majesty of the Himalayas in Nepal, home to eight of the world's highest peaks. Trek to Everest Base Camp and explore ancient Buddhist monasteries.",
    highlights: ["Everest Base Camp", "Annapurna Circuit", "Kathmandu Valley"],
    rating: 4.9,
    price: "From ₹12,999 per person",
  },
];

export default function DestinationsCarousel() {
  const [showForm, setShowForm] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenSize, setScreenSize] = useState("desktop");

  // Handle screen size detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1280) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset current index when screen size changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [screenSize]);

  const openForm = (destination: string) => {
    setSelectedDestination(destination);
    setShowForm(true);
  };

  // Carousel controls
  const getItemsPerPage = () => {
    if (screenSize === "mobile") return 1;
    if (screenSize === "tablet") return 2;
    return 3; // desktop - but we'll use grid for desktop
  };

  const itemsPerPage = getItemsPerPage();
  const totalSlides = Math.max(1, destinations.length - itemsPerPage + 1);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalSlides - 1;

  // Render desktop grid view
  if (screenSize === "desktop") {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-black" id="destinations">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
              Popular Destinations
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-white max-w-2xl mx-auto px-4">
              Explore our most sought-after destinations that promise
              unforgettable experiences and memories.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-6 lg:gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg bg-white">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <h3 className="text-xl font-bold text-white">
                        {destination.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-white text-sm">
                          {destination.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-5 flex-grow flex flex-col">
                    <p className="text-gray-600 mb-4 text-base flex-grow leading-relaxed">
                      {destination.description}
                    </p>

                    <div className="mt-auto">
                      <div className="flex flex-col space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg text-orange-600">
                            {destination.price}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => openForm(destination.name)}
                            className="flex-1 text-sm px-3 py-2 h-9 bg-orange-800 hover:bg-orange-700 text-white"
                          >
                            Request Callback
                          </Button>

                          <Button
                            size="sm"
                            onClick={() =>
                              window.open(
                                `https://wa.me/919447046426?text=Hi, I'm interested in ${destination.name} package. Can you provide more details?`,
                                "_blank"
                              )
                            }
                            className="flex-1 text-sm px-3 py-2 h-9 bg-green-600 hover:bg-green-700 text-white"
                          >
                            WhatsApp
                          </Button>

                          <Button
                            size="sm"
                            onClick={() =>
                              (window.location.href = "tel:9447046426")
                            }
                            className="text-sm p-2 h-9 w-9 min-w-0 bg-blue-600 hover:bg-blue-700 text-white"
                            title="Call Now"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {showForm && (
            <CallbackForm
              destination={selectedDestination}
              onClose={() => setShowForm(false)}
            />
          )}
        </div>
      </section>
    );
  }

  // Render mobile and tablet carousel view
  return (
    <section className="py-8 sm:py-12 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
            Popular Destinations
          </h2>
          <p className="text-sm sm:text-base text-white max-w-2xl mx-auto px-4">
            Explore our most sought-after destinations that promise
            unforgettable experiences and memories.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Hidden on mobile, visible on tablet */}
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
            >
              {destinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: (index % itemsPerPage) * 0.1,
                  }}
                  viewport={{ once: true }}
                  className={`${
                    screenSize === "mobile" ? "w-full" : "w-1/2"
                  } flex-shrink-0 px-2 sm:px-3`}
                >
                  <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg bg-white">
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-3 sm:p-4 w-full">
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          {destination.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-white text-xs sm:text-sm">
                            {destination.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-3 sm:p-4 flex-grow flex flex-col">
                      <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm flex-grow leading-relaxed line-clamp-3">
                        {destination.description}
                      </p>

                      <div className="mt-auto">
                        <div className="flex flex-col space-y-2 sm:space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm sm:text-base text-orange-600">
                              {destination.price}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              onClick={() => openForm(destination.name)}
                              className="w-full text-xs sm:text-sm px-2 sm:px-3 py-2 h-8 sm:h-9 bg-orange-800 hover:bg-orange-700 text-white"
                            >
                              Request Callback
                            </Button>

                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                onClick={() =>
                                  window.open(
                                    `https://wa.me/919447046426?text=Hi, I'm interested in ${destination.name} package. Can you provide more details?`,
                                    "_blank"
                                  )
                                }
                                className="flex-1 text-xs sm:text-sm px-2 sm:px-3 py-2 h-8 sm:h-9 bg-green-600 hover:bg-green-700 text-white"
                              >
                                WhatsApp
                              </Button>

                              <Button
                                size="sm"
                                onClick={() =>
                                  (window.location.href = "tel:9447046426")
                                }
                                className="text-xs sm:text-sm p-2 h-8 sm:h-9 w-8 sm:w-9 min-w-0 bg-blue-600 hover:bg-blue-700 text-white"
                                title="Call Now"
                              >
                                <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
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

          {/* Mobile Navigation Arrows */}
          <div className="sm:hidden flex justify-center space-x-4 mt-4">
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className="bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className="bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-1 sm:space-x-2 mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                  currentIndex === index
                    ? "bg-orange-500 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {showForm && (
          <CallbackForm
            destination={selectedDestination}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </section>
  );
}
