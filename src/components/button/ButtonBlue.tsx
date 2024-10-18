import { Link } from "react-router-dom";
import "./ButtonBlue.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  linkProp: string;
}

const ButtonBlue: React.FC<ButtonProps> = ({ children, linkProp }) => {
  return (
    <>
      <Link className="button-link" to={linkProp}>
        <button className="button-blue">{children}</button>
      </Link>
    </>
  );
};

export default ButtonBlue;
