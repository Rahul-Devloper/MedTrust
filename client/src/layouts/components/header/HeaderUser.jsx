import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/actions/authActions";
import { Menu, Dropdown, Col, Avatar } from "antd";
import { User, Logout, Discount } from "react-iconly";

import avatarImg from "../../../assets/images/memoji/user1.png";

const HeaderUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Handle logout
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
        <Link to="/profile/information">My Profile</Link>
      </Menu.Item>

      {/* My Subscription */}
      {user.role === "admin" && (
        <Menu.Item
          key={0}
          icon={
            <Discount
              set="curved"
              className="remix-icon da-vertical-align-middle da-text-color-dark-0"
              size={16}
            />
          }
          className="da-text-color-dark-0"
        >
          <Link to="/profile/subscription">My Subscription</Link>
        </Menu.Item>
      )}

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
        Logout
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
