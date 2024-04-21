import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { FiChevronRight } from "react-icons/fi";

type HeaderProps = (opened: boolean) => string | React.ReactNode;

interface CollapseProps {
  header: HeaderProps;
  arrow?: boolean;
  initialOpened?: boolean;
}

export const Collapse = ({
  header,
  arrow,
  className,
  children,
  initialOpened = false,
}: PropsWithChildren<PropsWithClassName<CollapseProps>>) => {
  const [opened, setOpened] = useState<boolean>(initialOpened);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const subMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(opened ? subMenuRef.current?.scrollHeight : undefined);
  }, [subMenuRef, opened]);

  const handleClick = () => {
    setOpened(!opened);
  };

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        {header(opened)}

        {arrow && (
          <FiChevronRight
            className={`ml-auto transition duration-150 ${
              opened ? "rotate-90" : ""
            }`}
            color="currentColor"
            size={16}
          />
        )}
      </button>
      <div
        ref={subMenuRef}
        className={`max-h-0 ${
          opened ? "overflow-auto" : "overflow-hidden"
        } transition-[max-height] duration-300 layout-scrollbar`}
        style={{
          maxHeight: height,
        }}
      >
        {children}
      </div>
    </>
  );
};
