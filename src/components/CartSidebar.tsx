import React from "react";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useCart();

  // ✅ Número de WhatsApp al que se enviará el mensaje
  const whatsappNumber = "5493816080780"; // Reemplaza con el número de destino

  // ✅ Función para generar el mensaje de compra
  const generateWhatsAppMessage = () => {
    if (cart.length === 0) return;

    let message = "Hola, quiero comprar estos productos:\n\n";
    cart.forEach((item) => {
      message += `${item.name} - $${item.price}\n`;
    });

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  return (
    <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}>
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-bold">Carrito de Compras</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
          <X size={24} />
        </button>
      </div>

      <div className="p-4">
        {cart.length > 0 ? (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <span>{item.name}</span>
                <span className="font-bold">${item.price}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm ml-2"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">Tu carrito está vacío.</p>
        )}

        {/* ✅ Enlace a WhatsApp con los productos agregados */}
        <button
          className="mt-4 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          onClick={() => {
            const whatsappLink = generateWhatsAppMessage();
            if (whatsappLink) {
              window.open(whatsappLink, "_blank");
            }
          }}
        >
          Comprar por WhatsApp
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;