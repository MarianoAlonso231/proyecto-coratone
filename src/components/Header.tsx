import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Anillos', href: 'anillos' },
    { name: 'Collares', href: 'collares' },
    { name: 'Pulseras', href: 'pulseras' }, 
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-700 ease-in-out transform ${
        scrolled 
          ? 'bg-white/95 shadow-lg backdrop-blur-sm py-2 translate-y-0' 
          : 'bg-transparent py-4 translate-y-0'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center transform transition-transform duration-700 ease-in-out hover:scale-105"
        >
          <img 
            src="/coratone-logo.png" 
            alt="Coratone" 
            className={`transition-all duration-700 ease-in-out transform ${
              scrolled ? 'h-16 w-auto scale-100' : 'h-20 w-auto scale-100'
            }`}
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`font-light text-sm tracking-wider uppercase transition-all duration-500 ease-in-out relative group transform hover:scale-105 ${
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-purple-800 transition-all duration-500 ease-in-out transform origin-left group-hover:w-full"></span>
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden transition-all duration-500 ease-in-out transform hover:scale-110 ${
            scrolled ? 'text-gray-800' : 'text-white'
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden bg-white/95 backdrop-blur-sm shadow-lg absolute w-full left-0 top-full transition-all duration-500 ease-in-out transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="font-light text-gray-800 hover:text-purple-800 transition-all duration-300 ease-in-out text-lg tracking-wide transform hover:translate-x-2"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;