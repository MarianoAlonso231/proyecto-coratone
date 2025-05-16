import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartSidebar from "./CartSidebar";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  if (location.pathname === "/login") return null;

  return (
    <header className="fixed w-full z-50 bg-white shadow-md py-2 border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center transition-transform duration-300 hover:scale-105">
          <img src="/coratone-logo.png" alt="Coratone" className="h-12 w-auto" />
        </a>

        {/* Menú en desktop */}
        <nav className="hidden md:flex space-x-8">
          {["anillos", "collares", "aros"].map((item) => (
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
          {/* Ícono del carrito */}
          <button className="relative transition-transform duration-300 hover:scale-110" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={22} className="text-gray-800 transition-colors duration-300" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                {cart.length}
              </span>
            )}
          </button>

          {/* Botón menú hamburguesa */}
          <button className="md:hidden transition-transform duration-300 hover:scale-110" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menú principal">
            {isMenuOpen ? <X size={24} className="text-gray-800" /> : <Menu size={24} className="text-gray-800" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable en móviles */}
      <div className={`absolute top-full left-0 w-full bg-white shadow-md transform transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col items-center py-2">
          {["anillos", "collares", "aros"].map((item) => (
            <button
              key={item}
              onClick={() => {
                document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
                setIsMenuOpen(false);
              }}
              className="w-full text-center text-gray-800 uppercase font-light tracking-wider py-4 border-b border-gray-200 last:border-b-0"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Sidebar del carrito */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;