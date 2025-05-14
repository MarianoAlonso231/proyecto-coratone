import React from "react";
import { X } from "lucide-react";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

  const { addToCart } = useCart();

  const formatPrice = (price: number): string =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(price);

  const isLowStock = product.stock < 5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-[Poppins]">
      {/* Fondo difuminado */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white text-gray-800 rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden transition-all duration-500 ease-in-out flex flex-col">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <X size={24} />
        </button>

        {/* Contenido */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Imagen */}
          <div className="relative h-64 md:h-full bg-gray-100 flex items-center justify-center">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </div>

          {/* Información */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-green-600 text-xl font-bold mb-2">{formatPrice(product.price)}</p>
              <p className={`text-sm font-medium mb-4 ${isLowStock ? "text-red-500" : "text-green-700"}`}>
                {isLowStock
                  ? `⚠️ Stock bajo: ${product.stock} unidades`
                  : `Disponibles: ${product.stock}`}
              </p>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {product.description}
              </p>

              {product.size && (
                <p className="text-sm text-gray-600 font-medium">Tamaño: {product.size}</p>
              )}
            </div>
          </div>
        </div>

        {/* Botón agregar al carrito */}
        <div className="p-6 md:p-8 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => {
              addToCart(product);
              onClose(); // opcional
            }}
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition active:scale-95"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
