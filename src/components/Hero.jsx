import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import GlitchText from './GlitchText';
import HeroParticles from './HeroParticles';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const [showGlitch, setShowGlitch] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 2,
                ease: 'power4.out',
                delay: 0.8,
                onComplete: () => setShowGlitch(true)
            }
        )
            .fromTo(subtitleRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' },
                "-=1"
            );
    }, []);

    return (
        <section className="hero" ref={heroRef}>
            <HeroParticles />
            <div className="hero-content">
                <h1 className="hero-title" ref={titleRef}>
                    <span>{showGlitch ? <GlitchText text="CREATIVE" /> : 'CREATIVE'}</span>
                    <span>{showGlitch ? <GlitchText text="DEVELOPER" /> : 'DEVELOPER'}</span>
                </h1>
                <p className="hero-subtitle" ref={subtitleRef}>
                    Specializing in frontend development and digital experiences.
                    <br />
                    Creating immersive and visually captivating solutions.
                </p>
            </div>
        </section>
    );
};

export default Hero;
