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
    message += `${item.name} - ${new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(item.price)}\n`;
  });

  // Calcular el total a pagar
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const formattedTotalPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(totalPrice);

  message += `\nTotal a pagar: ${formattedTotalPrice}`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

  // Calcular precio total
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const formattedTotalPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(totalPrice);

  return (
    <>
      {/* Fondo oscuro desenfocado */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar claro */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-96 max-h-[80vh] rounded-bl-2xl rounded-tl-2xl bg-white text-gray-900 shadow-2xl border-l border-gray-200 transition-transform duration-300 z-50 flex flex-col font-[Poppins] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 flex justify-between items-center border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold">Tu Carrito</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black transition">
            <X size={24} />
          </button>
        </div>

        {/* Lista de productos */}
        <div className="p-5 space-y-4 overflow-y-auto flex-grow bg-white">
          {cart.length > 0 ? (
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className="flex items-center bg-gray-100 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover mr-3 border border-gray-200"
                  />
                  <div className="flex flex-col">
                    <p className="text-base font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600 transition p-2 rounded-md bg-white ml-auto"
                  >
                    <Trash size={20} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 text-sm bg-gray-100 rounded-md py-4 shadow-inner">
              Tu carrito está vacío.
            </div>
          )}
        </div>

        {/* Total a pagar */}
        <div className="p-5 border-t border-gray-200 bg-gray-50">
          <div className="mb-4 text-lg font-semibold text-gray-800">
            Total a pagar: {formattedTotalPrice}
          </div>

          <button
            disabled={cart.length === 0}
            onClick={() => {
              const whatsappLink = generateWhatsAppMessage();
              if (whatsappLink) window.open(whatsappLink, "_blank");
            }}
            className={`w-full py-3 rounded-md font-semibold transition ${
              cart.length > 0 ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
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