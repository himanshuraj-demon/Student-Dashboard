import { NavLink } from "react-router-dom";
import { links } from "../../constants";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="mobile-nav">
      {links.slice(0, 2).map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) => (isActive ? "Mactive-link" : "")}>
          {link.icon}
        </NavLink>
      ))}
      <button onClick={() => setOpen((prev) => !prev)}>
        <TiPlus className="text-[var(--text-secondary)] " size={35}/>
      </button>
      {links.slice(2, 4).map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) => (isActive ? "Mactive-link" : "")}>
          {link.icon}
        </NavLink>
      ))}
      

      {open && (
        <div className="more-menu">
          {links.slice(4).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => (isActive ? "Mactive-link" : "") }
              onClick={() => setOpen(false)}>
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
          <NavLink
            to={"/profile"}
            className={({ isActive }) => (isActive ? "Mactive-link" : "")}>
            <FaUser size={22} className="img text-[var(--text-secondary)]" />
            <span>Profile</span>
          </NavLink>
        </div>
      )}
    </nav>
  );
}
