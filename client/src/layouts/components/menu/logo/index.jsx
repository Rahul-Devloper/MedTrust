import { Link } from "react-router-dom";
import Yoda from "../../../../assets/images/logo/logo.svg";

const MenuLogo = (props) => {
  return (
    <Link
      to="/"
      className="da-header-logo da-d-flex da-align-items-end"
      onClick={props.onClose}
      style={{
        marginLeft: "22px",
      }}
    >
      <img className="da-logo" src={Yoda} alt="logo" />
    </Link>
  );
};

export default MenuLogo;
