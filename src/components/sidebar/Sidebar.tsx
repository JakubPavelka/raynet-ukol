import "./Sidebar.scss";
import logoSidebar from "../../assets/images/raynet-logo-notext.svg";
import { Link } from "react-router-dom";
import { BsPeople } from "react-icons/bs";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <Link to="/">
        <img src={logoSidebar} alt="Raynet logo" />
      </Link>
      <Link className="logo-klienti" to="clients">
        <BsPeople />
      </Link>
    </section>
  );
};

export default Sidebar;
