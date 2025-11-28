import React, { useRef, useEffect, useState } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

const GlitchText = ({ text, className = '' }) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef(null);
    const originalText = text;

    useEffect(() => {
        let iteration = 0;

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev =>
                originalText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= originalText.length) {
                clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(intervalRef.current);
    }, [text]);

    return (
        <span className={className}>{displayText}</span>
    );
};

export default GlitchText;
