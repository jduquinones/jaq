"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Mail, MapPin, ArrowRight, LucideIcon } from "lucide-react";

// --- Tipos auxiliares ---
interface ContactItemType {
  icon: LucideIcon;
  label: string;
  info: string;
}

interface IconWrapperProps {
  Icon: LucideIcon;
  className?: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ Icon, className }) => (
  <div className={`flex items-center justify-center ${className || ""}`}>
    <Icon className="w-6 h-6 md:w-7 md:h-7 text-green-400" />
  </div>
);

// --- Datos de contacto ---
const contactInfo: ContactItemType[] = [
  { icon: Phone, label: "Llámanos", info: "+57 300 123 4567" },
  { icon: Mail, label: "Escríbenos", info: "info@jaq.com" },
  { icon: MapPin, label: "Visítanos", info: "Bogotá, Colombia" },
];

// --- Variantes de animación ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// --- Componente Principal ---
export default function CTASection() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <>
      {/* === SECCIÓN CTA === */}
      <section
        id="contacto"
        ref={ref}
        className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-black via-green-950/30 to-black"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-700/10 via-emerald-600/10 to-transparent"></div>

        <motion.div
          className="relative max-w-5xl mx-auto px-6 text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Texto introductorio */}
          <motion.div
            variants={itemVariants}
            className="inline-block mb-6 px-6 py-2 bg-green-500/15 border border-green-500/30 rounded-full backdrop-blur-sm"
          >
            <span className="text-green-400 font-semibold uppercase tracking-wide">
              ¿Listo para comenzar?
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            Construyamos algo{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Extraordinario
            </span>
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Contáctanos hoy y descubre cómo podemos transformar tu visión en
            realidad.
          </motion.p>

          {/* Tarjetas de contacto */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {contactInfo.map((contact, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 bg-gradient-to-br from-green-900/30 to-transparent backdrop-blur-sm border border-green-500/20 rounded-2xl hover:border-green-500/50 hover:-translate-y-2 transition-all duration-500 group"
              >
                <IconWrapper
                  Icon={contact.icon}
                  className="w-10 h-10 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="text-sm text-gray-400 mb-1 uppercase tracking-wide">
                  {contact.label}
                </div>
                <div className="text-lg font-semibold text-white">
                  {contact.info}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Botón CTA */}
          <motion.button
            variants={itemVariants}
            className="px-10 md:px-14 py-4 md:py-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-lg md:text-xl font-bold hover:shadow-2xl hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
          >
            Solicitar cotización gratis
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </motion.div>
      </section>

      {/* === FOOTER === */}
      <footer className="relative py-10 md:py-12 border-t border-green-500/20 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-3xl font-black mb-4 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            JAQ
          </div>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            © 2025 JAQ Construcciones S.A.S. Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            {["Privacidad", "Términos", "Legal"].map((text, idx) => (
              <button
                key={idx}
                className="hover:text-green-400 transition-colors duration-200"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
