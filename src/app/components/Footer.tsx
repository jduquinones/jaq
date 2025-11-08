"use client";


import React from 'react';


export default function Footer() {
return (
<footer className="relative py-8 border-t border-green-500/10 mt-12">
<div className="max-w-7xl mx-auto px-6 text-center">
<div className="text-2xl font-black mb-3">JAQ</div>
<p className="text-gray-400 mb-2">© {new Date().getFullYear()} JAQ Construcciones S.A.S. Todos los derechos reservados.</p>
<div className="flex justify-center gap-6 text-sm text-gray-500">
<button className="hover:text-green-400">Privacidad</button>
<button className="hover:text-green-400">Términos</button>
<button className="hover:text-green-400">Legal</button>
</div>
</div>
</footer>
);
}