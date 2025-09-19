import Topbar from "@/components/landingpage/Topbar"
import HeroSection from "@/components/landingpage/hero-section"
import Destinations from "@/components/landingpage/destinations"
import Testimonials from "@/components/landingpage/testimonials"
import ContactUs from "@/components/landingpage/contact-us"
import Footer from "@/components/landingpage/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Topbar />
      <HeroSection />
      <Destinations />
     <Testimonials/>
       <ContactUs />
      <Footer /> 
    </main>
  )
}
