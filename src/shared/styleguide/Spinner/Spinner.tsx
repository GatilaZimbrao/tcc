import { IconBaseProps } from "react-icons";
import { FiLoader } from "react-icons/fi";

export const Spinner = ({ className }: PropsWithClassName<IconBaseProps>) => {
  return (
    <FiLoader
      className={`animate-spin transition-all duration-300 ease-out-back ${className}`}
      color="currentColor"
    />
  );
};
