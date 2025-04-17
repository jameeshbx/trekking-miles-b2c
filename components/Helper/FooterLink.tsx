

export const FooterLink = ({ text }: { text: string }) => {
  return (
    <p className="text-gray-300 hover:text-gray-400 font-medium cursor-pointer text-sm">
      {text}
    </p>
  );
};