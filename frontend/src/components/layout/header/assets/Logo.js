import React from "react";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <div className="nav-col">
      <NavLink className="logo" to={"/"}>
        <img src="/Logo.jpg" alt="logo" />
      </NavLink>
    </div>
  );
};

export default Logo;
