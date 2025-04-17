"use client"


import { aboutSections } from "@/constants/constant";
import About from "./About"
import Features from "./Features"
import Hero from "./Hero"
import Review from "./ReviewSlider/Review";
import Contact from "./Contact";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


const Home = () => {

  useEffect(() => {
    const initAos = async () => {
      await import ('aos');
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: "top-bottom"
      });
    }

    initAos();
  },[])

  return (
    <div className="overflow-hidden">
      <Hero />
      <Features />

      {aboutSections.map((section, index) => (
        <About
          key={index}
          textOrder={section.textOrder}
          imageOrder={section.imageOrder}
          title={section.title}
          linkText={section.linkText}
          features={section.features}
        />
      ))}

      <Review />
      <Contact />
    </div>
  )
}

export default Home