import React from "react";
import { StyledNavbar, NavItemLink } from "./style";
const Navbar = ({ children }) => {
  return (
    <StyledNavbar>
      <NavItemLink to="/login">Log in</NavItemLink>
      <NavItemLink to="/signup">Sign up</NavItemLink>
    </StyledNavbar>
  );
};

export default Navbar;
