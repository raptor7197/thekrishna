import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DevicesIcon from '@mui/icons-material/Devices';
import { World } from './ui/globe';

import './Contact.css';

const Contact = () => {
    const containerRef = useRef(null);
    const lastPos = useRef({ x: 0, y: 0 });
    const lastTime = useRef(0);

    const globeConfig = {
        pointSize: 4,
        globeColor: "#062056",
        showAtmosphere: true,
        atmosphereColor: "#FFFFFF",
        atmosphereAltitude: 0.1,
        emissive: "#062056",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        polygonColor: "rgba(255,255,255,0.7)",
        ambientLight: "#38bdf8",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 1000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        initialPosition: { lat: 22.3193, lng: 114.1694 },
        autoRotate: true,
        autoRotateSpeed: 0.5,
    };

    const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
    const sampleArcs = [
        {
            order: 1,
            startLat: 37.7749,
            startLng: -122.4194,
            endLat: 51.5074,
            endLng: -0.1278,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 1,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 1,
            startLat: -33.8688,
            startLng: 151.2093,
            endLat: 37.7749,
            endLng: -122.4194,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 2,
            startLat: 19.076,
            startLng: 72.8777,
            endLat: 40.7128,
            endLng: -74.006,
            arcAlt: 0.5,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 3,
            startLat: 40.7128,
            startLng: -74.006,
            endLat: 51.5074,
            endLng: -0.1278,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 4,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: 48.8566,
            endLng: 2.3522,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 5,
            startLat: 48.8566,
            startLng: 2.3522,
            endLat: 52.52,
            endLng: 13.405,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 6,
            startLat: 52.52,
            startLng: 13.405,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 7,
            startLat: -8.409518,
            startLng: 115.188919,
            endLat: 55.7558,
            endLng: 37.6173,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 8,
            startLat: 55.7558,
            startLng: 37.6173,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 9,
            startLat: 35.6762,
            startLng: 139.6503,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 10,
            startLat: 22.3193,
            startLng: 114.1694,
            endLat: 51.5074,
            endLng: -0.1278,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 11,
            startLat: 51.5074,
            startLng: -0.1278,
            endLat: 40.7128,
            endLng: -74.006,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 12,
            startLat: 40.7128,
            startLng: -74.006,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 13,
            startLat: 34.0522,
            startLng: -118.2437,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.5,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 14,
            startLat: 35.6762,
            startLng: 139.6503,
            endLat: 55.7558,
            endLng: 37.6173,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
    ];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return; // Ensure container is available

        const handleMouseMove = (e) => {

            const now = Date.now();
            const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y);

            if (dist > 50 && now - lastTime.current > 50) {
                spawnImage(e.clientX, e.clientY);
                lastPos.current = { x: e.clientX, y: e.clientY };
                lastTime.current = now;
            }
        };

        const spawnImage = (x, y) => {
            const img = document.createElement('div');
            img.className = 'trail-image';

            const hue = Math.floor(Math.random() * 360);
            img.style.background = `hsl(${hue}, 70%, 60%)`;

            img.style.left = `${x}px`;
            img.style.top = `${y}px`;

            // Random rotation
            const rot = Math.random() * 40 - 20;
            img.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(0.5)`;

            container.appendChild(img);

            // Animate in
            requestAnimationFrame(() => {
                img.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(1)`;
                img.style.opacity = '1';
            });

            // Remove after delay
            setTimeout(() => {
                img.style.opacity = '0';
                setTimeout(() => img.remove(), 500);
            }, 1000);
        };

        container.addEventListener('mousemove', handleMouseMove);
        return () => container.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="contact" id="contact" ref={containerRef}>
            <div className="contact-layout">
                <div className="contact-left">
                    <div className="globe-container">
                        <World globeConfig={globeConfig} data={sampleArcs} />
                    </div>
                </div>
                <div className="contact-right relative-z">
                    <h2 className="contact-title">Reach me here </h2>
                    <a href="mailto:vamsikrishna.p.me@gmail.com" className="contact-email">
                        vamsikrishna.p.me@gmail.com
                    </a>
                    <div className="social-links">
                        <a
                            href="https://twitter.com/justvamsi7"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X (Twitter)"
                        >
                            <XIcon />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/pvamsikrishna/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <LinkedInIcon style={{ color: 'blue' }} />
                        </a>
                        <a
                            href="https://github.com/raptor7197"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                        >
                            <GitHubIcon style={{ color: 'green' }} />
                        </a>
                        <div className="setup-link-wrapper">
                            <Link to="/setup" className="setup-link" aria-label="My Setup">
                                <DevicesIcon />
                            </Link>
                            <div className="setup-popup">Want to see my daily drivers?</div>
                        </div>
                    </div>
                    <footer className="footer">
                        <p>&copy; {new Date().getFullYear()} Vamsi Krishna. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </section>
    );
};

export default Contact;
