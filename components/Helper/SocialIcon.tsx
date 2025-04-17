import { IconType } from "react-icons";

export const SocialIcon = ({ Icon, bgColor }: { Icon: IconType; bgColor: string }) => {
  return (
    <div
      className={`w-8 h-8 ${bgColor} flex flex-col items-center justify-center rounded-full`}
    >
      <Icon />
    </div>
  );
};