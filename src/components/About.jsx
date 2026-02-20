import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const projectRef = useRef(null);
  const [latestCommit, setLatestCommit] = useState(null);
  const [pullRequests, setPullRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithubActivity = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/raptor7197/events/public",
        );
        const data = await response.json();
        const events = Array.isArray(data) ? data : [];

        const pullRequestEvents = events.filter(
          (event) =>
            event.type === "PullRequestEvent" &&
            event.payload?.action === "opened",
        );

        const recentPullRequests = pullRequestEvents
          .map((event) => {
            const pr = event.payload?.pull_request;
            if (!pr) return null;

            return {
              id: pr.id,
              title: pr.title,
              repo: event.repo.name,
              url: pr.html_url,
              createdAt: pr.created_at,
            };
          })
          .filter(Boolean)
          .slice(0, 3);

        setPullRequests(recentPullRequests);

        const pushEvent = events.find((event) => event.type === "PushEvent");

        if (pushEvent) {
          const repoName = pushEvent.repo.name;
          let commitMessage = "";
          let commitUrl = "";
          const commitDate = new Date(
            pushEvent.created_at,
          ).toLocaleDateString();

          if (pushEvent.payload.commits?.length > 0) {
            const [commit] = pushEvent.payload.commits;
            commitMessage = commit.message;
            commitUrl = `https://github.com/${repoName}/commit/${commit.sha}`;
          } else if (pushEvent.payload.head) {
            try {
              const commitResponse = await fetch(
                `https://api.github.com/repos/${repoName}/commits/${pushEvent.payload.head}`,
              );
              const commitData = await commitResponse.json();
              commitMessage = commitData.commit.message;
              commitUrl = commitData.html_url;
            } catch (err) {
              console.error("Error fetching specific commit:", err);
              commitMessage = "Updated repository";
              commitUrl = `https://github.com/${repoName}`;
            }
          }

          setLatestCommit({
            repo: repoName,
            message: commitMessage,
            date: commitDate,
            url: commitUrl,
          });
        }
      } catch (error) {
        console.error("Error fetching GitHub activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubActivity();

    const split = new SplitType(headingRef.current, { types: "chars" });

    gsap.fromTo(
      split.chars,
      {
        opacity: 0,
        y: 100,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );

    const paragraphs = textRef.current.querySelectorAll("p");

    paragraphs.forEach((p, index) => {
      gsap.fromTo(
        p,
        {
          opacity: 0,
          x: 500,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    gsap.fromTo(
      projectRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      split.revert();
    };
  }, []);

  const formatHoursAgo = (timestamp) => {
    if (!timestamp) return "";

    const diffHours =
      (Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60);

    const roundedHalf = Math.max(Math.round(diffHours / 0.5) * 0.5, 0.5);

    const formatted = Number.isInteger(roundedHalf)
      ? roundedHalf.toFixed(0)
      : roundedHalf.toFixed(1);
    const unit = formatted === "1" ? "hr" : "hrs";

    return `${formatted} ${unit} before`;
  };

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-bg-text">ABOUT</div>
      <div className="container">
        <h2 className="section-title" ref={headingRef}>
          About Me
        </h2>
        <div className="about-content" ref={textRef}>
          <p>
            I&apos;m a frontend developer who enjoys designing and building
            clean, modern web experiences. I focus on creating interfaces that
            are fast, intuitive, and visually engaging, blending functionality
            with thoughtful design.
          </p>
          <p>
            I currently work in the React ecosystem, leveraging tools like
            <span className="tech-badge">React</span>,
            <span className="tech-badge">Next.js</span>,
            <span className="tech-badge">Tailwind CSS</span>, and
            <span className="tech-badge">GSAP</span> to bring ideas to life.
            Every project is a chance to explore new interactions, refine
            details, and build experiences that feel memorable and enjoyable to
            use.
          </p>
        </div>

        <div className="presently-working" ref={projectRef}>
          <h3 className="sub-heading">what I am upto at present</h3>
          <div className="project-list-item">
            <div className="project-details">
              {loading ? (
                <p>Loading latest activity...</p>
              ) : latestCommit ? (
                <>
                  <h4>{latestCommit.repo}</h4>
                  <p className="commit-message">{latestCommit.message}</p>
                </>
              ) : (
                <>
                  <h4>Agentic Coding Assistant</h4>
                  <p>
                    Building an AI-powered coding assistant that helps
                    developers write better code faster. Focusing on agentic
                    behaviors and deep codebase understanding.
                  </p>
                </>
              )}
            </div>
            <div className="project-meta">
              <span className="year-badge">
                {latestCommit ? latestCommit.date : "2025"}
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

          <div className="pull-request-activity">
            <h3 className="sub-heading">recent pull requests</h3>
            {loading ? (
              <p>Loading pull requests...</p>
            ) : pullRequests.length > 0 ? (
              pullRequests.map((pr) => (
                <div className="project-list-item" key={pr.id}>
                  <div className="project-details">
                    <h4>{pr.title}</h4>
                    <p>{pr.repo}</p>
                  </div>
                  <div className="project-meta">
                    <span className="year-badge">
                      {formatHoursAgo(pr.createdAt)}
                    </span>
                    <a
                      href={pr.url}
                      className="project-link"
                      aria-label={`View pull request ${pr.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ArrowOutwardIcon />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>Nothing in the Inventory in the recent past :(</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
