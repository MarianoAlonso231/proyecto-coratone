import React from "react";
import { X } from "lucide-react";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext"; // ✅ Integración con el carrito

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

  const { addToCart } = useCart(); // ✅ Obtener función para agregar al carrito

  const formatPrice = (price: number): string =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(price);

  const isLowStock = product.stock < 5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden transform transition-all duration-500 ease-in-out flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 flex-grow">
          <div className="relative h-64 md:h-full bg-gray-100 flex items-center justify-center">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-contain" />
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-2xl font-serif text-gray-800 mb-2">{product.name}</h3>
              <p className="text-purple-800 text-xl font-medium mb-2">{formatPrice(product.price)}</p>
              <p className={`text-sm font-medium mb-4 ${isLowStock ? "text-red-600" : "text-green-700"}`}>
                {isLowStock ? `⚠️ Stock bajo: ${product.stock} unidades` : `Disponibles: ${product.stock}`}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* ✅ Solo botón de "Agregar al carrito" */}
        <div className="p-6 md:p-8 bg-white">
          <button
            onClick={() => addToCart(product)}
            className="w-full py-3 px-4 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors duration-300 active:scale-95"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;