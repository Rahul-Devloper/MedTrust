import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import Yoda from "../../../../assets/images/logo/logo.svg";
import YodaDark from "../../../../assets/images/logo/logo-dark.svg";
import YodaRtl from "../../../../assets/images/logo/logo-rtl.svg";
import YodaRtlDark from "../../../../assets/images/logo/logo-rtl-dark.svg";

import themeConfig from "../../../../configs/themeConfig.jsx";

const MenuLogo = (props) => {
  const customize = useSelector((state) => state.customize);

  return (
    <Link
      to="/"
      className="da-header-logo da-d-flex da-align-items-end"
      onClick={props.onClose}
    >
      {customize.direction === "rtl" ? (
        customize.theme === "light" ? (
          <img className="da-logo" src={YodaRtl} alt="logo" />
        ) : (
          <img className="da-logo" src={YodaRtlDark} alt="logo" />
        )
      ) : customize.theme === "light" ? (
        <img className="da-logo" src={Yoda} alt="logo" />
      ) : (
        <img className="da-logo" src={YodaDark} alt="logo" />
      )}

      <span className="h3 d-font-weight-800 da-text-color-primary-1 da-mb-6">
        .
      </span>

      <span
        className="da-p1-body da-font-weight-500 da-text-color-black-40 da-mb-16 da-ml-4"
        style={{
          letterSpacing: -1.5,
        }}
      >
        v.{themeConfig.version}
      </span>
    </Link>
  );
};

export default MenuLogo;
