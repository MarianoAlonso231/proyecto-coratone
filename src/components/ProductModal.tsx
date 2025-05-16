import React, { useState } from "react";
import { X, Expand } from "lucide-react";
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
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number): string =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(price);

  const isLowStock = product.stock < 3;

  const handleAddToCart = () => {
    if (product.stock > 0 && quantity > 0 && quantity <= product.stock) {
      addToCart(product, quantity);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-[Poppins]">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {isFullScreen && (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-[60]" onClick={() => setIsFullScreen(false)}>
          <img src={product.image_url} alt={product.name} className="max-w-full max-h-full cursor-pointer" />
        </div>
      )}

      <div className="relative bg-white text-gray-800 rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden z-[50]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition z-50"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative flex items-center justify-center p-4">
            <img
              src={product.image_url}
              alt={product.name}
              className="max-w-[150px] w-full h-auto object-cover mx-auto rounded-lg shadow-md cursor-pointer"
              onClick={() => setIsFullScreen(true)}
            />
            <button
              className="absolute bottom-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition"
              onClick={() => setIsFullScreen(true)}
              style={{ touchAction: "manipulation" }}
            >
              <Expand size={16} />
            </button>
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-purple-900 text-xl font-bold mb-2">{formatPrice(product.price)}</p>
              <p className={`text-sm font-medium mb-4 ${isLowStock ? "text-red-500" : "text-purple-900"}`}>
                {isLowStock ? `⚠️ Stock bajo: ${product.stock} unidad/es` : `Disponibles: ${product.stock}`}
              </p>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{product.description}</p>

              {product.size && <p className="text-sm text-gray-600 font-medium">Talle: {product.size}</p>}

              {product.stock > 0 && (
                <div className="mt-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min={1}
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, Number(e.target.value))))}
                    className="w-20 px-2 py-1 border border-purple-900 rounded-md text-purple-900"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 border-t border-purple-900 bg-purple-950">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 font-semibold rounded-lg transition active:scale-95 ${
              product.stock === 0 ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-purple-900 text-white hover:bg-purple-950"
            }`}
          >
            {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;