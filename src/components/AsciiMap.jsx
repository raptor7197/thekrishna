import React, { useEffect, useRef } from 'react';

const AsciiMap = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let mouse = { x: -1000, y: -1000 };

        // World Map ASCII representation
        const mapString = `
                                                                                
              .:::::..                                    .::::.                
          .::::::::::::.                              .:::::::::.              
        .:::::::::::::::.                          .::::::::::::::             
       .::::::::::::::::.                        .:::::::::::::::::.           
      .::::::::..::::::::.                     .:::::::::::::::::::.           
     .::::::..    .:::::::.                  .:::::::::::..::::::::.           
    .::::::..       .:::::.                 .::::::::::..   .:::::::.          
    .:::::..         .:::::                .::::::::::..     .:::::::.         
    .::::..           .::::.              .::::::::::..       .:::::::.        
    .:::..             .:::.             .::::::::::..         .:::::::.       
     :::..              .:::.           .::::::::::..           .:::::::.      
     .::..               .:::.         .::::::::::..             .:::::::.     
      ::..                .:::.       .::::::::::..               .:::::::.    
      .:.                  .:::.     .::::::::::..                 .:::::::.   
       ..                   .:::.   .::::::::::..                   .:::::::.  
                             .:::. .::::::::::..                     .::::::. 
                              .:::.::::::::::..                       .::::::. 
                               .::::::::::::..                         .:::::.
                                .::::::::::..                           .::::.
                                 .:::::::::..                            .:::.
                                  .:::::::..                              .::
                                   ..:::::..                               ..
    `;

        // Convert string to grid of points
        const rows = mapString.split('\n').filter(r => r.trim().length > 0);
        const points = [];
        const fontSize = 14;
        const spacing = 10;

        // Initialize points
        const initPoints = () => {
            points.length = 0;
            const offsetX = (canvas.width - (rows[0].length * spacing)) / 2;
            const offsetY = (canvas.height - (rows.length * spacing)) / 2;

            rows.forEach((row, y) => {
                row.split('').forEach((char, x) => {
                    if (char.trim() !== '') {
                        points.push({
                            x: offsetX + x * spacing,
                            y: offsetY + y * spacing,
                            originX: offsetX + x * spacing,
                            originY: offsetY + y * spacing,
                            char: char,
                            vx: 0,
                            vy: 0
                        });
                    }
                });
            });
        };

        const handleResize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initPoints();
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${fontSize}px monospace`;
            ctx.fillStyle = '#3b82f6';

            points.forEach(point => {
                // Repulsion logic
                const dx = mouse.x - point.x;
                const dy = mouse.y - point.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = 80; // Reduced from 100
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * 2; // Reduced from 5
                const directionY = forceDirectionY * force * 2; // Reduced from 5

                if (distance < maxDistance) {
                    point.vx -= directionX;
                    point.vy -= directionY;
                }

                // Return to origin
                const homeDx = point.originX - point.x;
                const homeDy = point.originY - point.y;

                point.vx += homeDx * 0.08; // Increased from 0.05 for faster return
                point.vy += homeDy * 0.08;

                // Damping - increased for less movement
                point.vx *= 0.85; // Increased from 0.9
                point.vy *= 0.85;

                point.x += point.vx;
                point.y += point.vy;

                ctx.fillText(point.char, point.x, point.y);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);

        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="ascii-canvas" />;
};

export default AsciiMap;
