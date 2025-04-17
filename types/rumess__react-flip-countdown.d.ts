declare module "@rumess/react-flip-countdown" {
  interface FlipCountdownProps {
    endAt: string;
    theme?: "dark" | "light";
    hideYear?: boolean;
    hideMonth?: boolean;
    dayTitle?: string;
    hourTitle?: string;
    minuteTitle?: string;
    secondTitle?: string;
    size?: "small" | "medium" | "large";
    titlePosition?: "top" | "bottom";
    className?: string;
  }

  const FlipCountdown: React.FC<FlipCountdownProps>;
  export default FlipCountdown;
}
