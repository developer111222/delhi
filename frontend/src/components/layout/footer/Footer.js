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
      
      <p style={{textAlign:"center"}}>Copyright 2023 Madarchod.All Right Reserved Website Designed And managed By<a href="https://karnalwebtech.com" target="blank" style={{color:"white"}}> Karnalwebtech.com</a></p>
    </footer>
  );
};
