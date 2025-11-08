"use client";

import React from "react";
import { motion, Easing, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Mail, MapPin, ArrowRight, LucideIcon } from "lucide-react";
import Image from 'next/image';


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
       ease: "easeOut" as Easing,
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
      <footer className="relative py-12 md:py-20 border-t border-green-500/20 bg-black/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* === Grid Principal (4 Columnas en Desktop) === */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left pb-10">
                    
                    {/* COLUMNA 1: Logo y Marca */}
                    <div>
                        {/* Logo Centrado en Móvil */}
                        <div className="relative group mx-auto md:mx-0 w-fit mb-4">
                            <div className="relative w-16 h-16 bg-transparent rounded-xl flex items-center justify-center transform transition-all duration-300 overflow-hidden"> 
                                <Image
                                    src="/img/logo.png" 
                                    alt="Logo JAQ Construcciones"
                                    width={64}
                                    height={64}
                                    className="object-contain" 
                                />
                            </div>
                        </div>
                        <div className="text-xl font-black tracking-tight text-white mb-1 md:text-left text-center">JAQ CONSTRUCCIONES</div>
                        <p className="text-gray-500 text-sm md:text-left text-center">Innovación en Diseño y Ejecución.</p>
                    </div>

                    {/* COLUMNA 2: Navegación */}
                    <div>
                        <h4 className="text-lg font-bold text-green-400 mb-4 border-b border-green-700/50 pb-1">Enlaces Rápidos</h4>
                        <ul className="space-y-3 text-gray-400">
                            {['Inicio', 'Servicios', 'Proyectos', 'Contacto'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors block">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMNA 3: Servicios Destacados */}
                    <div>
                        <h4 className="text-lg font-bold text-green-400 mb-4 border-b border-green-700/50 pb-1">Especialidades</h4>
                        <ul className="space-y-3 text-gray-400">
                            {['Edificación Residencial', 'Infraestructura Urbana', 'Remodelación', 'Diseño Arquitectónico'].map((service, idx) => (
                                <li key={idx}>
                                    <a href="#servicios" className="hover:text-white transition-colors block">
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMNA 4: Contacto */}
                    <div>
                        <h4 className="text-lg font-bold text-green-400 mb-4 border-b border-green-700/50 pb-1">Contáctanos</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-green-500" />
                                Bogotá, Colombia
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-green-500" />
                                +57 300 123 4567
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-green-500" />
                                contacto@jaq.com
                            </li>
                        </ul>
                    </div>
                </div>

                {/* === Derechos de Autor y Legal (Centrado) === */}
                <div className="mt-8 pt-8 border-t border-gray-700/50 text-center">
                    <p className="text-gray-500 text-sm mb-4">
                        © 2025 JAQ Construcciones S.A.S. Todos los derechos reservados.
                    </p>
                    <div className="flex justify-center gap-6 text-sm text-gray-500">
                        {["Política de Privacidad", "Términos de Servicio", "Aviso Legal"].map((text, idx) => (
                            <button
                                key={idx}
                                className="hover:text-green-400 transition-colors duration-200"
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                </div>
                
            </div>
        </footer>
    </>
  );
}
