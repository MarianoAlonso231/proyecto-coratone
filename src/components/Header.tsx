import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartSidebar from "./CartSidebar";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();
  
  // Número de WhatsApp al que se enviará el mensaje
  const whatsappNumber = "5493815772509"; // Reemplaza con tu número real
  const whatsappMessage = "Hola, estoy interesado en tus productos. ¿Podrías darme más información?";
  
  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  if (location.pathname === "/login") return null;

  return (
    <header className="fixed w-full z-50 bg-white shadow-md py-2 border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center transition-transform duration-300 hover:scale-105">
          <img src="/coratone-logo.png" alt="Coratone" className="h-12 w-20" />
        </a>

        {/* Menú en desktop */}
        <nav className="hidden md:flex space-x-8">
          {["anillos", "collares", "aros", "pulseras"].map((item) => (
            <button
              key={item}
              onClick={() => document.getElementById(item)?.scrollIntoView({ behavior: "smooth" })}
              className="font-light text-sm uppercase tracking-wider relative group transition-all duration-300 text-purple-900 hover:text-purple-950"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-purple-900 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Icono de WhatsApp */}
          <button 
            onClick={openWhatsApp}
            className="relative transition-transform duration-300 hover:scale-110"
            aria-label="Contactar por WhatsApp"
          >
            <div className="bg-purple-900 text-white p-1 rounded-full flex items-center justify-center">
              <Phone size={18} />
            </div>
          </button>
          
          {/* Ícono del carrito */}
          <button className="relative transition-transform duration-300 hover:scale-110" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={22} className="text-purple-900 transition-colors duration-300" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                {cart.length}
              </span>
            )}
          </button>

          {/* Botón menú hamburguesa */}
          <button className="md:hidden transition-transform duration-300 hover:scale-110" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menú principal">
            {isMenuOpen ? <X size={24} className="text-purple-900" /> : <Menu size={24} className="text-purple-900" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable en móviles */}
      <div className={`absolute top-full left-0 w-full bg-white shadow-md transform transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col items-center py-2">
          {["anillos", "collares", "aros", "pulseras"].map((item) => (
            <button
              key={item}
              onClick={() => {
                document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
                setIsMenuOpen(false);
              }}
              className="w-full text-center text-purple-900 uppercase font-light tracking-wider py-4 border-b border-gray-200 last:border-b-0"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
          
          {/* Opción de WhatsApp en el menú móvil */}
          
        </nav>
      </div>

      {/* Sidebar del carrito */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;