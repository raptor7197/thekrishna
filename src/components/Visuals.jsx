import React, { useMemo } from 'react';
import AsciiMap from './AsciiMap';
import './Visuals.css';

const FLOATING_IMAGE_POOL = ['/1.jpg', '/1.jpg', '/1.jpg', '/1.jpg', '/1.jpg'];

const Visuals = () => {
    const floatingImages = useMemo(() => {
        return Array.from({ length: 5 }, (_, idx) => {
            const src = FLOATING_IMAGE_POOL[idx % FLOATING_IMAGE_POOL.length];
            return {
                id: `floating-${idx}`,
                src,
                top: `${Math.random() * 70 + 10}%`,
                left: `${Math.random() * 70 + 10}%`,
                size: `${140 + Math.random() * 80}px`,
                delay: `${Math.random() * 4}s`,
                duration: `${12 + Math.random() * 6}s`,
                rotation: `${Math.random() * 20 - 10}deg`,
            };
        });
    }, []);

    return (
        <section className="visuals">
            <div className="visuals-text">
                <h2>a small sneak-peek</h2>
                <p>i love sunsets and beaches </p>
            </div>

            <div className="visuals-canvas">
                <AsciiMap />
            </div>

            <div className="floating-images">
                {floatingImages.map((img) => (
                    <img
                        key={img.id}
                        className="floating-img"
                        src={img.src}
                        alt="floating memory"
                        style={{
                            top: img.top,
                            left: img.left,
                            width: img.size,
                            height: img.size,
                            animationDuration: img.duration,
                            animationDelay: img.delay,
                            '--float-rotation': img.rotation,
                        }}
                    />
                ))}
            </div>
        </section>
    );
};   

export default Visuals;
