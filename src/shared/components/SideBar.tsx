import { useState } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import CefetLogo from "../../assets/cefet_logo.png";
import { Navbar } from "./Navbar/Navbar";
import { useAuth } from "../../modules/auth/context/AuthContext";
import { AdminOnly } from "../utils/IsAdmin";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { handleLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="lg:flex lg:flex-col bg-white shadow-default text-gray-500 shadow-black/5 lg:max-w-xs w-full">
      <div className="p-4 flex items-center justify-between lg:block">
        <button className="lg:hidden" onClick={toggleMenu} type="button">
          <FiMenu size={24} />
        </button>
        <Link
          to={"/"}
          className="flex-grow text-center max-w-[200px] lg:max-w-full lg:flex-grow-0"
        >
          <img src={CefetLogo} alt="Cefet Logo" className="mx-auto lg:m-0" />
        </Link>
        <div>
          {/* <AdminOnly> */}
          <button className="lg:hidden" onClick={handleLogout} type="button">
            <FiLogOut size={24} />
          </button>
          {/* </AdminOnly> */}
        </div>
      </div>
      <div
        className={`lg:flex lg:flex-col lg:w-full ${
          isMenuOpen
            ? "fixed top-0 left-0 h-full w-full bg-white z-50"
            : "hidden lg:block"
        }`}
      >
        <Navbar closeMenu={closeMenu} />
      </div>
      <div className="hidden lg:block sidebar--footer mt-auto">
        <AdminOnly>
          <button
            className="w-full py-2 px-4 cursor-pointer flex gap-2 items-center"
            onClick={handleLogout}
            type="button"
          >
            <FiLogOut /> Logout
          </button>
        </AdminOnly>
      </div>
    </div>
  );
};

export { SideBar };
