import { FaCheck } from "react-icons/fa";

interface FeatureItemProps {
  text: string;
}

const FeatureItem = ({ text }: FeatureItemProps) => {
  return (
    <div className="flex items-center mb-6 space-x-4">
      <div className="w-6 h-6 flex flex-col items-center justify-center rounded-full bg-pink-600 text-white">
        <FaCheck />
      </div>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
        {text}
      </p>
    </div>
  );
};

export default FeatureItem;