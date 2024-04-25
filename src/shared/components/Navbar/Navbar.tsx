import { useLocation } from "react-router-dom";
import { NavbarItem, NavbarItemProps } from "./NavbarItem";

const menu: NavbarItemProps[] = [
  {
    label: "Início",
    link: "/home",
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
    label: "Docentes",
    link: "/docentes",
  },

  {
    label: "Biblioteca",
    external: true,
    link: "https://www.cefet-rj.br/index.php/biblioteca-campus-nova-friburgo",
  },
  {
    label: "Contato",
    link: "/contato",
  },

  {
    label: "Colegiado",
    items: [
      {
        label: "CEPE",
        external: true,
        link: "https://www.cefet-rj.br/arquivos_download/instituicao/cepe/outros/regulamento_cepe.pdf",
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
];

const Navbar = () => {
  const location = useLocation();
  return (
    <div
      // col-start-1 col-end-2 row-start-2 row-end-3 w-72
      className={`
      flex-col flex`}
    >
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
