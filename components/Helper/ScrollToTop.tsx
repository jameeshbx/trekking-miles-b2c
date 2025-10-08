"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when scrolled more than half of the page height
      const halfPageHeight =
        (document.documentElement.scrollHeight - window.innerHeight) / 2;
      if (window.scrollY > halfPageHeight) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-24 z-50">
      {isVisible && (
        <button
          className="bg-orange-800 hover:bg-green-800 text-white rounded-full w-12 h-12 cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
