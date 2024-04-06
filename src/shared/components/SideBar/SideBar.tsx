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
          <Link to={"/documentos"} className="block w-full text-left">
            Documentos
          </Link>
        </Button>
        <Button apperance="menu" block>
          <Link to={"/docentes"} className="block w-full text-left">
            Docentes
          </Link>
        </Button>
        <Button apperance="menu" block>
          <Link
            to={"http://www.cefet-rj.br/index.php/2015-06-12-17-56-40"}
            target="_blank"
            className="block w-full text-left"
          >
            Manual do aluno
          </Link>
        </Button>
        <Button apperance="menu" block>
          <Link
            to={"http://www.cefet-rj.br/index.php/horarios"}
            target="_blank"
            className="block w-full text-left"
          >
            Horários
          </Link>
        </Button>
        <Button apperance="menu" block>
          <Link
            to={"http://www.cefet-rj.br/index.php/calendarios"}
            target="_blank"
            className="block w-full text-left"
          >
            Calendário
          </Link>
        </Button>
        <Button apperance="menu" block>
          <Link
            to={"https://alunos.cefet-rj.br/aluno/login.action"}
            target="_blank"
            className="block w-full text-left"
          >
            Portal do Aluno
          </Link>
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
