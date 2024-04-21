import classNames from "classnames";
// import { ChevronRight, Icon } from "react-feather";
import { Link } from "react-router-dom";
import { Collapse } from "../../styleguide/Collapse/Collapse";
import { FiChevronRight } from "react-icons/fi";
import { IconType } from "react-icons";

export interface NavbarItemProps {
  Icon?: IconType;
  label: string;
  link?: string;
  external?: boolean;
  active?: boolean;
  items?: NavbarItemProps[];

  child?: boolean;
  level?: number;
}

const NavbarItemHeader = ({
  opened,
  Icon,
  child,
  label,
  items,
}: NavbarItemProps & { opened: boolean }) => {
  return (
    <>
      {Icon && (
        <Icon color="currentColor" size={child ? 16 : 24} className={`mr-2`} />
      )}
      <span className="leading-none">{label}</span>

      {items && (
        <FiChevronRight
          className={`ml-auto mr-6 transition duration-150 ${
            opened ? "rotate-90" : ""
          }`}
          color="currentColor"
          size={16}
        />
      )}
    </>
  );
};

const NavbarItem = (props: NavbarItemProps) => {
  const { items, link, external, active, level = 1 } = props;

  const classes = classNames({
    "!text-brand-500 font-semibold": active,
  });

  if (items)
    return (
      <>
        <Collapse
          className={`flex w-full items-center outline-0 focus:outline-none bg-white py-3 pl-4 text-md text-gray-500 hover:bg-gray-200 ${classes} cursor-pointer`}
          header={(opened: boolean) => (
            <NavbarItemHeader {...props} opened={opened} />
          )}
          initialOpened={level > 1}
        >
          {items && (
            <div className={`ml-4 border-l-2 border-gray-200 `}>
              {items?.map((item) => {
                return (
                  <NavbarItem
                    active={location.pathname === `${item.link}`}
                    key={`${item.link} ${level + 1}`}
                    {...item}
                    child
                    level={level + 1}
                  />
                );
              })}
            </div>
          )}
        </Collapse>
      </>
    );

  return (
    <Link
      className={`flex w-full items-center bg-white py-3 pl-4 text-md text-gray-500 hover:bg-gray-200 ${classes} cursor-pointer`}
      target={external ? "_blank" : undefined}
      to={`${link}`}
    >
      <NavbarItemHeader {...props} opened={false} />
    </Link>
  );
};

export { NavbarItem };
