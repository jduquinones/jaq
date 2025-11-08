"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LucideIcon, Building2, Home, Ruler, ArrowRight } from "lucide-react";

// --- Tipos ---
interface ServiceItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

const IconWrapper: React.FC<{ Icon: LucideIcon; className?: string }> = ({
  Icon,
  className = "",
}) => <Icon className={className} />;

// --- Variantes Framer Motion ---
const containerVariants = {
  visible: { transition: { staggerChildren: 0.15 } },
  hidden: {},
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// --- Data de servicios ---
const servicesData: ServiceItem[] = [
  {
    icon: Building2,
    title: "Construcción Premium",
    desc: "Edificaciones de lujo con los más altos estándares de calidad y diseño arquitectónico innovador.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Home,
    title: "Remodelación Integral",
    desc: "Transformamos espacios con diseños modernos y funcionales que elevan tu calidad de vida.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Ruler,
    title: "Diseño Arquitectónico",
    desc: "Proyectos personalizados con renderización 3D y planificación detallada de cada elemento.",
    color: "from-teal-500 to-green-600",
  },
];

export default function ServicesSection() {
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: false,
  });

  return (
    <motion.section
      id="servicios"
      className="relative py-24 md:py-32 overflow-hidden"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Fondo degradado sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/30 to-black"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
            Servicios de{" "}
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Elite
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Soluciones integrales en construcción con tecnología de punta.
          </p>
        </motion.div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {servicesData.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative h-full"
            >
              {/* Capa de brillo */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 from-green-500/20 to-transparent rounded-3xl blur-2xl transition-opacity duration-500"></div>

              {/* Tarjeta principal */}
              <div className="relative h-full p-6 md:p-8 bg-gradient-to-br from-gray-900/60 to-transparent backdrop-blur-sm border border-green-500/20 rounded-3xl hover:border-green-500/50 transition-all duration-500 group-hover:-translate-y-3 md:group-hover:-translate-y-4">
                {/* Ícono */}
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}
                >
                  <IconWrapper Icon={service.icon} className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-green-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-5 md:mb-6">
                  {service.desc}
                </p>

                {/* Botón */}
                <button className="flex items-center gap-2 text-green-400 font-semibold group-hover:gap-4 transition-all">
                  Conocer más
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
