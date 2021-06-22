import React from "react";
import { StyledNavbar, NavItemLink } from "./style";
const Navbar = ({ children }) => {
  const user = false;
  return (
    <StyledNavbar>
      {user ? (
        <>
          <NavItemLink to="/login">Log out</NavItemLink>
        </>
      ) : (
        <>
          <NavItemLink to="/login">Log in</NavItemLink>
          <NavItemLink to="/signup">Sign up</NavItemLink>
        </>
      )}
    </StyledNavbar>
  );
};

export default Navbar;
