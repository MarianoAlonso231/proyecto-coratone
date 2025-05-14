import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartSidebar from "./CartSidebar"; // ✅ Importamos el nuevo sidebar

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // ✅ Estado para abrir/cerrar el carrito
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-700 ease-in-out transform ${
        scrolled ? "bg-white/95 shadow-lg backdrop-blur-sm py-1.5 translate-y-0" : "bg-transparent py-2 translate-y-0"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center transform transition-transform duration-700 ease-in-out hover:scale-105">
          <img
            src="/coratone-logo.png"
            alt="Coratone"
            className={`transition-all duration-700 ease-in-out transform ${
              scrolled ? "h-12 w-auto" : "h-16 w-auto"
            }`}
          />
        </a>

        <nav className="hidden md:flex items-center">
          <div className="flex space-x-6">
            {["anillos", "collares", "aritos"].map((item) => (
              <button
                key={item}
                onClick={() => document.getElementById(item)?.scrollIntoView({ behavior: "smooth" })}
                className={`font-light text-xs tracking-widest uppercase transition-all duration-500 ease-in-out relative group transform hover:scale-105 ${
                  scrolled ? "text-gray-800" : "text-white"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-purple-800 transition-all duration-500 ease-in-out transform origin-left group-hover:w-full"></span>
              </button>
            ))}
          </div>
        </nav>

        {/* ✅ Ícono del carrito con contador y funcionalidad */}
        <button className="relative" onClick={() => setCartOpen(true)}>
  <ShoppingCart size={24} className={`text-gray-700 hover:text-gray-900 ${scrolled ? "text-gray-800" : "text-white"}`} />
  {cart.length > 0 && (
    <span className="absolute top-0 right-[-24px] bg-red-600 text-white rounded-full text-sm px-2">
      {cart.length}
    </span>
  )}
</button>

        <button
          className={`md:hidden transition-all duration-500 ease-in-out transform hover:scale-110 ${
            scrolled ? "text-gray-800" : "text-white"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ✅ Sidebar del carrito */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;