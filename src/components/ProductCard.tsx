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
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = () => {
    if (quantity <= stock) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(Math.min(Math.max(1, value), stock));
    }
  };

  const formatPrice = (price: number) => {
    return price
      ? new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(price)
      : "Precio no disponible";
  };

  return (
    <>
      <div className="relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {stock > 0 && stock <= 3 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            ¡Últimas unidades!
          </div>
        )}

        <div className="relative h-64 overflow-hidden bg-gray-50">
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full object-contain transition-transform duration-700 ease-out"
            style={{ transform: isHovering ? "scale(1.08)" : "scale(1)" }}
            onError={() => setImageSrc("URL_DE_IMAGEN_DEFECTO")}
            crossOrigin="anonymous"
          />

          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity duration-300" style={{ opacity: isHovering ? 0.6 : 0 }}>
            <button
              onClick={handleOpenModal}
              className="mx-2 p-3 bg-white rounded-full text-gray-800 hover:bg-purple-900 transition-colors duration-200"
              aria-label="Ver detalles"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-800 line-clamp-1">{name}</h3>
            <span className="text-lg font-semibold text-purple-900">{formatPrice(price)}</span>
          </div>

          {/* Mostrar stock disponible */}
          <p className={`text-sm font-medium mb-2 ${stock > 10 ? "text-green-600" : stock > 0 ? "text-amber-500" : "text-red-500"}`}>
            {stock > 0 ? `Stock disponible: ${stock}` : "Sin stock"}
          </p>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">{description || "Sin descripción disponible"}</p>

          {stock > 0 && (
            <div className="flex items-center mb-3 gap-2">
              <label htmlFor={`quantity-${product.id}`} className="text-sm">Cantidad:</label>
              <input
                id={`quantity-${product.id}`}
                type="number"
                value={quantity}
                min={1}
                max={stock}
                onChange={handleChange}
                className="w-16 text-center border rounded"
              />
            </div>
          )}

          <div className="space-y-2">
            <button
              onClick={handleOpenModal}
              className="w-full py-2 border border-purple-900 text-purple-900 rounded-lg hover:bg-purple-950 hover:text-white transition-colors duration-300 font-medium text-sm flex items-center justify-center"
            >
              <Eye size={16} className="mr-2" />
              Ver detalles
            </button>

            <button
              onClick={handleAddToCart}
              disabled={stock === 0}
              className={`w-full py-2 rounded-lg transition-colors duration-300 font-medium text-sm flex items-center justify-center ${
                stock > 0 ? "bg-purple-900 text-white hover:bg-purple-950" : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
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