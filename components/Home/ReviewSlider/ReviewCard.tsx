import Image from "next/image";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";

interface ReviewCardProps {
  image: string;
  name: string;
  role: string;
  content: string;
}

const ReviewCard = ({ image, name, role, content }: ReviewCardProps) => {
  return (
    <div>
      <div className="flex flex-col items-center relative">
        <BiSolidQuoteAltLeft className="w-12 h-12 text-pink-500 self-start" />
        <p className="text-center text-gray-800 dark:text-gray-200 text-sm">
          {content}
        </p>
        <BiSolidQuoteAltRight className="w-12 h-12 text-pink-500 self-end" />
      </div>
      <div className="mt-2">
        <Image
          src={image}
          alt="image"
          width={100}
          height={100}
          className="object-center mx-auto rounded-full"
        />
        <h1 className="text-lg font-bold text-center mt-4">{name}</h1>
        <h1 className="text-center text-gray-500">{role}</h1>
      </div>
    </div>
  )
}

export default ReviewCard