import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);
const projectsData = [
    {
        "id": 1,
        "title": "LLM Chat Interface",
        "category": "LLM",
        "color": "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
        "url": "https://github.com/raptor7197/agentic-knowledge-base",
        "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop"
    },
    {
        "id": 2,
        "title": "My Devfolio",
        "category": "Frontend",
        "color": "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        "url": "https://github.com/raptor7197/god-knows",
        "imageUrl": "./devfolio.png"
    },
    {
        "id": 3,
        "title": "Scrape Krunch - Web Scraping Tool",
        "category": "LLM",
        "color": "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        "url": "https://github.com/raptor7197/scrape-krunch",
        "imageUrl": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop"
    },
    // {
    //     "id": 4,
    //     "title": "Fine-tuned Llama 3",
    //     "category": "LLM",
    //     "color": "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)",
    //     "url": "https://github.com/username/finetuned-llama",
    //     "imageUrl": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop"
    // },
    {
        "id": 5,
        "title": "Kisan Mitra - An Multilingual Farming Assistant",
        "category": "Frontend",
        "color": "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
        "url": "https://github.com/raptor7197/KisanMitra",
        "imageUrl": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop"
    },
    {
        "id": 6,
        "title": "Quantum Signers",
        "category": "CyberSecurity",
        "color": "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
        "url": "https://github.com/raptor7197/signed-with-quantum",
        "imageUrl": "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2000&auto=format&fit=crop"
    },
    {
        "id": 7,
        "title": "Shell Forge - A Basic Implementation of Unix Shell in CPP",
        "category": "Miscellaneous",
        "color": "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        "url": "https://github.com/raptor7197/shell-forge",
        "imageUrl": "https://images.unsplash.com/photo-1592609931041-40265b692757?q=80&w=2000&auto=format&fit=crop"
    },
    {
        "id": 8,
        "title": "Eco-friendly E-commerce Platform",
        "category": "Full Stack",
        "color": "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        "url": "https://github.com/raptor7197/GreenCart",
        "imageUrl": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2000&auto=format&fit=crop"
    },
    {
        "id": 9,
        "title": "Hybrid Encryption System",
        "category": "CyberSecurity",
        "color": "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        "url": "https://github.com/raptor7197/Hybrid-Encryption",
        "imageUrl": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2000&auto=format&fit=crop"
    }
];

const categories = ["All", "LLM", "Frontend", "DevOps", "CyberSecurity", "FullStack","Miscellaneous"]; ;

const Projects = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [loadedImages, setLoadedImages] = useState({});

    const filteredProjects = activeCategory === "All"
        ? projectsData
        : projectsData.filter(project => project.category === activeCategory);

    // Handle image loading
    const handleImageLoad = (id) => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
    };

    const handleImageError = (id) => {
        console.warn(`Failed to load image for project ${id}`);
        setLoadedImages(prev => ({ ...prev, [id]: false }));
    };

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
                            <a
                                key={project.id}
                                href={project.url}
                                className="project-card"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="project-image-wrapper">
                                    <div
                                        className="project-image"
                                        style={{ 
                                            background: project.color,
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {/* Dynamic Image with Fallback */}
                                        {project.imageUrl && (
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className="project-dynamic-image"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    opacity: loadedImages[project.id] ? 1 : 0,
                                                    transition: 'opacity 0.3s ease',
                                                    background: project.color // Fallback color while loading
                                                }}
                                                onLoad={() => handleImageLoad(project.id)}
                                                onError={() => handleImageError(project.id)}
                                                loading="lazy"
                                            />
                                        )}
                                        
                                        {/* Gradient Overlay */}
                                        <div className="image-overlay" 
                                             style={{
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                opacity: 0.3
                                             }}
                                        />
                                    </div>
                                </div>
                                <div className="project-info">
                                    <div className="project-header">
                                        <h3>{project.title}</h3>
                                        <span className="external-link-icon">
                                            ↗
                                        </span>
                                    </div>
                                    <p className="project-category">{project.category}</p>
                                    <div className="project-url">
                                        <span className="url-text">
                                            {project.url.replace('https://', '')}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;