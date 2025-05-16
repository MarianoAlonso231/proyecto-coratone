import { useCart } from "../context/CartContext";
import { CartItem } from "../types/cart"; // Asegúrate de tener este tipo si lo usás

const generateWhatsAppMessage = (cart: CartItem[]) => {
  let message = "Hola, quiero comprar estos productos:\n\n";

  cart.forEach((item) => {
    message += `${item.name} x${item.quantity} - $${item.price} c/u = $${item.price * item.quantity}\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `\nTotal: $${total}`;

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
};

const Cart = () => {
  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 font-[Poppins] max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map((item, index) => (
              <li key={index} className="py-2 flex justify-between items-center">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          <div className="text-right font-bold text-lg mb-4">
            Total: ${total}
          </div>

          <button
            onClick={() => window.open(generateWhatsAppMessage(cart), "_blank")}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Comprar por WhatsApp
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
