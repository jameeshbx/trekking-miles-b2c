"use client"


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReviewCard from './ReviewCard';
import { reviews } from '@/constants/constant';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-12 left-4 z-50 p-2 rounded-full bg-transparent text-gray-600 dark:text-white hover:bg-pink-700 hover:text-white transition-colors"
    >
      <MdOutlineKeyboardArrowLeft className='size-8' />
    </button>
  );
};

const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-12 right-4 z-50 p-2 rounded-full bg-transparent text-gray-600 dark:text-white hover:bg-pink-700 hover:text-white transition-colors"
    >
      <MdOutlineKeyboardArrowRight className='size-8' />
    </button>
  );
};


const ReviewSlider = () => {
  return (
    <div className="relative">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {reviews.map((review, index) => (
          <ReviewCard 
            key={index}
            image={review.image}
            name={review.name}
            role={review.role}
            content={review.content}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default ReviewSlider