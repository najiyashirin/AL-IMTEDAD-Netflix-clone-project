import React, { useEffect, useState } from "react";
import "../styles/navbar.css";

function Navbar({ setActivePage }) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) setShow(false);
    else setShow(true);
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const handleClick = (page) => {
    if (setActivePage) setActivePage(page);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${show ? "navbar-show" : "navbar-hide"}`}>
      {/* Left Side - Logo */}
      <div className="navbar-left">
        <img src="/netflixlogo.svg" alt="Netflix Logo" className="logo-img" />
      </div>

      {/* Hamburger (Mobile) */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Middle Links (added) */}
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <a href="#" onClick={() => handleClick("Home")}>Home</a>
        <a href="#" onClick={() => handleClick("TV Shows")}>TV Shows</a>
        <a href="#" onClick={() => handleClick("Movies")}>Movies</a>
        <a href="#" onClick={() => handleClick("New & Popular")}>New & Popular</a>
        <a href="#" onClick={() => handleClick("My List")}>My List</a>
        <a href="#" onClick={() => handleClick("Languages")}>Browse by Languages</a>
      </div>

      {/* Right Side - Keep original icons */}
      <div className="navbar-right">
        <button title="Profile">
          <i className="fa-solid fa-user"></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
