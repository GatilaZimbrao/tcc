import React from "react";
import logo from "../../../assets/cefet_logo.png";

export interface BoxedPageProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const BoxedPage = ({ title, children, footer }: BoxedPageProps) => {
  return (
    <div className="flex  min-h-screen overflow-y-auto p-2  w-full flex-col items-center justify-center bg-gradient-to-tl from-brand-500/50 to-brand-300/50">
      <img src={logo} className="mb-2" />
      <div className="mb-24 flex w-full max-w-lg flex-col rounded-md bg-white shadow-2xl">
        <div className="py-6 px-10">
          <h2 className="text-center text-lg font-semibold text-gray-900">
            {title}
          </h2>
          {children}
        </div>

        {!!footer && (
          <div className="flex h-16 items-center justify-between rounded-b-md bg-gray-100 px-10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export { BoxedPage };
