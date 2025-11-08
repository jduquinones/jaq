// src/app/components/Navbar.jsx
import Image from 'next/image';
import React from 'react';

// 🛑 PASO 1: Define la interfaz de props
interface NavbarProps {
    scrollY: number; // scrollY es un número (el valor del desplazamiento)
    isLoaded: boolean; // isLoaded es un booleano
}

// 🛑 PASO 2: Aplica la interfaz a la función del componente
export default function Navbar({ scrollY, isLoaded }: NavbarProps) {
  const navItems = ['Inicio', 'Servicios', 'Proyectos', 'Contacto'];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id.toLowerCase());
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrollY > 100 ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
        backdropFilter: scrollY > 100 ? 'blur(20px)' : 'none',
        borderBottom: scrollY > 100 ? '1px solid rgba(136, 164, 86, 0.2)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          
          {/* Logo y Nombre de la Empresa */}
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => scrollToSection('Inicio')}
            style={{ animation: isLoaded ? 'slideIn 1s ease-out' : 'none' }}
          >
            {/* Ícono del Logo (Sin fondo/rotación, solo scale en hover) */}
            <div className="relative group hidden md:block">                
                <div className="relative w-16 h-16 bg-transparent rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 overflow-hidden"> 
                    <Image
                        src="/img/logo.png" 
                        alt="Logo JAQ Construcciones"
                        width={64}
                        height={64}
                        className="object-contain" 
                    />
                </div>
            </div>
            
            {/* 🛑 Texto Oculto en Móvil, Visible en MD y superior */}
            <div className="hidden md:block"> 
              <div className="text-2xl font-black tracking-tight">JAQ</div>
              <div className="text-xs text-green-400 tracking-widest">CONSTRUCCIONES</div>
            </div>
          </div>
          
          {/* Links de Navegación (sin cambios) */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="relative group"
                style={{ animation: isLoaded ? `fadeIn 1s ease-out ${idx * 0.1}s both` : 'none', }}
              >
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {item}
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
            <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300">
              Cotizar Ahora
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}