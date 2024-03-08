type MainComponentProps = React.HTMLProps<HTMLButtonElement>;

const MainComponent = ({ children }: MainComponentProps) => {
  return (
    <div className="main-component--container w-full flex-1 flex items-center justify-center p-4 rounded-2xl max-w-3xl m-auto">
      <div className="flex flex-col items-center  justify-center p-4 rounded-2xl bg-white w-full ">
        {children}
      </div>
    </div>
  );
};

export { MainComponent };
