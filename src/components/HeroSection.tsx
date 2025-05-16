import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('/public/WhatsApp-image2.jpeg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 z-10 text-center pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Elegant Divider */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-[1px] bg-white/70"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide">
            Coratone <span className="text-purple-600 font-medium">Accesorios</span>
          </h1>

          {/* Elegant Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 font-light tracking-wider">
            Joyas que resaltan tu belleza única
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Realizamos Envíos
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <a
              href="#anillos"
              className="px-8 py-3 bg-purple-900 text-white font-medium rounded-md 
              hover:bg-purple-950 transition-colors duration-300 backdrop-blur-sm shadow-lg"
            >
              Explorar Colección
            </a>
            
          </div>

          {/* Scroll Down Indicator */}
          <div className="hidden md:block absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;