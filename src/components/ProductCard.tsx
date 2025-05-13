import React, { useState, useEffect } from 'react';
import { Product } from '../types/product';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
  onModalOpen?: () => void; // Callback cuando se abre el modal
  onModalClose?: () => void; // Callback cuando se cierra el modal
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onModalOpen, onModalClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(product.image_url || 'URL_DE_IMAGEN_DEFECTO');
  const { name, price, description } = product;

  useEffect(() => {
    if (imageSrc && imageSrc.trim() !== '') {
      fetch(imageSrc, { method: 'HEAD' })
        .then((res) => {
          if (!res.ok) throw new Error(`Imagen inaccesible (${res.status})`);
        })
        .catch(() => {
          setImageSrc('URL_DE_IMAGEN_DEFECTO');
        });
    }
  }, [product.image_url]); // ✅ Evita recargar la imagen innecesariamente

  const handleOpenModal = () => {
    setIsModalOpen(true);
    onModalOpen?.();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onModalClose?.();
  };

  return (
    <>
      <div className="group overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 scale-95 hover:scale-100">
        <div className="relative h-64 flex justify-center items-center bg-gray-100">
          <img
            src={imageSrc}
            alt={name}
            className="max-w-full h-64 object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
            onError={() => setImageSrc('URL_DE_IMAGEN_DEFECTO')}
            crossOrigin="anonymous"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif text-gray-800 mb-2">{name}</h3>
          <p className="text-purple-800 font-medium mb-3">
            {price
              ? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price)
              : 'Precio no disponible'}
          </p>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description || 'Sin descripción'}</p>
          <button
            onClick={handleOpenModal}
            className="w-full py-2 border border-purple-800 text-purple-800 rounded-md hover:bg-purple-800 hover:text-white transition-colors duration-300 active:scale-95"
          >
            Ver detalles
          </button>
        </div>
      </div>
      <ProductModal product={product} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default ProductCard;