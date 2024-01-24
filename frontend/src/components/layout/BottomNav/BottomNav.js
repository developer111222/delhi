import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import { BsLayers, BsCartDash } from "react-icons/bs";
import "./BottomNav.css";
import { NavLink } from "react-router-dom";
import { MobNav } from "../header/assets/MobNav";
import { NavList } from "../header/assets/NavList";

function BottomNav() {
  const [activeTab, setActiveTab] = useState(false);

  const nav = [
    { link: "/", icon: <IoHomeOutline /> },
    { link: "/account", icon: <FaRegUser /> },
    { link: "/order/me", icon: <BsLayers /> },
    { link: "/cart", icon: <BsCartDash /> },
  ];
  return (
    <>
      <div className="mob-navigate">
        <div className="mob-icon">
          {nav.map((item, i) => (
            <NavLink
              key={i}
              onClick={() => {
                setActiveTab(activeTab);
              }}
              className={activeTab ? null : "bottom-active"}
              to={item.link}
            >
              {item.icon}
            </NavLink>
          ))}
     
        </div>
      </div>
    </>
  );
}

export default BottomNav;
