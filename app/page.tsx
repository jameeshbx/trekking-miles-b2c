import Topbar from "@/components/landingpage/Topbar"
import HeroSection from "@/components/landingpage/hero-section"
import Destinations from "@/components/landingpage/destinations"
import Testimonials from "@/components/landingpage/testimonials"
import ContactUs from "@/components/landingpage/contact-us"
import Footer from "@/components/landingpage/footer"
import UpcomingEvents from "@/components/landingpage/upcoming-events"
import UpcomingTreks from "@/components/landingpage/upcoming-treks"

import ChatbotIcon from "@/components/landingpage/chatbot-icon"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Topbar />
      <HeroSection />
      <UpcomingEvents />
      <UpcomingTreks />
      <Destinations />
      <Testimonials/>
      <ChatbotIcon/>
       <ContactUs />
      <Footer /> 
    </main>
  )
}
