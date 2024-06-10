import { useLocation } from "react-router-dom";
import { NavbarItem, NavbarItemProps } from "./NavbarItem";

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

const Navbar = () => {
  const location = useLocation();
  return (
    <div className={`flex-col flex`}>
      {menu.map((item) => {
        return (
          <NavbarItem
            active={location.pathname === `${item.link}`}
            key={item.label}
            {...item}
          />
        );
      })}
    </div>
  );
};
export { Navbar };
