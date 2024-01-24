import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa6";
import { NavLink } from "react-router-dom";


const SocilaMedia = () => {
  return (
    <div className='social-div'>
    <div className="social-links">
    <p>Follow us on:</p>
    <div className="social-link-row">
      <NavLink to={"/"}>
        <FaFacebook />
      </NavLink>
      <NavLink to={"/"}>
        <FaInstagram />
      </NavLink>
      <NavLink to={"/"}>
        <FaTwitter />
      </NavLink>
    </div>
  </div></div>
  )
}

export default SocilaMedia