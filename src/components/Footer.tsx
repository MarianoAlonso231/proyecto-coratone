import React from 'react';
import { Diamond, FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-2xl font-serif text-purple-800 mb-4">
              <Diamond size={24} />
              <span className="font-semibold">Coratone</span>
            </div>
            <p className="text-gray-500 mb-6 max-w-xs">
              Joyería.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/marianoalonso10" target="_blank" className="text-gray-400 hover:text-purple-800 transition-colors duration-200">
                <InstagramIcon size={20} />
              </a>
              <a href="" className="text-gray-400 hover:text-purple-800 transition-colors duration-200">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-800 transition-colors duration-200">
                <TwitterIcon size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700">Links rápidos</h3>
            <ul className="space-y-2">
              {['Home', 'Rings', 'Necklaces', 'Bracelets', 'About Us'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item === 'Home' ? '' : item.toLowerCase()}`}
                    className="text-gray-500 hover:text-purple-800 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700">Contacto</h3>
            <address className="not-italic text-gray-500">
              <p className="mb-2">123 Luxury Lane</p>
              <p className="mb-2">New York, NY 10001</p>
              <p className="mb-4">Argentina</p>
              <p className="mb-2">Email: info@lumina.com</p>
              <p>Teléfono: +1 (555) 123-4567</p>
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