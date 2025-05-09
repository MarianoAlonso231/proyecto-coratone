import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-gray-800 mb-6">
            Coratone <span className="text-purple-800 font-medium">Accesorios</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
            
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#rings"
              className="px-8 py-3 bg-purple-800 text-white font-medium rounded-md 
              hover:bg-purple-900 transition-colors duration-300"
            >
              Nuestra colección
            </a>
          </div>
        </div>
      </div>
      <div className="mt-16 w-full h-[400px] bg-[url('https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] 
        bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
    </section>
  );
};

export default HeroSection