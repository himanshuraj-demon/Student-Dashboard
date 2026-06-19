import React from "react";
import { NavLink } from "react-router-dom";
import { links } from "../../constants";
import { FaUser } from "react-icons/fa";
const Navbar:React.FC = () => {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src="./images/logo.svg" alt="nono" />
          <img src="./images/namelogo.png" alt="nono" className="spanlogo"/>
        
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
          <NavLink
            to={"/profile"}
            className={({ isActive }) => (isActive ? "active-link" : "")}>
            <FaUser size={22} className="img text-[var(--text-secondary)]" />
            <span>SmartTrack</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
