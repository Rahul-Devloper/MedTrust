import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/actions/authActions";
import { Menu, Dropdown, Col, Avatar } from "antd";
import {
  User,
  People,
  InfoSquare,
  Calendar,
  Discount,
  Logout,
} from "react-iconly";

import avatarImg from "../../../assets/images/memoji/memoji-1.png";

const HeaderUser = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logoutAction());
  };

  const menu = (
    <Menu theme={"light"}>
      <Menu.Item
        key={0}
        icon={
          <User
            set="curved"
            className="remix-icon da-vertical-align-middle da-text-color-dark-0"
            size={16}
          />
        }
        className="da-text-color-dark-0"
      >
        <Link to="/pages/profile/personel-information">Profile</Link>
      </Menu.Item>

      <Menu.Item
        key={1}
        icon={
          <People
            set="curved"
            className="remix-icon da-vertical-align-middle da-text-color-dark-0"
            size={16}
          />
        }
        className="da-text-color-dark-0"
      >
        <Link to="/apps/contact">Contact</Link>
      </Menu.Item>

      <Menu.Item
        key={2}
        icon={
          <Calendar
            set="curved"
            className="remix-icon da-vertical-align-middle da-text-color-dark-0"
            size={16}
          />
        }
        className="da-text-color-dark-0"
      >
        <Link to="/apps/calendar">Calendar</Link>
      </Menu.Item>

      <Menu.Item
        key={3}
        icon={
          <Discount
            set="curved"
            className="remix-icon da-vertical-align-middle da-text-color-dark-0"
            size={16}
          />
        }
        className="da-text-color-dark-0"
      >
        <Link to="/pages/pricing">Pricing</Link>
      </Menu.Item>

      <Menu.Item
        key={4}
        icon={
          <InfoSquare
            set="curved"
            className="remix-icon da-vertical-align-middle da-text-color-dark-0"
            size={16}
          />
        }
        className="da-text-color-dark-0"
      >
        <Link to="/pages/faq">FAQ</Link>
      </Menu.Item>

      <Menu.Item
        key={5}
        icon={
          <Logout
            set="curved"
            className="remix-icon da-vertical-align-middle da-text-color-dark-0"
            size={16}
          />
        }
        className="da-text-color-dark-0"
        onClick={handleLogout}
      >
        <a>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Col>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Col className="da-d-flex-center" onClick={(e) => e.preventDefault()}>
          <Avatar src={avatarImg} size={40} />
        </Col>
      </Dropdown>
    </Col>
  );
};

export default HeaderUser;
