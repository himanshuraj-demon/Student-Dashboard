import React from "react";
import { NavLink } from "react-router-dom";
import { links } from "../../constants";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src="./images/default.jpg" alt="nono" />
          <span>SmartTrack</span>
        </div>

        <div className="navlinks">
          <ul>
            {links.map((link) => (
              <li key={link.key}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <span>{link.icon}</span>
                  <span className="textspan">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="profile">
          <NavLink to={"/profile"} className={({ isActive }) => (isActive ? "active-link" : "")}>
            <img src="./images/default.jpg" alt="nono" />
            <span>SmartTrack</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
