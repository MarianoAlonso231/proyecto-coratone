import React, { useState, useCallback, memo } from "react";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { ShoppingCart, X, ZoomIn } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ImageModal = memo(
  ({
    imageUrl,
    name,
    onClose,
  }: {
    imageUrl: string;
    name: string;
    onClose: () => void;
  }) => (
    <div
      className="fixed inset-0 bg-gray-50 z-[1000] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl ring-1 ring-gray-200 shadow-xl transition-transform animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 shadow transition-all"
          aria-label="Cerrar modal"
        >
          <X size={20} className="text-gray-700" />
        </button>
        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            src={imageUrl || "/placeholder.jpg"}
            alt={`Ampliación de ${name}`}
            className="object-contain max-w-full max-h-[80vh]"
            id="image-modal-title"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.jpg";
            }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
);


ImageModal.displayName = "ImageModal";

const formatPrice = (price: number) => {
  return price
    ? new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(price)
    : "Precio no disponible";
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { name, price, description, stock, size, image_url } = product;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number | null>(1);
  const [errorMsg, setErrorMsg] = useState("");

  const handleImageClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsImageModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsImageModalOpen(false);
  }, []);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!quantity || quantity <= 0 || quantity > stock) {
      setErrorMsg(`Selecciona una cantidad válida entre 1 y ${stock}`);
      return;
    }
    addToCart(product, quantity);
    setQuantity(1);
    setErrorMsg("");
  }, [addToCart, product, quantity, stock]);

  const handleQuantityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setQuantity(null);
      return;
    }

    const parsed = parseInt(rawValue, 10);
    if (!isNaN(parsed)) {
      setQuantity(Math.min(parsed, stock));
    }
  }, [stock]);

  const stockStatus = stock > 10 ? "alto" : stock > 3 ? "medio" : stock > 0 ? "bajo" : "agotado";
  const stockTextClass = {
    alto: "text-green-600",
    medio: "text-green-600",
    bajo: "text-amber-500",
    agotado: "text-red-500"
  }[stockStatus];

  return (
    <>
      {isImageModalOpen && (
        <ImageModal
          imageUrl={image_url}
          name={name}
          onClose={handleCloseModal}
        />
      )}

      <div className="group relative bg-white rounded-xl transition-all duration-300 overflow-hidden h-full flex flex-col">

        {stock > 0 && stock <= 3 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            ¡Últimas unidades!
          </div>
        )}

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
            <div className="flex flex-col gap-1 mb-3 mt-auto">
              <div className="flex items-center gap-2">
                <label htmlFor={`quantity-${product.id}`} className="text-sm">Cantidad:</label>
                <input
                  id={`quantity-${product.id}`}
                  type="number"
                  value={quantity ?? ""}
                  min={1}
                  max={stock}
                  onChange={handleQuantityChange}
                  className="w-16 text-center border rounded p-1"
                  aria-label={`Cantidad de ${name} a agregar, máximo ${stock}`}
                />
              </div>
              {errorMsg && <span className="text-red-500 text-xs">{errorMsg}</span>}
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
