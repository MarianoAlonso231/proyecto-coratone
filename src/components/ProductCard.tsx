import React, { useState, useCallback, memo } from "react";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { ShoppingCart, X, ZoomIn } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

// Componente para el modal de imagen
const ImageModal = memo(({ imageUrl, name, onClose }: { imageUrl: string, name: string, onClose: () => void }) => (
  <div 
    className="fixed inset-0 bg-black bg-opacity-90 z-[1000] flex items-center justify-center p-4"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
    aria-labelledby="image-modal-title"
  >
    <div 
      className="relative w-full max-w-4xl max-h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-1.5 shadow-lg transition-all"
        aria-label="Cerrar modal"
      >
        <X size={20} className="text-white" />
      </button>
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={imageUrl || "/placeholder.jpg"}
          alt={`Ampliación de ${name}`}
          className="object-contain max-w-full max-h-full"
          id="image-modal-title"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.jpg";
          }}
          loading="lazy"
        />
      </div>
    </div>
  </div>
));

ImageModal.displayName = "ImageModal";

// Función para formatear precio fuera del componente principal
const formatPrice = (price: number) => {
  return price
    ? new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(price)
    : "Precio no disponible";
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { name, price, description, stock, size, image_url } = product;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Usando useCallback para optimizar las funciones
  const handleImageClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Previene la interacción con Swiper
    setIsImageModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsImageModalOpen(false);
  }, []);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity <= stock) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  }, [addToCart, product, quantity, stock]);

  const handleQuantityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(Math.min(value, stock));
  }, [stock]);
  
  // Determinar el estado de inventario para colores y textos
  const stockStatus = stock > 10 ? "alto" : stock > 3 ? "medio" : stock > 0 ? "bajo" : "agotado";
  const stockTextClass = {
    alto: "text-green-600",
    medio: "text-green-600",
    bajo: "text-amber-500",
    agotado: "text-red-500"
  }[stockStatus];

  return (
    <>
      {/* Modal de imagen (separado como componente) */}
      {isImageModalOpen && (
        <ImageModal 
          imageUrl={image_url} 
          name={name} 
          onClose={handleCloseModal} 
        />
      )}

      {/* Tarjeta de producto */}
      <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Badge de stock */}
        {stock > 0 && stock <= 3 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            ¡Últimas unidades!
          </div>
        )}

        {/* Imagen con ícono de zoom */}
        <div
          className="relative h-64 bg-gray-50 cursor-zoom-in overflow-hidden flex-shrink-0"
          onClick={handleImageClick}
        >
          <img
            src={image_url || "/placeholder.jpg"}
            alt={name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.jpg";
            }}
            loading="lazy"
          />
          <div className="absolute bottom-2 right-2 bg-white/80 p-1.5 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={16} className="text-gray-700" />
          </div>
        </div>

        {/* Contenido */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-800 line-clamp-2">{name}</h3>
            <span className="text-lg font-semibold text-purple-900 whitespace-nowrap ml-2">{formatPrice(price)}</span>
          </div>

          <p className={`text-sm font-medium mb-2 ${stockTextClass}`}>
            {stock > 0 ? `Stock disponible: ${stock}` : "Sin stock"}
          </p>

          {description && <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>}
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
                onChange={handleQuantityChange}
                className="w-16 text-center border rounded p-1"
                aria-label={`Cantidad de ${name} a agregar, máximo ${stock}`}
              />
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            aria-disabled={stock === 0}
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

export default memo(ProductCard);