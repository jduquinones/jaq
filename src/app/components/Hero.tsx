// components/Hero.tsx


import React from 'react';
import { LucideIcon } from 'lucide-react'; // Importar LucideIcon para tipar los iconos

// 1. Definir la Interfaz (tipos) para los Props
interface HeroProps {
    scrollY: number;
    mousePos: { x: number; y: number };
    screenCenter: { halfWidth: number; halfHeight: number };
    isLoaded: boolean;
    heroOpacity: number;
    heroScale: number;
    heroRef: React.RefObject<HTMLDivElement | null>;
    // Los iconos de Lucide (ChevronDown, Sparkles, etc.) son componentes React/LucideIcon
    ChevronDown: LucideIcon;
    Sparkles: LucideIcon;
    ArrowRight: LucideIcon;
}

// 2. Aplicar el tipo a los props del componente
export default function Hero({ 
    scrollY, 
    mousePos, 
    screenCenter, 
    isLoaded, 
    heroOpacity, 
    heroScale, 
    heroRef, 
    ChevronDown, 
    Sparkles, 
    ArrowRight 
}: HeroProps) { // <-- ¡TIPOS APLICADOS!

    const { halfWidth, halfHeight } = screenCenter;

    const buildingStructure = (
        <div 
            className="relative" 
            style={{ 
                transform: `scale(${heroScale}) translateY(${scrollY * 0.3}px)`, 
                transition: 'transform 0.1s ease-out' 
            }}
        >
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bottom-0 bg-gradient-to-t from-green-900/20 to-green-500/10 backdrop-blur-sm"
                    style={{
                        left: `${i * 60 - 120}px`,
                        width: '50px',
                        height: `${200 + i * 40}px`,
                        
                        // Corrección Parallax: Ahora usa halfWidth/halfHeight (ya no usa 'window')
                        transform: `perspective(800px) rotateY(${(mousePos.x - halfWidth) * 0.01}deg) rotateX(${(mousePos.y - halfHeight) * 0.01}deg)`,
                        
                        transition: 'transform 0.3s ease',
                        border: '1px solid rgba(136, 164, 86, 0.3)',
                        animation: `fadeIn ${1 + i * 0.2}s ease-out both`,
                    }}
                >
                    {[...Array(8)].map((_, j) => (
                        <div
                            key={j}
                            className="absolute w-2 h-2 bg-green-400"
                            style={{
                                left: '10px',
                                top: `${j * 25 + 10}px`,
                                boxShadow: '0 0 10px rgba(136, 164, 86, 0.5)',
                                animation: `float ${2 + j * 0.3}s infinite ease-in-out`,
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );

    return (
        <section 
            id="inicio"
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ opacity: heroOpacity }}
        >
            
            <div className="absolute inset-0 flex items-center justify-center">
                {buildingStructure}
            </div>

            <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                <div 
                className="mb-6"
                style={{ animation: isLoaded ? 'fadeIn 1.5s ease-out 0.5s both' : 'none' }}>
                <span 
                    className="inline-block px-6 py-2 bg-black/50 backdrop-blur-md border border-green-500/30 rounded-full text-green-400 text-sm font-semibold"
                >
                    <Sparkles className="inline w-4 h-4 mr-2" />
                    Construyendo el Futuro
                </span>
            </div>
                <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none">
                    JAQ
                    <br />
                    <span className="text-5xl md:text-7xl text-green-400">Construcciones</span>
                </h1>
                <p className="text-xl md:text-3xl text-gray-300 mb-12 font-light max-w-3xl mx-auto">
                    Transformamos espacios en obras maestras.
                    <br />
                    <span className="text-green-400">Innovación</span> · <span className="text-green-400">Calidad</span> · <span className="text-green-400">Excelencia</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="group px-8 py-4 bg-gradient-to-r from-green-500 to-green-700 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                        Comenzar Proyecto
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                    <button className="px-8 py-4 border-2 border-green-500/30 rounded-full text-lg font-bold hover:bg-green-500/10 backdrop-blur-sm transition-all duration-300">
                        Ver Portafolio
                    </button>
                </div>
            </div>

            <div 
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
                style={{ opacity: heroOpacity }}
            >
                <ChevronDown className="w-8 h-8 text-green-400" />
            </div>
        </section>
    );
}