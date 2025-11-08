// components/StatsSection.tsx
"use client"; // 🛑 NECESARIO para usar Framer Motion y Hooks

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// 🛑 Importamos los íconos de Lucide que se usarán
import { LucideIcon, Building2, Award, Shield, Sparkles } from 'lucide-react'; 

// --- Componentes y Tipos Internos ---

// 1. Componente Wrapper para el Ícono (Resuelve el error de componente indefinido)
const IconWrapper: React.FC<{ Icon: LucideIcon; className: string }> = ({ Icon, className }) => {
    // Si el ícono no se resuelve por alguna razón, retornamos null de forma segura
    if (!Icon) return null; 
    return <Icon className={className} />;
};

// Interfaz para la data de las estadísticas
interface StatItem {
    icon: LucideIcon;
    number: string;
    label: string;
}

// 2. Variantes de Animación Framer Motion
const statVariants = {
    // Estado inicial (Fuera de vista o al inicio)
    hidden: { opacity: 0, y: 50 },
    // Estado visible (Cuando entra en el viewport)
    visible: (custom: number) => ({ // 'custom' es el índice para el retraso
        opacity: 1,
        y: 0,
        transition: {
            // Utilizamos el índice para crear un efecto de aparición escalonado
            delay: custom * 0.15, 
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

// --- Componente Principal ---

// 🛑 Componente autónomo: No necesita recibir props
export default function StatsSection() {
    
    // Hook para detectar si la sección está en la vista
    const [ref, inView] = useInView({
        threshold: 0.3, // Se dispara cuando el 30% de la sección es visible
        triggerOnce: false, // Se anima solo la primera vez
    });

    // 🛑 Data definida internamente
    const statsData: StatItem[] = [
        // Usamos los íconos importados
        { icon: Building2, number: '100+', label: 'Proyectos Completados' },
        { icon: Award, number: '15', label: 'Años de Experiencia' },
        { icon: Sparkles, number: '100%', label: 'Clientes Satisfechos' },
        { icon: Shield, number: '24/7', label: 'Soporte Técnico' },
    ];

    return (
        // 3. Aplicamos el ref al contenedor principal
        <section 
            id="stats" 
            className="relative bg-gradient-to-b from-black to-green-950/20" 
            ref={ref}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8">
                    {statsData.map((stat, idx) => (
                        // 4. Usamos motion.div en lugar de un div normal y estilos manuales
                        <motion.div
                            key={idx}
                            className="relative group"
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"} // Dispara la animación si está en vista
                            variants={statVariants}
                            custom={idx} // Pasamos el índice como retraso personalizado
                        >
                            {/* Capa de efecto blur */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                            
                            {/* Contenido de la tarjeta */}
                            <div className="relative p-8 bg-gradient-to-br from-green-900/30 to-transparent backdrop-blur-sm border border-green-500/20 rounded-2xl hover:border-green-500/50 transition-all duration-300">
                                
                                {/* 🛑 Uso del Wrapper Component para el ícono */}
                                <IconWrapper Icon={stat.icon} className="w-10 h-10 text-green-400 mb-4" />
                                
                                <div className="text-5xl font-black mb-2 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
                                    {stat.number}
                                </div>
                                <div className="text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}