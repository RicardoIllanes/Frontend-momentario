import React from 'react';

const HeroSection = () => {
    return (
        <div className="relative bg-zinc-900 text-white py-24 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                    Encuentra tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">Vehículo Ideal</span>
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
                    Explora nuestra selección premium de vehículos. Calidad, garantía y el mejor servicio post-venta del mercado.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors">
                        Ver Catálogo
                    </button>
                    <button className="px-8 py-4 border border-white/20 bg-white/10 backdrop-blur-sm rounded-full font-bold hover:bg-white/20 transition-colors">
                        Contáctanos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
