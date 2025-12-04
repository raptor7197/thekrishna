import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Navbar.css';

const Navbar = () => {
    const navRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
        );
    }, []);

    const handleNavClick = (e, selector) => {
        e.preventDefault();
        setIsMenuOpen(false);
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar" ref={navRef}>
            <a href="/">
                <div className="logo">Vamsi Krishna</div>
            </a>
            
            <div className="mobile-menu-icon" onClick={toggleMenu}>
                <div className={`menu-bar ${isMenuOpen ? 'open' : ''}`}></div>
                <div className={`menu-bar ${isMenuOpen ? 'open' : ''}`}></div>
            </div>

            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <li>
                    <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
                </li>
                <li>
                    <a href="#work" onClick={(e) => handleNavClick(e, '#work')}>Work</a>
                </li>
                <li>
                    <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a>
                </li>
                <li>
                    <a href="/setup" >my setup</a>
                </li>
                <li>
                    <a href="./Vamsi Krishna Resume.pdf" download>resume</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
