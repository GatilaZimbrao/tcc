import "./styles.scss";

const SideBar = () => {
  return (
    <div className="sidebar--container">
      <div className="sidebar--logo">Logo</div>
      <div className="sidebar--list">
        <div className="sidebar--list--item">1</div>
        <div className="sidebar--list--item">2</div>
      </div>
      <div className="sidebar--footer">
        <div className="sidebar--footer--item">Mudar conta</div>
        <div className="sidebar--footer--item">Logout</div>
      </div>
    </div>
  );
};

export { SideBar };
