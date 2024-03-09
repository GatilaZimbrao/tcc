interface SuccessMessageProps {
  message?: string;
}
export const SuccessMessage = ({ message }: SuccessMessageProps) => {
  return (
    <span
      className={`block text-xs text-success-900 transition-[all] duration-100 ${
        message ? "h-4" : "h-0"
      } ${message ? "mt-2" : "mt-0"}`}
    >
      {message}
    </span>
  );
};
