import { NavLink } from "react-router-dom";
import { links } from "../../../constants";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target || typeof target.scrollTop !== "number") return;

      const currentScrollTop = target.scrollTop;
      
      // Threshold of 10px to prevent jitter
      if (Math.abs(currentScrollTop - lastScrollTop) < 10) return;

      if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
        // Scrolling down -> hide navbar & close more options menu
        setVisible(false);
        setOpen(false);
      } else {
        // Scrolling up -> show navbar
        setVisible(true);
      }
      lastScrollTop = currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  const NavItem = ({ link }: { link: (typeof links)[0] }) => (
    <NavLink
      key={link.path}
      to={link.path}
      className="nav-item">
      {({ isActive }) => (
        <>
          <span className={`nav-icon-container ${isActive ? "nav-icon-container--active" : ""}`}>
            {link.icon}
          </span>
          <span className={`nav-label ${isActive ? "nav-label--active" : ""}`}>
            {link.name}
          </span>
        </>
      )}
    </NavLink>
  );

  return (
    <nav className={`mobile-nav ${!visible ? "mobile-nav--hidden" : ""}`}>
      {links.slice(0, 2).map((link) => (
        <NavItem key={link.path} link={link} />
      ))}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`plus-btn ${open ? "plus-btn--open" : ""}`}
        aria-label="More options">
        <TiPlus size={25} />
      </button>

      {links.slice(2, 4).map((link) => (
        <NavItem key={link.path} link={link} />
      ))}

      {open && (
        <>
          <div className="more-menu-backdrop" onClick={() => setOpen(false)} />
          <div className="more-menu">
            <div className="more-menu-grid">
              {links.slice(4).map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `more-menu-item ${isActive ? "more-menu-item--active" : ""}`
                  }
                  onClick={() => setOpen(false)}>
                  <span className="more-menu-icon">{link.icon}</span>
                  <span className="more-menu-label">{link.name}</span>
                </NavLink>
              ))}
              <NavLink
                to={"/profile"}
                className={({ isActive }) =>
                  `more-menu-item ${isActive ? "more-menu-item--active" : ""}`
                }
                onClick={() => setOpen(false)}>
                <span className="more-menu-icon">
                  <FaUser size={22} className="img text-[var(--text-secondary)]" />
                </span>
                <span className="more-menu-label">Profile</span>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
