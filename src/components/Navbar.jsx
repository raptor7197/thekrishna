import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Navbar.css';

const Navbar = () => {
    const navRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
        );
    }, []);

    return (
        <nav className="navbar" ref={navRef}>
            <div className="logo">Vamsi Krishna</div>
            <div className="status-indicator">
                <span className="dot pulsating-dot"></span> Available to work
            </div>

            <ul className="nav-links">
                <li>
                    <a href="#about" onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
                    }}>About</a>
                </li>
                <li>
                    <a href="#skills" onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
                    }}>Skills</a>
                </li>
                <li>
                    <a href="#work" onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#work').scrollIntoView({ behavior: 'smooth' });
                    }}>Work</a>
                </li>
                
                <li>
                    <a href="#contact" onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                    }}>get in touch</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
