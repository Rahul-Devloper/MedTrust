import React, { useState, useEffect } from "react";
import { Row, Col, Drawer, Button, Dropdown, Menu } from "antd";
import { RiMore2Line, RiMenuFill, RiCloseFill } from "react-icons/ri";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingToRedirect } from "../components";
import VerticalLayout from "../layouts/VerticalLayout";
import { currentUser } from "../api/user";
import MenuProfile from "../components/Profile/menu";
import Breadcrumbs from "../layouts/components/content/breadcrumbs";

const ProfileRoute = ({ children, ...restProps }) => {
  const { user } = useSelector((state) => state.auth);

  const [ok, setOk] = useState(false);
  const [visible, setVisible] = useState(false);

  // Check if current user is user
  useEffect(() => {
    if (user) {
      currentUser()
        .then(() => {
          setOk(true);
        })
        .catch((error) => {
          setOk(false);
          console.log("USER_ROUTE_ERROR", error);
        });
    }
  }, [user]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const rateMenu = (
    <Menu>
      <Menu.Item key="0">Change Avatar</Menu.Item>
    </Menu>
  );

  const moreBtn = () => {
    return (
      <Dropdown overlay={rateMenu} placement="bottomLeft">
        <Button
          type="text"
          icon={
            <RiMore2Line
              className="da-text-color-black-100 da-text-color-dark-0"
              size={24}
            />
          }
        ></Button>
      </Dropdown>
    );
  };

  return (
    <>
      {ok && user !== undefined ? (
        <VerticalLayout>
          <Row gutter={[32, 32]} className="da-mb-32">
            <Drawer
              title={moreBtn()}
              className="da-profile-mobile-menu"
              placement="left"
              closable={true}
              onClose={onClose}
              visible={visible}
              closeIcon={
                <RiCloseFill
                  className="remix-icon da-text-color-black-80"
                  size={24}
                />
              }
            >
              <MenuProfile
                onCloseDrawer={onClose}
                moreBtnCheck="none"
                footer="none"
              />
            </Drawer>

            <Col span={24}>
              <Row gutter={[32, 32]} justify="space-between">
                <Breadcrumbs
                  rootName="Profile"
                  rootLink={`/profile/information`}
                  breadCrumbParent="details"
                />
              </Row>
            </Col>

            <Col span={24}>
              <Row className="da-profile-mobile-menu-btn da-bg-color-black-0 da-bg-color-dark-100 da-border-radius da-py-12 da-px-sm-8 da-px-24 da-mb-16">
                <Button
                  className="da-p-0"
                  type="text"
                  icon={
                    <RiMenuFill
                      size={24}
                      className="remix-icon da-text-color-black-80 da-text-color-dark-30"
                    />
                  }
                  onClick={showDrawer}
                ></Button>
              </Row>

              <Row className="da-bg-color-black-0 da-bg-color-dark-100 da-border-radius da-pr-sm-16 da-pr-32">
                <MenuProfile moreBtn={moreBtn} />

                <Col
                  flex="1 1"
                  className="da-pl-sm-16 da-pl-32 da-py-sm-24 da-py-32 da-pb-24 da-overflow-hidden"
                >
                  {/* Children */}
                  <Route {...restProps} render={children} />
                </Col>
              </Row>
            </Col>
          </Row>
        </VerticalLayout>
      ) : (
        <LoadingToRedirect />
      )}
    </>
  );
};

export default ProfileRoute;
