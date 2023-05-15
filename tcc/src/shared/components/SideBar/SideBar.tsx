import { FiLogOut, FiRepeat } from "react-icons/fi";

import "./styles.scss";

const SideBar = () => {
  return (
    <div className="sidebar--container flex flex-col">
      <div className="p-4">Logo</div>
      <div className="flex-grow">
        <div className="sidebar--list--item">1</div>
        <div className="sidebar--list--item">2</div>
      </div>
      <div className="sidebar--footer">
        <div className="sidebar--footer--item flex gap-2 items-center">
          <FiRepeat /> Mudar conta
        </div>
        <div className="sidebar--footer--item flex gap-2 items-center">
          <FiLogOut /> Logout
        </div>
      </div>
    </div>
  );
};

export { SideBar };
