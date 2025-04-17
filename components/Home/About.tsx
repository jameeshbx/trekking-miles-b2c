import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import FeatureItem from "../Helper/FeatureItem";


interface AboutProps {
  imageOrder: string;
  textOrder: string;
  title: string;
  linkText: string;
  features: string[];
}


const About = ({
  imageOrder,
  textOrder,
  title,
  linkText,
  features
}: AboutProps) => {
  
  return (
    <div className="pt-16 pb-16">
      <div className="w-[80%] mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-12">
        {/* text content */}
        <div className={`${textOrder}`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold">
            {title}
          </h1>
          <div className="mt-8">
            {features.map((feature, index) => (
              <FeatureItem key={index} text={feature} />
            ))}
      
            {/* Link */}
            <p className="font-semibold text-pink-600 cursor-pointer hover:underline w-fit">
              {linkText}
            </p>
          </div>
        </div>

        {/* image content */}
        <div 
          className={`${imageOrder}`}
          data-aos="zoom-in"
          data-aos-anchor-placement="top-center" 
        >
          <Image 
            src="/images/h1.png"
            alt="image"
            width={380}
            height={380}
          />
        </div>
      </div>
    </div>
  )
}

export default About