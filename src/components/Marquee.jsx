import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import './Marquee.css';

const logos = [
    "Apple", "Google", "Nike", "IBM", "Sony", "Amazon", "Microsoft", "Netflix", "Tesla", "SpaceX"
];

const GITHUB_USERNAME = 'raptor7197';
const CONTRIBUTION_API = `https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`;

const normalizeContributionData = (raw = []) =>
    raw.flat().map((day) => ({
        date: day.date,
        count: day.contributionCount || 0,
    }));

const getContributionShade = (count, maxCount) => {
    if (!count) return '#2a2a2a';
    const safeMax = Math.max(maxCount, 1);
    const intensity = Math.min(count / safeMax, 1);
    const alpha = 0.25 + intensity * 0.65; // range between 0.25 and 0.9
    return `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
};

const Marquee = () => {
    const marqueeRef = useRef(null);
    const [contributions, setContributions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const el = marqueeRef.current;

        gsap.to(el, {
            xPercent: -50,
            ease: "none",
            duration: 20,
            repeat: -1
        });
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchContributions = async () => {
            try {
                const response = await fetch(CONTRIBUTION_API);
                if (!response.ok) throw new Error('Unable to reach GitHub activity service.');

                const data = await response.json();
                if (!isMounted) return;

                setContributions(normalizeContributionData(data.contributions || []));
                setError(null);
            } catch (err) {
                if (!isMounted) return;
                setError(err.message || 'Something went wrong while fetching activity.');
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchContributions();

        return () => {
            isMounted = false;
        };
    }, []);

    const weeklyBuckets = useMemo(() => {
        if (!contributions.length) return [];
        const weeks = [];
        for (let i = 0; i < contributions.length; i += 7) {
            weeks.push(contributions.slice(i, i + 7));
        }
        return weeks;
    }, [contributions]);

    const maxContribution = useMemo(
        () => contributions.reduce((max, day) => Math.max(max, day.count), 0),
        [contributions]
    );

    return (
<section className="marquee-section">

            <div className="marquee-container">
                <div className="marquee-content" ref={marqueeRef}>
                    
                    {logos.map((logo, i) => (
                        <span key={i} className="marquee-item">{logo}</span>
                    ))}
                    {logos.map((logo, i) => (
                        <span key={`dup-${i}`} className="marquee-item">{logo}</span>
                    ))}
                </div>
            </div>

            <div className="stats-container">
            <div className="stat-item">
                    <h3>500+</h3>
                    <p>CUPS OF COFFEES DRANK</p>
                </div>
                <div className="stat-item">
                    <h3>1.7K+</h3>
                    <p>CODE COMMITS</p>
                </div>
                <div className="stat-item">
                    <h3>10M+</h3>
                    <p>AI TOKENS USED</p>
                </div>
                
            </div>

            <div className="github-section">
                <h4>PERSONAL GITHUB ACTIVITY</h4>
                <p className="github-subtitle">(Work commits are hiding in another dimension)</p>
                <div className="github-grid">
                    {isLoading && <div className="github-status">Fetching commits...</div>}

                    {error && !isLoading && (
                        <div className="github-status github-error">{error}</div>
                    )}

                    {!isLoading && !error && weeklyBuckets.length > 0 && (
                        weeklyBuckets.map((week, weekIndex) => (
                            <div key={`week-${weekIndex}`} className="github-week">
                                {week.map((day) => (
                                    <div
                                        key={day.date}
                                        className="github-cell"
                                        style={{
                                            backgroundColor: getContributionShade(day.count, maxContribution),
                                        }}
                                        title={`${day.count} contributions on ${day.date}`}
                                    ></div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Marquee;
