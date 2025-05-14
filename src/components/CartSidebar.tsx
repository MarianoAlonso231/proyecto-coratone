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
    <>
      {/* Overlay para cerrar al hacer clic fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar del carrito con altura reducida */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-96 max-h-[80vh] rounded-bl-2xl rounded-tl-2xl bg-gray-900 text-white shadow-2xl border-l border-gray-700 transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 flex justify-between items-center border-b border-gray-700 bg-gray-800">
          <h2 className="text-xl font-semibold tracking-wide">Tu Carrito</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Lista de productos con imagen */}
        <div className="p-5 space-y-4 overflow-y-auto flex-grow">
          {cart.length > 0 ? (
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li
                  key={`${item.id}-${index}`} // 👈 Clave única combinando ID e índice
                  className="flex items-center bg-gray-800 rounded-lg px-4 py-3 shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover mr-3"
                  />
                  <div className="flex flex-col">
                    <p className="text-base font-medium">{item.name}</p>
                    <p className="text-sm text-gray-300">${item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-500 transition p-2 rounded-md bg-gray-700 ml-auto"
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
        <div className="p-5 border-t border-gray-700 bg-gray-800 mt-auto">
          <button
            disabled={cart.length === 0}
            onClick={() => {
              const whatsappLink = generateWhatsAppMessage();
              if (whatsappLink) window.open(whatsappLink, "_blank");
            }}
            className={`w-full py-3 rounded-md font-semibold transition text-white ${
              cart.length > 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Comprar por WhatsApp
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;