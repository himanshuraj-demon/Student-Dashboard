import { NavLink } from "react-router-dom";
import { links } from "../../constants";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const NavItem = ({ link }: { link: (typeof links)[0] }) => (
    <NavLink
      key={link.path}
      to={link.path}
      className={({ isActive }) =>
        isActive ? "Mactive-link nav-item" : "nav-item"
      }
    >
      <span className="nav-icon">{link.icon}</span>
      <span className="nav-label">{link.name}</span>
    </NavLink>
  );

  return (
    <nav className="mobile-nav">
      {links.slice(0, 2).map((link) => (
        <NavItem key={link.path} link={link} />
      ))}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`plus-btn ${open ? "plus-btn--open" : ""}`}
        aria-label="More options"
      >
        <TiPlus size={25} />
      </button>

      {links.slice(2, 4).map((link) => (
        <NavItem key={link.path} link={link} />
      ))}

      {open && (
        <>
          <div className="more-menu-backdrop" onClick={() => setOpen(false)} />
          <div className="more-menu">
            {links.slice(4).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "Mactive-link" : ""
                }
                onClick={() => setOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
            <NavLink
              to={"/profile"}
              className={({ isActive }) => (isActive ? "Mactive-link" : "")}
              onClick={() => setOpen(false)}
            >
              <FaUser size={22} className="img text-[var(--text-secondary)]" />
              <span>Profile</span>
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
}