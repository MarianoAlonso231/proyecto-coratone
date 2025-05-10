import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton: React.FC = () => {
  const phone = '5493816080780'; // cambia por tu número con código de país
  const message = 'Hola! Estoy interesado en sus productos.';
  const encodedMessage = encodeURIComponent(message);

  const link = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
      aria-label="WhatsApp"
    >
      <FaWhatsapp size={50} />
    </a>
  );
};

export default WhatsAppButton;
