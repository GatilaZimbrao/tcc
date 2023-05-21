import classNames from "classnames";
import { Spinner } from "../Spinner/Spinner";

type ButtonType = "primary" | "dashed" | "menu" | "link" | "text" | "default";
type ButtonSize = "xs" | "sm" | "md" | "lg";

type ButtonTypeDefinition = {
  default?: string;
  hover?: string;
  active?: string;
};

type ButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, "size"> & {
  loading: boolean;
  block: boolean;
  compact: boolean;
  size: ButtonSize;
  apperance: ButtonType;
  type: "button" | "submit" | "reset" | undefined;
};

const types: Record<ButtonType, ButtonTypeDefinition> = {
  primary: {
    default:
      "bg-brand-500 text-white border border-brand-500 shadow-md shadow-brand-500/20",
    hover: "hover:bg-brand-600 hover:border-brand-600 hover:text-white",
    active: "active:bg-brand-700 active:border-brand-600",
  },
  dashed: {
    default:
      "bg-white text-brand-500 border border-dashed border-brand-500 shadow-brand-500/20",
    hover: "hover:bg-brand-500 hover:text-white hover:shadow-md",
    active: "active:bg-brand-600",
  },
  default: {
    default:
      "bg-white text-brand-500 border border-brand-500 shadow-brand-500/20",
    hover: "hover:bg-brand-500 hover:text-white hover:shadow-md",
    active: "active:bg-brand-600",
  },
  menu: {
    default: "bg-transparent text-brand-500 border-gray-200",
    hover: "hover:bg-brand-500 hover:text-white",
    active: "active:bg-brand-600",
  },
  link: {
    default: "bg-transparent text-link underline border-0",
  },
  text: {
    default: "bg-transparent border-0 text-gray-900",
  },
};

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const Button = ({
  block,
  children,
  loading,
  apperance,
  disabled,
  compact,
  size,
  className,
  type,
  ...rest
}: ButtonProps) => {
  const classes = classNames(
    className,
    types[apperance]?.default,
    types[apperance]?.hover,
    types[apperance]?.active,
    sizes[size],
    {
      "w-full": block,
      "w-fit": !block,
      "opacity-70 pointer-events-none": disabled,
      "px-4 py-2": !compact,
      "text-opacity-50 pointer-events-none": loading,
    }
  );

  const loadingClasses = classNames({
    "mr-2 w-4": loading,
    "w-0 h-0": !loading,
  });

  const shadowClasses = classNames({
    "shadow-animation-group": apperance != "link" && apperance != "text",
  });

  return (
    <button
      className={`${classes} group relative z-[2] flex items-center rounded transition duration-150 ease-out hover:ease-in font-sans`}
      {...rest}
      type={type}
    >
      <Spinner className={loadingClasses} />
      {children}
      <span className={shadowClasses}></span>
    </button>
  );
};

Button.defaultProps = {
  block: false,
  loading: false,
  apperance: "default",
  compact: false,
  size: "md",
  disabled: false,
} as ButtonProps;

export { Button };
