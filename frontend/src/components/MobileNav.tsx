import { NavLink } from "react-router-dom";
import { links } from "../../constants";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="mobile-nav">
      {links.slice(0, 4).map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) => (isActive ? "Mactive-link" : "")}>
          {link.icon}
        </NavLink>
      ))}
      <button onClick={() => setOpen((prev) => !prev)}>
        <FiMoreHorizontal className="text-[var(--text-secondary)]"/>
      </button>

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
