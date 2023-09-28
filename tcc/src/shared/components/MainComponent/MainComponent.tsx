import { ReactNode } from "react";
import "./styles.scss";

type MainComponentProps = React.HTMLProps<HTMLButtonElement>;

const MainComponent = ({ children }: MainComponentProps) => {
  return (
    <div className="main-component--container w-full flex-1 flex items-center justify-center p-4 rounded-2xl">
      <div className="flex flex-col items-center  justify-center p-4 rounded-2xl bg-white">
        {children}
      </div>
    </div>
  );
};

export { MainComponent };
