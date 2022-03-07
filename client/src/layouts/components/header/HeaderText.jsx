import { Col } from "antd";
import { Document, Plus } from "react-iconly";

const HeaderText = () => {
  return (
    <Col xl={16} lg={14} className="da-header-left-text da-d-flex-center">
      <Document
        set="curved"
        size="large"
        className="remix-icon da-update-icon da-text-color-primary-1 da-text-color-dark-0 da-p-4 da-bg-color-primary-4 da-bg-color-dark-70"
      />

      <p className="da-header-left-text-item da-input-label da-text-color-black-100 da-text-color-dark-0 da-ml-16 da-mb-0">
        We are shipping new features every week 🎉 &nbsp;
        <span className="da-font-weight-500 da-text-color-danger-1">
          Contact us for any bugs or feature request 👉
        </span>
        <a
          href="https://www.netraga.com/contact"
          className="da-text-color-black-80"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            // Move to the right
            marginLeft: "0.5rem",
          }}
        >
          <Plus set="curved" className="remix-icon" />
        </a>
      </p>
    </Col>
  );
};

export default HeaderText;
