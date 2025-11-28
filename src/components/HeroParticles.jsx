import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

const Particles = (props) => {
    const ref = useRef();
    const sphere = useMemo(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }), []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;

        // Mouse interaction simulation
        // In a real production app, we'd raycast the mouse to 3D space
        // For now, we'll just have them breathe/pulse
        const time = state.clock.getElapsedTime();
        ref.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.1);
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const HeroParticles = () => {
    return (
        <div className="hero-particles">
            <Canvas camera={{ position: [0, 0, 3] }}>
                <Particles />
            </Canvas>
        </div>
    );
};

export default HeroParticles;
