import React from "react";
import { FootLeft } from "./assets/FootLeft";
import { FootMid } from "./assets/FootMid";
import { FootRight } from "./assets/FootRight";
import "./style.css";
import SocilaMedia from "./assets/SocilaMedia";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="foot-col">
        <FootLeft />
        <FootMid />
        <FootRight />
        <SocilaMedia/>
      </div>
    </footer>
  );
};
