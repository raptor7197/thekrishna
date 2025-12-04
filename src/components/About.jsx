import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const projectRef = useRef(null);
    const [latestCommit, setLatestCommit] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestCommit = async () => {
            try {
                const response = await fetch('https://api.github.com/users/raptor7197/events/public');
                const data = await response.json();

                const pushEvent = data.find(event => event.type === 'PushEvent');

                if (pushEvent) {
                    setLatestCommit({
                        repo: pushEvent.repo.name,
                        message: pushEvent.payload.commits[0].message,
                        date: new Date(pushEvent.created_at).toLocaleDateString(),
                        url: `https://github.com/${pushEvent.repo.name}/commit/${pushEvent.payload.commits[0].sha}`
                    });
                }
            } catch (error) {
                console.error('Error fetching GitHub commits:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestCommit();

        const split = new SplitType(headingRef.current, { types: 'chars' });

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

        // Animate Project Section
        gsap.fromTo(projectRef.current,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: projectRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

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
                        I specialize in the React ecosystem, leveraging tools like
                        <span className="tech-badge">React</span>,
                        <span className="tech-badge">Next</span>,
                        <span className="tech-badge">Tailwind CSS</span>, and
                        <span className="tech-badge">GSAP</span> to bring ideas to life.
                        Every project is an opportunity to push boundaries and craft experiences
                        that leave a lasting impression.
                    </p>
                </div>

                <div className="presently-working" ref={projectRef}>
                    <h3 className="sub-heading">Presently working on</h3>
                    <div className="project-list-item">
                        <div className="project-details">
                            {loading ? (
                                <p>Loading latest activity...</p>
                            ) : latestCommit ? (
                                <>
                                    <h4>{latestCommit.repo}</h4>
                                    <p className="commit-message">
                                        {latestCommit.message}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h4>Agentic Coding Assistant</h4>
                                    <p>
                                        Building an advanced AI-powered coding assistant that helps developers
                                        write better code faster. Focusing on agentic behaviors and deep
                                        codebase understanding.
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="project-meta">
                            <span className="year-badge">
                                {latestCommit ? latestCommit.date : '2025'}
                            </span>
                            <a
                                href={latestCommit ? latestCommit.url : "#"}
                                className="project-link"
                                aria-label="View Project"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ArrowOutwardIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
