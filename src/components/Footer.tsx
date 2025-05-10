import React from 'react';

import { FaInstagram } from 'react-icons/fa';


const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <img 
                src="/coratone-logo.png"
                alt="Coratone" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-gray-500 mb-6 max-w-xs">
             
            </p>
            <div className="flex space-x-5 mt-12">
              <a href="https://www.instagram.com/coratoneaccesorios/" target="_blank" className="text-gray-400 hover:text-purple-800 transition-colors duration-200">
                <FaInstagram size={40} />

              </a>                           
            </div>
          </div>
          
          <div>
            
           
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700">Contacto</h3>
            <address className="not-italic text-gray-500">             
              <p className="mb-2">Argentina</p>
              <p className="mb-4">Tucumán, Alderetes</p>
              <p className="mb-2">Email: info@lumina.com</p>
              <p>Teléfono: +54 9 3815 77-2509</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Coratone Accesorios.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer