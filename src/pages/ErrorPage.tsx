import "./ErrorPage.scss";
import logo from "../assets/images/raynet-logo-notext.svg";
import ButtonBlue from "../components/button/ButtonBlue";

const ErrorPage = () => {
  return (
    <section className="error-page">
      <img src={logo} alt="Raynet logo" />
      <p>Stránka nebyla nalezena.</p>
      <ButtonBlue linkProp="/">DOMŮ</ButtonBlue>
    </section>
  );
};

export default ErrorPage;
