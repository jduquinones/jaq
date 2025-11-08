// components/AnimatedBackground.tsx
"use client";

import React, { useState, useEffect } from 'react';

// 1. Definición del Tipo para las Partículas
interface Particle {
    key: number;
    width: number;
    left: number;
    top: number;
    animationDuration: number;
    animationDelay: number;
}

// 2. Definición del Tipo para los Props
interface AnimatedBackgroundProps {
    mousePos: { x: number; y: number };
}

export default function AnimatedBackground({ mousePos }: AnimatedBackgroundProps) {
    
    // 3. Estado tipado para almacenar los datos de las partículas
    const [particleData, setParticleData] = useState<Particle[]>([]);
    
    // 4. useEffect para generar los datos aleatorios SOLAMENTE en el cliente (al montar)
    useEffect(() => {
        const generateParticleData = (): Particle[] => {
            const data: Particle[] = [];
            const NUMBER_OF_PARTICLES = 50;

            for (let i = 0; i < NUMBER_OF_PARTICLES; i++) {
                data.push({
                    key: i,
                    // Usamos Math.random() aquí, asegurando que solo se ejecute en el cliente
                    width: Math.random() * 3 + 1,
                    left: Math.random() * 100,
                    top: Math.random() * 100,
                    animationDuration: Math.random() * 10 + 10,
                    animationDelay: Math.random() * 5,
                });
            }
            return data;
        };

        setParticleData(generateParticleData());
    }, []); // El array vacío asegura que solo se ejecute una vez al montar

    return (
        <div className="fixed inset-0 z-0">
            {/* Rayo de luz siguiendo el ratón */}
            <div 
                className="absolute inset-0 opacity-30"
                style={{
                    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(136, 164, 86, 0.3) 0%, transparent 50%)`,
                    transition: 'background 0.3s ease',
                }}
            />
            
            {/* Partículas flotantes */}
            <div className="absolute inset-0 opacity-20">
                {/* Mapeamos sobre el estado 'particleData' que es estable */}
                {particleData.map((p) => (
                    <div
                        key={p.key}
                        className="absolute bg-green-500 rounded-full"
                        style={{
                            // Usamos los valores estables generados en useEffect
                            width: p.width + 'px',
                            height: p.width + 'px', // Asumiendo círculos (mismo ancho y alto)
                            left: p.left + '%',
                            top: p.top + '%',
                            animation: `float ${p.animationDuration}s infinite ease-in-out`,
                            animationDelay: p.animationDelay + 's',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}