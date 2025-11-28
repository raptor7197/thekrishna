import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: 1,
        title: "LLM Chat Interface",
        category: "LM",
        color: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)"
    },
    {
        id: 2,
        title: "Portfolio V2",
        category: "Frontend",
        color: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"
    },
    {
        id: 3,
        title: "CI/CD Pipeline Dashboard",
        category: "DevOps",
        color: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)"
    },
    {
        id: 4,
        title: "Fine-tuned Llama 3",
        category: "LM",
        color: "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)"
    },
    {
        id: 5,
        title: "E-Commerce Storefront",
        category: "Frontend",
        color: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)"
    },
    {
        id: 6,
        title: "Kubernetes Cluster Manager",
        category: "DevOps",
        color: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)"
    }
];

const categories = ["All", "LM", "Frontend", "DevOps"];

const Projects = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? projectsData
        : projectsData.filter(project => project.category === activeCategory);

    useEffect(() => {
        // Animate cards when category changes
        if (gridRef.current) {
            const cards = gridRef.current.children;
            gsap.fromTo(cards,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out'
                }
            );
        }
    }, [activeCategory]);

    return (
        <section className="projects" id="work" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title">Selected Work</h2>

                <div className="projects-layout">
                    <div className="projects-sidebar">
                        <div className="category-tabs">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="projects-grid" ref={gridRef}>
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="project-card">
                                <div
                                    className="project-image"
                                    style={{ background: project.color }}
                                ></div>
                                <div className="project-info">
                                    <h3>{project.title}</h3>
                                    <p>{project.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
