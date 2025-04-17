import { FaDribbble, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";



export const navLinks = [
  {
    id: 1,
    url: "#",
    label: "Home"
  },
  {
    id: 2,
    url: "#",
    label: "About"
  },
  {
    id: 3,
    url: "#",
    label: "Features"
  },
  {
    id: 4,
    url: "#",
    label: "Price"
  },
  {
    id: 5,
    url: "#",
    label: "Testimonials"
  },
  {
    id: 6,
    url: "#",
    label: "Contact"
  }
];

export const aboutSections = [
  {
    textOrder: "lg:order-1",
    imageOrder: "lg:order-2",
    title: "Pure sound, no added noise",
    linkText: "Learn More",
    features: [
      "Noise cancellation for pure sound",
      "High-quality wireless audio",
      "Ergonomic design for comfort",
      "High-resolution audio compatibility",
    ],
  },
  {
    textOrder: "lg:order-2",
    imageOrder: "lg:order-1",
    title: "Capture pure sound with the 70mm HD Driver",
    linkText: "Shop Now",
    features: [
      "70mm HD Driver for exceptional sound",
      "Adaptive Sound Control",
      "High-resolution audio compatibility",
      "Awesome sound quality",
    ],
  },
];

export const reviews = [
  {
    image: "/images/c1.png",
    name: "John Doe",
    role: "Founder Codex",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quisquam facilis accusantium rerum maiores vitae soluta commodi obcaecati sit impedit, explicabo inventore quam ex. Nesciunt ea autem consequatur voluptatibus quos."
  },
  {
    image: "/images/c2.png",
    name: "Susan Smith",
    role: "Founder TechBox",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quisquam facilis accusantium rerum maiores vitae soluta commodi obcaecati sit impedit, explicabo inventore quam ex. Nesciunt ea autem consequatur voluptatibus quos."
  },
  {
    image: "/images/c3.png",
    name: "Greg Brown",
    role: "Co-Founder Devex",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quisquam facilis accusantium rerum maiores vitae soluta commodi obcaecati sit impedit, explicabo inventore quam ex. Nesciunt ea autem consequatur voluptatibus quos."
  }
];

export const companyLinks = ["About Us", "Services", "Our Customer", "Portfolio", "Blog"];
export const supportLinks = ["Legal Information", "Terms & Conditions", "Report Abuse", "Privacy"];
export const socialIcons = [
  { Icon: FaFacebookF, bgColor: "bg-blue-700" },
  { Icon: FaXTwitter, bgColor: "bg-sky-500" },
  { Icon: FaDribbble, bgColor: "bg-pink-700" },
  { Icon: FaInstagram, bgColor: "bg-indigo-700" },
];