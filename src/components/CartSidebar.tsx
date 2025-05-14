import React from "react";
import { X, Trash } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useCart();
  const whatsappNumber = "5493816080780";

  const generateWhatsAppMessage = () => {
    if (cart.length === 0) return;
    let message = "Hola, quiero comprar estos productos:\n\n";
    cart.forEach((item) => {
      message += `${item.name} - $${item.price}\n`;
    });
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-gray-900 text-white shadow-2xl border-l border-gray-700 transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-5 flex justify-between items-center border-b border-gray-700 bg-gray-800">
        <h2 className="text-xl font-semibold tracking-wide">Tu Carrito</h2>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white transition"
        >
          <X size={24} />
        </button>
      </div>

      {/* Lista de productos */}
      <div className="p-5 space-y-4 overflow-y-auto max-h-[65vh]">
        {cart.length > 0 ? (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-800 rounded-lg px-4 py-3 shadow-md hover:shadow-lg transition"
              >
                <div>
                  <p className="text-base font-medium">{item.name}</p>
                  <p className="text-sm text-gray-300">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-500 transition p-2 rounded-md bg-gray-700"
                >
                  <Trash size={20} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-300 text-sm bg-gray-800 rounded-md py-4 shadow-md">
            Tu carrito está vacío.
          </div>
        )}
      </div>

      {/* Comprar */}
      <div className="p-5 border-t border-gray-700 bg-gray-800">
        <button
          disabled={cart.length === 0}
          onClick={() => {
            const whatsappLink = generateWhatsAppMessage();
            if (whatsappLink) window.open(whatsappLink, "_blank");
          }}
          className={`w-full py-3 rounded-md font-semibold transition text-white ${
            cart.length > 0
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Comprar por WhatsApp
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;