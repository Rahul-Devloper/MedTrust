import { Link } from "react-router-dom";
import Logo from "../../../../assets/images/logo/logoText.png";

const MenuLogo = (props) => {
  return (
    <div className="hp-header-logo hp-d-flex hp-align-items-center">
      <Link
        to="/"
        className="hp-position-relative hp-d-flex"
        onClick={props.onClose}
        style={{
          // Move down
          transform: "translateX(-10px) translateY(5px)",
        }}
      >
        <img
          className="hp-logo"
          src={Logo}
          alt="logo"
          style={{ backgroundColor: "transparent" }}
        />
      </Link>
    </div>
  );
};

export default MenuLogo;
