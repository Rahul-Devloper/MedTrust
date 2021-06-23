import React, { useState, useEffect } from "react";
import { StyledNavbar, NavItemLink, NavUserImg } from "./style";
import defaultUserImg from "../../assets/defaultUser.jpg";
import { useSelector } from "react-redux";

const Navbar = () => {
  return (
    <StyledNavbar>
      {/* {user ? (
        <>
          <NavUserImg src={defaultUserImg} />
          <NavItemLink to="/login">Log out</NavItemLink>
        </>
      ) : ( */}
      <>
        <NavItemLink to="/login">Log in</NavItemLink>
        <NavItemLink to="/signup">Sign up</NavItemLink>
      </>
      {/* )} */}
    </StyledNavbar>
  );
};

export default Navbar;
