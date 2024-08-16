import { Col } from "antd";
import { Document, Plus } from "react-iconly";

const HeaderText = () => {
  return (
    <Col xl={16} lg={14} className='hp-header-left-text hp-d-flex-center'>
      {/* <Document
        set='curved'
        size='large'
        className='remix-icon hp-update-icon hp-text-color-primary-1 hp-text-color-dark-0 hp-p-4 hp-bg-color-primary-4 hp-bg-color-dark-70'
      /> */}

      {/* <p className="hp-header-left-text-item hp-input-label hp-text-color-black-100 hp-text-color-dark-0 hp-ml-16 hp-mb-0">
        We are shipping new features every week 🎉 &nbsp;
        <span className="hp-font-weight-500 hp-text-color-danger-1">
          Contact us for any bugs or feature request 👉
        </span>
        <a
          href="https://www.netraga.com/contact"
          className="hp-text-color-black-80"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            // Move to the right
            marginLeft: "0.5rem",
          }}
        >
          <Plus set="curved" className="remix-icon" />
        </a>
      </p> */}
    </Col>
  )
};

export default HeaderText;
