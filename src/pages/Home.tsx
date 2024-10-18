import logo from "../assets/images/raynet-logo-notext.svg";
import ButtonBlue from "../components/button/ButtonBlue";
import "./Home.scss";

const Home = () => {
  return (
    <section className="home">
      <img src={logo} alt="Raynet logo" />
      <h1>RAYNET CRM</h1>

      <ButtonBlue linkProp="clients">KLIENTI</ButtonBlue>
    </section>
  );
};

export default Home;
