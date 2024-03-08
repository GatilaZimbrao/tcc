interface ErrorMessageProps {
  error?: string;
}
export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <span
      className={`block text-xs text-error-300  transition-[all] duration-100 ${
        error ? "h-4" : "h-0"
      } ${error ? "mt-2" : "mt-0"}`}
    >
      {error}
    </span>
  );
};
