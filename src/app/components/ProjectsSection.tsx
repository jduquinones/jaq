"use client";

import React from "react";
import Image from "next/image";
import { motion, Easing, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, ArrowRight, LucideIcon } from "lucide-react";

// --- Tipos ---
interface ProjectItem {
  name: string;
  type: string;
  year: string;
  icon: LucideIcon;
  imageSrc: string;
}

// --- Datos de proyectos ---
const projectData: ProjectItem[] = [
  {
    name: "Torre Verde",
    type: "Residencial Premium",
    year: "2024",
    icon: Zap,
    imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Casa Moderna",
    type: "Vivienda Unifamiliar",
    year: "2024",
    icon: Zap,
    imageSrc: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Complejo Vista",
    type: "Comercial & Oficinas",
    year: "2023",
    icon: Zap,
    imageSrc: "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Hotel de Playa",
    type: "Turismo & Hospitalidad",
    year: "2022",
    icon: Zap,
    imageSrc: "https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Puente Metropolitano",
    type: "Infraestructura Urbana",
    year: "2022",
    icon: Zap,
    imageSrc: "https://images.pexels.com/photos/34635214/pexels-photo-34635214.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Centro Deportivo",
    type: "Recreación & Salud",
    year: "2021",
    icon: Zap,
    imageSrc: "https://images.pexels.com/photos/29175966/pexels-photo-29175966.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

// --- Animaciones ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as Easing } },
};

const cardVariants = {
  hidden: (isEven: boolean) => ({
    opacity: 0,
    x: isEven ? -60 : 60,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as Easing },
  },
};

// --- Componente principal ---
export default function ProjectsSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      id="proyectos"
      className="relative  md:pt-18 bg-gradient-to-b from-black via-green-950/20 to-black overflow-hidden"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Título */}
        <motion.div variants={titleVariants} className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-6xl font-black mb-4 leading-tight">
            Proyectos{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Icónicos
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Ejemplos de arquitectura y construcción que marcan la diferencia.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {projectData.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                custom={isEven}
                className="group relative h-[380px] md:h-[450px] overflow-hidden rounded-3xl shadow-2xl border border-green-900/30 hover:border-green-600/50 transition-all duration-500"
              >
                {/* Imagen */}
                <Image
                  src={project.imageSrc}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx < 2} // Solo prioridad en las primeras
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-all duration-500" />

                {/* Contenido */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">
                      {project.type}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold mb-3 text-white group-hover:text-green-400 transition-colors">
                    {project.name}
                  </h3>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-300 text-sm md:text-base">
                      Completado en {project.year}
                    </p>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-green-500/30 group-hover:scale-110 group-hover:bg-green-500 transition-all duration-500">
                      <ArrowRight className="w-5 h-5 text-green-400 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
