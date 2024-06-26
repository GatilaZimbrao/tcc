import { useLocation } from "react-router-dom";
import { NavbarItem, NavbarItemProps } from "./NavbarItem";
import { FiX } from "react-icons/fi";

const menu: NavbarItemProps[] = [
  {
    label: "Início",
    link: "/",
  },

  {
    label: "Ensino",
    items: [
      {
        label: "Documentos",
        link: "/documentos",
      },
      {
        label: "Manual do aluno",
        external: true,
        link: "http://www.cefet-rj.br/index.php/2015-06-12-17-56-40",
      },
      {
        label: "Horários",
        external: true,
        link: "https://www.cefet-rj.br/index.php/horarios-campus-nova-friburgo",
      },
      {
        label: "Calendário",
        external: true,
        link: "https://www.cefet-rj.br/index.php/calendarios-campus-nova-friburgo",
      },
      {
        label: "Portal do Aluno",
        external: true,
        link: "https://alunos.cefet-rj.br/aluno/login.action",
      },
    ],
  },

  {
    label: "Extensão",
    items: [
      {
        label: "Programas",
        link: "/programas",
      },
      {
        label: "Projetos",
        link: "/projetos",
      },
    ],
  },
  {
    label: "Docentes",
    link: "/docentes",
  },

  {
    label: "Biblioteca",
    external: true,
    link: "https://biblioteca.cefet-rj.br/index.html",
  },
  {
    label: "Contato",
    link: "/contato",
  },

  {
    label: "Colegiado",
    link: "/colegiado",
  },
];
interface NavbarProps {
  closeMenu: () => void;
}
const Navbar = ({ closeMenu }: NavbarProps) => {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-start h-full w-full bg-white p-4 fixed top-0 left-0 z-50 lg:relative lg:h-auto lg:w-auto lg:bg-transparent lg:p-0">
      <div className="flex items-center justify-between w-full pl-4  lg:hidden">
        <span className="bg-white text-lg font-bold text-gray-500">Menu</span>
        <button
          className="self-end  text-text-gray-500 p-2"
          onClick={closeMenu}
          type="button"
        >
          <FiX size={24} />
        </button>
      </div>
      {menu.map((item) => (
        <NavbarItem
          active={location.pathname === `${item.link}`}
          key={item.label}
          {...item}
        />
      ))}
    </div>
  );
};

export { Navbar };
