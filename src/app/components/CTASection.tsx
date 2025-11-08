// src/app/components/CTASection.tsx
"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Phone } from 'lucide-react';

// --- Variantes Animación ---

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            duration: 0.8, 
            ease: "easeInOut", // 🛑 Usar una cadena de easing válida o un array de 4 números [n,n,n,n]
            when: "beforeChildren", 
            staggerChildren: 0.2 
        } 
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

// --- Componente Principal ---
export default function CTASection() {
    const [ref, inView] = useInView({
        threshold: 0.1, 
        triggerOnce: true,
    });

    return (
        <section id="contacto-cta" className="py-24 bg-green-950/50 border-t border-green-500/30">
            <motion.div
                ref={ref}
                className="max-w-7xl mx-auto px-6 text-center"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants} // Error corregido en esta línea
            >
                {/* Título */}
                <motion.h2 
                    variants={itemVariants}
                    className="text-5xl md:text-6xl font-black mb-4 leading-tight"
                >
                    ¿Listo para Transformar tu Visión?
                </motion.h2>

                {/* Subtítulo */}
                <motion.p 
                    variants={itemVariants}
                    className="text-xl text-gray-400 max-w-3xl mx-auto mb-10"
                >
                    Contáctanos hoy para una consultoría gratuita y descubre cómo la experiencia de JAQ Construcciones puede llevar tu proyecto al siguiente nivel de calidad e innovación.
                </motion.p>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <motion.a 
                        variants={itemVariants}
                        href="tel:+5712345678"
                        className="flex items-center justify-center px-10 py-3 bg-gradient-to-r from-green-500 to-green-700 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300"
                    >
                        <Phone className="w-5 h-5 mr-3" />
                        Llamar Ahora
                    </motion.a>
                    
                    <motion.a 
                        variants={itemVariants}
                        href="#contacto"
                        className="flex items-center justify-center px-10 py-3 border border-gray-500/50 rounded-full text-lg font-bold text-gray-300 hover:border-green-500 hover:text-white transform hover:scale-105 transition-all duration-300"
                    >
                        Solicitar Presupuesto
                        <ArrowRight className="w-5 h-5 ml-3" />
                    </motion.a>
                </div>

            </motion.div>
        </section>
    );
}