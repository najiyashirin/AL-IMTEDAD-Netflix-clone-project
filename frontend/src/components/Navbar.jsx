import React, { useEffect, useState } from "react";
import "../styles/navbar.css";

function Navbar({ setActivePage }) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const handleClick = (page) => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${show ? "navbar-show" : "navbar-hide"}`}>
      <div className="navbar-left">
        <img src="/netflixlogo.svg" alt="Netflix Logo" className="logo-img" />
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fa-solid fa-bars"></i>
      </button>

      <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <div className="navbar-right">
          <button title="Profile">
            <i className="fa-solid fa-user"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;