import { FiLogOut, FiRepeat } from "react-icons/fi";
import CefetLogo from "../../../assets/cefet_logo.png";

import "./styles.scss";
import { Button } from "../../styleguide/Button/Button";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar--container flex flex-col bg-white">
      <div className="p-4">
        <img src={CefetLogo} alt="" />
      </div>
      <div className="flex-grow">
        <Button apperance="menu" block>
          Inicio
        </Button>
        <Button apperance="menu" block>
          <Link to={"/education"} className="block w-full text-left">
            Ensino
          </Link>
        </Button>
        <Button apperance="menu" block>
          Teste 2
        </Button>
      </div>
      <div className="sidebar--footer ">
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
