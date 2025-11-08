// JAQWebsite.js
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
    Building2, Home, Ruler, Award, Phone, Mail, MapPin, 
    ArrowRight, ChevronDown, Sparkles, Zap, Shield 
} from 'lucide-react';

// Importación de componentes
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import CTASection from './components/CTASection';


export default function JAQWebsite() {
    // Lógica central de estado
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);
    // Para guardar las dimensiones del centro de la pantalla (usado en Hero Parallax)
    const [screenCenter, setScreenCenter] = useState({ halfWidth: 0, halfHeight: 0 });
    
    const heroRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0); // Mantenemos scrollY solo para la Navbar/Hero Parallax

    useEffect(() => {
        setIsLoaded(true);

        // 💡 LÓGICA DE MANEJO DE SCROLL/MOUSE
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        // 💡 LÓGICA DE MANEJO DEL TAMAÑO DE LA VENTANA (Para el cálculo de Parallax en Hero)
        const updateCenter = () => {
            if (typeof window !== 'undefined') {
                 setScreenCenter({
                    halfWidth: window.innerWidth / 2,
                    halfHeight: window.innerHeight / 2,
                });
            }
        };

        // Inicialización y Listeners
        if (typeof window !== 'undefined') {
            updateCenter();
            window.addEventListener('resize', updateCenter);
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('mousemove', handleMouseMove);
        }
        
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', updateCenter);
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    // Cálculos de animación basados en scroll (manteniendo la lógica del Hero)
    const heroOpacity = Math.max(1 - scrollY / 600, 0);
    const heroScale = Math.max(1 - scrollY / 2000, 0.8);
    
    // Estilos Globales (Necesarios para las animaciones CSS en Hero/Background)
    const globalStyles = `
        @keyframes float { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-20px) translateX(10px); } }
        @keyframes slideIn { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glitch { 0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } }
    `;

    return (
        // 💡 Aplicamos la estructura compacta para evitar errores de Hydration Mismatch de espacios en blanco
        <div className="bg-black text-white overflow-x-hidden">
            <style jsx global>{globalStyles}</style>

            <AnimatedBackground mousePos={mousePos} />            
            <Navbar scrollY={scrollY} isLoaded={isLoaded} />
            <Hero 
                scrollY={scrollY} 
                mousePos={mousePos} 
                screenCenter={screenCenter} 
                isLoaded={isLoaded} 
                heroOpacity={heroOpacity} 
                heroScale={heroScale} 
                heroRef={heroRef} 
                ChevronDown={ChevronDown} 
                Sparkles={Sparkles} 
                ArrowRight={ArrowRight}
            />             
            <ServicesSection /> 
            <StatsSection /> 
            <ProjectsSection /> 
            <CTASection /> 

        </div>
    );
}