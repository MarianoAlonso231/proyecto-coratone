import { Product } from "../types/product"; // Asegúrate de que tienes un tipo definido para los productos
import { useCart } from "../context/CartContext";

const generateWhatsAppMessage = (cart: Product[]) => {
  let message = "Hola, quiero comprar estos productos:\n\n";

  cart.forEach((item) => {
    message += `${item.name} - $${item.price}\n`;
  });

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
};

const Cart = () => {
  const { cart } = useCart();

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} - ${item.price}</li>
        ))}
      </ul>
      <button onClick={() => window.open(generateWhatsAppMessage(cart), "_blank")}>
        Comprar por WhatsApp
      </button>
    </div>
  );
};

export default Cart;