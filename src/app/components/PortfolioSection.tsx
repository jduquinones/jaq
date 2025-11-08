// components/PortfolioSection.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link, Aperture } from 'lucide-react';

// --- 1. Definición de Tipos y Data Mock ---

interface ProjectItem {
    title: string;
    description: string;
    imageSrc: string; // URL de la imagen del proyecto
    link: string; // Enlace a la página del proyecto (o modal)
}

const mockProjects: ProjectItem[] = [
    { title: "Edificio Residencial Élite", description: "Diseño y construcción de 20 apartamentos de lujo.", imageSrc: "/images/project-elite.jpg", link: "#" },
    { title: "Parque Industrial Alfa", description: "Construcción de una bodega de 5,000 m² con estándares ISO.", imageSrc: "/images/project-alfa.jpg", link: "#" },
    { title: "Reforma Urbana Central", description: "Modernización completa de una plaza histórica en el centro de la ciudad.", imageSrc: "/images/project-urban.jpg", link: "#" },
    { title: "Casa Campestre Modelo", description: "Construcción ecológica y sostenible de vivienda unifamiliar.", imageSrc: "/images/project-house.jpg", link: "#" },
];

// --- 2. Variantes de Animación ---

// Contenedor general: aparece rápidamente
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            when: "beforeChildren",
            staggerChildren: 0.15, // Retraso entre cada tarjeta
        }
    },
};

// Variantes para cada Tarjeta de Proyecto
const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: "spring", stiffness: 100, duration: 0.8 } 
    },
};

// --- 3. Componente de Tarjeta de Proyecto ---

const ProjectCard: React.FC<{ project: ProjectItem }> = ({ project }) => (
    <motion.div 
        variants={itemVariants} 
        className="relative overflow-hidden rounded-xl shadow-xl group cursor-pointer"
    >
        {/* Imagen del Proyecto (Placeholder) */}
        <img 
            src={project.imageSrc} 
            alt={project.title} 
            className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Capa de Superposición y Contenido */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                {project.title}
            </h3>
            <p className="text-gray-300 text-sm mb-4">{project.description}</p>
            <a 
                href={project.link} 
                className="text-green-400 font-semibold flex items-center gap-1 transition-transform group-hover:translate-x-1"
            >
                Ver Proyecto <Link className="w-4 h-4" />
            </a>
        </div>
    </motion.div>
);

// --- 4. Componente Principal ---

export default function PortfolioSection() {
    
    // Hook para detectar si la sección está en la vista
    const [ref, inView] = useInView({
        threshold: 0.2, // Se activa cuando el 20% de la sección es visible
        triggerOnce: true, // Solo se anima una vez
    });

    return (
        <section id="portafolio" className="py-24 bg-gray-900/50">
            <motion.div 
                ref={ref} 
                className="max-w-7xl mx-auto px-6"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                {/* Encabezado de la Sección */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <span className="inline-block px-6 py-2 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full text-green-400 text-sm font-semibold mb-4">
                        <Aperture className="inline w-4 h-4 mr-2" />
                        Nuestro Trabajo
                    </span>
                    <h2 className="text-5xl font-extrabold text-white leading-tight">
                        Proyectos que Marcan la Diferencia
                    </h2>
                    <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
                        Explora la calidad, innovación y excelencia que JAQ Construcciones entrega en cada obra.
                    </p>
                </motion.div>

                {/* Grid de Proyectos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {mockProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}