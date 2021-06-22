import React, { useState, useEffect } from "react";
import { StyledNavbar, NavItemLink, NavUserImg } from "./style";
import defaultUserImg from "../../assets/defauleUser.jpg";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
  }, []);

  return (
    <StyledNavbar>
      {user ? (
        <>
          <NavUserImg
            src={user.result.imageUrl ? user.result.imageUrl : defaultUserImg}
          />
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
