import React, { useState, useEffect } from "react";
import { Product } from "../types/product";
import ProductModal from "./ProductModal";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Eye, Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onModalOpen?: () => void;
  onModalClose?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onModalOpen, onModalClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(product.image_url || "URL_DE_IMAGEN_DEFECTO");
  const { name, price, description, stock, size } = product;
  const { addToCart } = useCart();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (imageSrc && imageSrc.trim() !== "") {
      fetch(imageSrc, { method: "HEAD" })
        .then((res) => {
          if (!res.ok) throw new Error(`Imagen inaccesible (${res.status})`);
        })
        .catch(() => {
          setImageSrc("URL_DE_IMAGEN_DEFECTO");
        });
    }
  }, [product.image_url]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    onModalOpen?.();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onModalClose?.();
  };

  const formatPrice = (price: number) => {
    return price
      ? new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(price)
      : "Precio no disponible";
  };

  const getStockColor = () => {
    if (stock > 10) return "text-green-600";
    if (stock > 0) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <>
      <div 
        className="relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Badge para stock bajo */}
        {stock > 0 && stock <= 5 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            ¡Últimas unidades!
          </div>
        )}
        
        {/* Imagen con overlay */}
        <div className="relative h-64 overflow-hidden bg-gray-50">
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full object-contain transition-transform duration-700 ease-out"
            style={{ 
              transform: isHovering ? 'scale(1.08)' : 'scale(1)',
            }}
            onError={() => setImageSrc("URL_DE_IMAGEN_DEFECTO")}
            crossOrigin="anonymous"
          />
          
          {/* Overlay con acciones rápidas */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity duration-300"
            style={{ opacity: isHovering ? 0.6 : 0 }}
          >
            <button 
              onClick={handleOpenModal}
              className="mx-2 p-3 bg-white rounded-full text-gray-800 hover:bg-purple-100 transition-colors duration-200"
              aria-label="Ver detalles"
            >
              <Eye size={20} />
            </button>
            
            <button 
              onClick={() => stock > 0 && addToCart(product)}
              className={`mx-2 p-3 rounded-full transition-colors duration-200 ${
                stock > 0 
                ? "bg-white text-gray-800 hover:bg-green-100" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={stock === 0}
              aria-label="Agregar al carrito"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
        
        {/* Contenido */}
        <div className="p-5">
          {/* Nombre y precio */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-800 line-clamp-1">{name}</h3>
            <span className="text-lg font-semibold text-purple-700">{formatPrice(price)}</span>
          </div>
          
          {/* Descripción */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
            {description || "Sin descripción disponible"}
          </p>
          
          {/* Detalles adicionales */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center">
              <Package size={16} className={getStockColor()} />
              <span className={`ml-1 text-xs ${getStockColor()}`}>
                {stock > 0 ? `${stock} disponibles` : "Sin stock"}
              </span>
            </div>
            
            {size && (
              <div className="flex items-center bg-gray-100 px-2 py-0.5 rounded-full">
                <span className="text-xs text-gray-700">Talle: {size}</span>
              </div>
            )}
          </div>
          
          {/* Botones */}
          <div className="space-y-2">
            <button
              onClick={handleOpenModal}
              className="w-full py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300 font-medium text-sm flex items-center justify-center"
            >
              <Eye size={16} className="mr-2" />
              Ver detalles
            </button>
            
            <button
              onClick={() => addToCart(product)}
              className={`w-full py-2 rounded-lg transition-colors duration-300 font-medium text-sm flex items-center justify-center ${
                stock > 0
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={stock === 0}
            >
              <ShoppingCart size={16} className="mr-2" />
              {stock > 0 ? "Agregar al carrito" : "Sin stock"}
            </button>
          </div>
        </div>
      </div>
      <ProductModal product={product} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default ProductCard;