import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        // Split text into characters for the heading (GSAP.com style)
        const split = new SplitType(headingRef.current, { types: 'chars' });

        // Animate heading characters with stagger (GSAP intro style)
        gsap.fromTo(split.chars,
            {
                opacity: 0,
                y: 100,
                rotateX: -90
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1,
                stagger: 0.05,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate text paragraphs with slide-in effect
        const paragraphs = textRef.current.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
            gsap.fromTo(p,
                {
                    opacity: 0,
                    x: 500 // Start from right
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    delay: index * 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: p,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        return () => {
            split.revert();
        };
    }, []);

    return (
        <section className="about" id="about" ref={sectionRef}>
            <div className="about-bg-text">ABOUT</div>
            <div className="container">
                <h2 className="section-title" ref={headingRef}>About Me</h2>
                <div className="about-content" ref={textRef}>
                    <p>
                        I'm a passionate developer with a keen eye for design. I love building
                        interfaces that are not only functional but also delightful to use.
                        My journey in web development has been driven by a curiosity to
                        understand how things work and a desire to create things that
                        people love.
                    </p>
                    <p>
                        I specialize in the React ecosystem, leveraging tools like Next.js,
                        Vite, and GSAP to bring ideas to life. Every project is an opportunity
                        to push boundaries and craft experiences that leave a lasting impression.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
