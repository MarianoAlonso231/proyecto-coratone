import React from "react";
import { useLocation } from "react-router-dom"; // ✅ Importamos useLocation para verificar la ruta
import { FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  const location = useLocation(); // ✅ Obtener la ruta actual

  if (location.pathname === "/login") return null;

  return (
    <footer className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna del logo e ícono alineados manualmente */}
          <div className="flex flex-col items-center md:items-start md:ml-[60px]">
            <img src="/coratone-logo.png" alt="Coratone" className="h-20 w-auto mb-4" />
            <div className="mt-8">
              <a
                href="https://www.instagram.com/coratoneaccesorios/"
                target="_blank"
                className="text-gray-400 hover:text-purple-900 transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <FaInstagram size={40} className="text-purple-900" />
                  <span className="text-gray-600 text-lg font-medium">Instagram</span>
                </div>
              </a>
            </div>
          </div>

          {/* Columna vacía para balance o futura información */}
          <div></div>

          {/* Columna de contacto */}
          <div className="flex flex-col items-center md:items-start md:ml-[60px]">
            <h3 className="text-lg font-medium mb-4 text-gray-700">Contacto</h3>
            <address className="not-italic text-gray-500">
              <p className="mb-2">Argentina</p>
              <p className="mb-4">Tucumán, Alderetes</p>
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

export default Footer;