import React, { useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ExperienceStack.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: "Research Intern",
    company: "Aegion Dynamic Solutions",
    period: "Jan 2026 - Present",
    description:
      "Working on building a Custom Domain Specific language for Internal Use using ANTLR and Go.",
    tech: ["ANTLR", "Go", "Compilers", "React"],
  },
  {
    id: 2,
    role: "Projects Lead",
    company: "IEEE VIT Vellore",
    period: "Dec 2025 - Present",
    description:
      "Leading technical projects and mentoring junior members. Previously Senior Core and Junior Core member.",
    tech: ["AWS", "React.js", "Figma", "Project Management"],
  },
  {
    id: 3,
    role: "Software Developer Intern",
    company: "AIAT India",
    period: "Jul 2025 - Nov 2025",
    description:
      "Developed responsive web applications and managed projects using React, AWS, and Git.",
    tech: ["React.js", "Tailwind CSS", "AWS", "Git"],
  },
  {
    id: 4,
    role: "Associate Member",
    company: "The Quantumplators",
    period: "Feb 2025 - Sep 2025",
    description:
      "Researched Quantum Computing concepts and contributed to community knowledge sharing.",
    tech: ["Quantum Computing", "Research"],
  },
  {
    id: 5,
    role: "Web & Creatives Volunteer",
    company: "Intl. Test Conference",
    period: "Feb 2025 - Jul 2025",
    description:
      "Assisted with web development and creative assets for the conference.",
    tech: ["Web Development", "Design"],
  },
];

const ExperienceStack = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    try {
      const ctx = gsap.context(() => {
        const cards = cardsRef.current;
        const spacing = 60;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 10%",
            end: "+=300%",
            pin: true,
            scrub: 2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, i) => {
          const finalPos = i * spacing;

          gsap.set(card, {
            y: window.innerHeight + 100,
            opacity: 1,
            scale: 1,
            zIndex: i + 1,
          });

          tl.to(
            card,
            {
              y: finalPos,
              duration: 1,
              ease: "power2.out",
            },
            i * 0.5,
          );

          if (i < cards.length - 1) {
            tl.to(
              card,
              {
                scale: 0.95,
                opacity: 0.8,
                y: finalPos + 10,
                duration: 1,
                ease: "power2.out",
              },
              (i + 1) * 0.5,
            );
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    } catch (error) {
      console.error("ExperienceStack GSAP error:", error);
      gsap.set(cardsRef.current, { clearProps: "all" });
      cardsRef.current.forEach((card, i) => {
        gsap.set(card, { y: i * 60, scale: 1, opacity: 1, zIndex: i + 1 });
      });
    }
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section className="experience-stack-section" ref={sectionRef}>
      <div className="experience-stack-container" ref={containerRef}>
        <div className="stack-header">
          <h2>Work Experience</h2>
          <p>My professional journey and milestones</p>
        </div>

        <div className="experience-list">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="stack-card"
              ref={addToRefs}
              onClick={() =>
                navigate("/work-experience", { state: { id: exp.id } })
              }
              style={{ cursor: "pointer" }}
            >
              <div className="card-header">
                <div className="card-title">
                  <h3>{exp.role}</h3>
                  <span className="card-company">{exp.company}</span>
                </div>
                <span className="card-year">{exp.period}</span>
              </div>
              <div className="card-body">
                <p>{exp.description}</p>
              </div>
              <div className="tech-stack">
                {exp.tech.map((t, idx) => (
                  <span key={idx} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceStack;
