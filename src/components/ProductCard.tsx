import React, { useState } from "react";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { ShoppingCart, X } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { name, price, description, stock, size, image_url } = product;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previene la interacción con Swiper
    setIsImageModalOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity <= stock) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  const formatPrice = (price: number) => {
    return price
      ? new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(price)
      : "Precio no disponible";
  };

  return (
    <>
      {/* Modal de imagen */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-[1000] flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
  onClick={() => setIsImageModalOpen(false)}
  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-1.5 shadow-lg transition-all"
  aria-label="Cerrar modal"
>
  <X size={20} className="text-white" />
</button>
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={image_url || "/placeholder.jpg"}
                alt={`Ampliación de ${name}`}
                className="object-contain max-w-full max-h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.jpg";
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tarjeta de producto */}
      <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Badge de stock */}
        {stock > 0 && stock <= 3 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            ¡Últimas unidades!
          </div>
        )}

        {/* Imagen */}
        <div
          className="relative h-64 bg-gray-50 cursor-zoom-in flex-shrink-0"
          onClick={handleImageClick}
        >
          <img
            src={image_url || "/placeholder.jpg"}
            alt={name}
            className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.jpg";
            }}
          />
        </div>

        {/* Contenido */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-800">{name}</h3>
            <span className="text-lg font-semibold text-purple-900">{formatPrice(price)}</span>
          </div>

          <p className={`text-sm font-medium mb-2 ${stock > 10 ? "text-green-600" : stock > 0 ? "text-amber-500" : "text-red-500"}`}>
            {stock > 0 ? `Stock disponible: ${stock}` : "Sin stock"}
          </p>

          {description && <p className="text-sm text-gray-600 mb-2">{description}</p>}
          {size && <p className="text-sm text-gray-600 mb-2">Talle: {size}</p>}

          {stock > 0 && (
            <div className="flex items-center mb-3 gap-2 mt-auto">
              <label htmlFor={`quantity-${product.id}`} className="text-sm">Cantidad:</label>
              <input
                id={`quantity-${product.id}`}
                type="number"
                value={quantity}
                min={1}
                max={stock}
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value) || 1);
                  setQuantity(Math.min(value, stock));
                }}
                className="w-16 text-center border rounded"
              />
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`w-full py-2 rounded-lg font-medium text-sm flex items-center justify-center transition-colors mt-auto ${
              stock > 0
                ? "bg-purple-900 text-white hover:bg-purple-950"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart size={16} className="mr-2" />
            {stock > 0 ? "Agregar al carrito" : "Sin stock"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;