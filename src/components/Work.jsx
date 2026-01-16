
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import './Work.css';
import Navbar from './Navbar';

const workData = [
    {
        id: 1,
        role: "Research Intern",
        company: "Aegion Dynamic Solutions",
        period: "Jan 2026 - Present",
        description: "Working on building a Custom Domain Specific language for restricted internal use cases, aiming to improve efficiency and security.",
        responsibilities: [
            "Developing Internal Tools for the company using React, Node.js, and Go.",
            "Designing and implementing a custom Domain Specific Language (DSL) using ANTLR.",
            "Researching compiler logic and optimization techniques for the DSL."
        ],
        tech: ["ANTLR", "Go", "Compilers", "React", "Node.js"]
    },
    {
        id: 2,
        role: "Projects Lead",
        company: "IEEE VIT Vellore",
        period: "May 2024 - Present",
        description: "Leading technical projects and mentoring junior members. Rose through the ranks from Junior Core to Senior Core and now Projects Lead.",
        responsibilities: [
            "Managed technical projects and oversaw deliverables as Projects Lead.",
            "Served as Senior Core member (Feb 2025 - Jan 2026), focusing on project management and AWS.",
            "Started as Junior Core member (May 2024 - Feb 2025), contributing to design and web development.",
            "Conducted workshops and knowledge sharing sessions on Web Development and Cybersecurity."
        ],
        tech: ["AWS", "React.js", "Figma", "Project Management", "Cybersecurity Tools"]
    },
    {
        id: 3,
        role: "Software Developer Intern",
        company: "AIAT India",
        period: "Jul 2025 - Nov 2025",
        description: "Worked as a Full Stack Developer intern contributing to various web application projects.",
        responsibilities: [
            "Developed responsive web applications using React.js and Tailwind CSS.",
            "Collaborated on UI/UX designs using Figma.",
            "Managed code versions and project workflows using Git and GitHub.",
            "Gained hands-on experience with AWS cloud services."
        ],
        tech: ["React.js", "Tailwind CSS", "AWS", "Git", "Figma", "JavaScript"]
    },
    {
        id: 4,
        role: "Associate Member",
        company: "The Quantumplators",
        period: "Feb 2025 - Sep 2025",
        description: "Associate member of a student research group focused on Quantum Computing.",
        responsibilities: [
            "Explored fundamental concepts of Quantum Mechanics and Quantum Computing.",
            "participated in research discussions and reading groups.",
            "Contributed to community building and knowledge dissemination."
        ],
        tech: ["Quantum Computing", "Quantum Mechanics", "Research"]
    },
    {
        id: 5,
        role: "Web & Creatives Volunteer",
        company: "International Test Conference 2025",
        period: "Feb 2025 - Jul 2025",
        description: "Volunteered for the Web and Creatives team at the International Test Conference India.",
        responsibilities: [
            "Assisted in designing and updating the conference website.",
            "Created visual assets and creatives for event promotion.",
            "Collaborated with the organizing committee to ensure smooth digital presence."
        ],
        tech: ["Web Development", "Design", "Creatives"]
    }
];

const Work = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTabId, setActiveTabId] = useState(1);

    useEffect(() => {
        // If an ID was passed via navigation, set it as active
        if (location.state && location.state.id) {
            setActiveTabId(location.state.id);
        }
    }, [location.state]);

    const activeWork = workData.find(w => w.id === activeTabId) || workData[0];

    return (
        <>
            <div className="work-page">
                <div className="work-container">
                    {/* Sidebar Tabs */}
                    <div className="work-tabs">
                        {workData.map((work) => (
                            <button
                                key={work.id}
                                className={`tab-button ${activeTabId === work.id ? 'active' : ''}`}
                                onClick={() => setActiveTabId(work.id)}
                            >
                                {work.company}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="work-content-area">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeWork.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="work-header">
                                    <div>
                                        <h2 className="work-role">{activeWork.role}</h2>
                                        <h3 className="work-company">{activeWork.company}</h3>
                                    </div>
                                    <span className="work-period">{activeWork.period}</span>
                                </div>

                                <div className="work-details">
                                    <p className="work-description">{activeWork.description}</p>

                                    <h3>Key Responsibilities</h3>
                                    <ul className="responsibilities-list">
                                        {activeWork.responsibilities.map((resp, index) => (
                                            <li key={index}>{resp}</li>
                                        ))}
                                    </ul>

                                    <div className="tech-section">
                                        <h3>Technologies</h3>
                                        <div className="tech-grid">
                                            {activeWork.tech.map((tech, index) => (
                                                <span key={index} className="tech-item">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Work;
