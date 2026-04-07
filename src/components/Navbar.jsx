import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Navbar.css";

const Navbar = () => {
  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 },
    );
  }, []);

  const handleNavClick = (e, selector) => {
    e.preventDefault();
    setIsMenuOpen(false);
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar" ref={navRef}>
      <a href="/">
        <div className="logo">Vamsi Krishna</div>
      </a>

      <div className="status-indicator">
        <span className="status-dot"></span>
        <span className="status-text">Chasing Dreams</span>
      </div>

      <div className="mobile-menu-icon" onClick={toggleMenu}>
        <div className={`menu-bar ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`menu-bar ${isMenuOpen ? "open" : ""}`}></div>
      </div>

      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <a href="/#about" onClick={() => setIsMenuOpen(false)}>
            About
          </a>
        </li>
        <li>
          <a href="/#work" onClick={() => setIsMenuOpen(false)}>
            Projects
          </a>
        </li>
        <li>
          <a href="/#skills" onClick={() => setIsMenuOpen(false)}>
            Skills
          </a>
        </li>
        <li>
          <a
            href="/setup"
            style={{ color: "#0cf72bff" }}
            onClick={() => setIsMenuOpen(false)}
          >
            my setup
          </a>
        </li>
        <li>
          <a
            href="/work-experience"
            style={{ color: "#00aeffff" }}
            onClick={() => setIsMenuOpen(false)}
          >
            work
          </a>
        </li>
        <li>
          <a
            href="./Vamsi Krishna Resume.pdf"
            download
            onClick={() => setIsMenuOpen(false)}
          >
            resume
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
