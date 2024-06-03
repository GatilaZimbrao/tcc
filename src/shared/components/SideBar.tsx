import { FiLogOut, FiRepeat } from "react-icons/fi";
import CefetLogo from "../../assets/cefet_logo.png";

import { Button } from "../styleguide/Button/Button";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import { useAuth } from "../../modules/auth/context/AuthContext";

const SideBar = () => {
  const { handleLogout } = useAuth();

  return (
    <div className="sidebar--container flex flex-col bg-white shadow-default text-gray-500 shadow-black/5 max-w-xs w-full">
      <div className="p-4">
        <img src={CefetLogo} alt="" />
      </div>
      <div className="flex-grow">
        <Navbar />
      </div>
      <div className="sidebar--footer ">
        <div>
          <button
            className="w-full py-2 px-4 cursor-pointer flex gap-2 items-center"
            onClick={handleLogout}
            type="button"
          >
            <FiRepeat /> Mudar conta
          </button>
        </div>
        <div>
          <button
            className="w-full py-2 px-4 cursor-pointer flex gap-2 items-center"
            onClick={handleLogout}
            type="button"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export { SideBar };
