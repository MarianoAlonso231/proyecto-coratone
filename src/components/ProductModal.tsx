import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Product } from '../types/product';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

  const formatPrice = (price: number): string =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);

  const isLowStock = product.stock < 5; // ✅ Detecta productos con stock bajo
  const [imageSrc, setImageSrc] = useState(product.image_url || 'URL_DE_IMAGEN_DEFECTO'); // ✅ Manejo inicial de imagen

  useEffect(() => {
    if (!product.image_url) {
      setImageSrc('URL_DE_IMAGEN_DEFECTO');
    } else {
      fetch(product.image_url, { method: 'HEAD' })
        .then((res) => {
          if (!res.ok) throw new Error(`Imagen inaccesible (${res.status})`);
        })
        .catch(() => setImageSrc('URL_DE_IMAGEN_DEFECTO'));
    }
  }, [product.image_url]);

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
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
              onError={() => setImageSrc('URL_DE_IMAGEN_DEFECTO')}
            />
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-2xl font-serif text-gray-800 mb-2">{product.name}</h3>
              <p className="text-purple-800 text-xl font-medium mb-2">{formatPrice(product.price)}</p>
              <p
                className={`text-sm font-medium mb-4 ${
                  isLowStock ? 'text-red-600' : 'text-green-700'
                }`}
              >
                {isLowStock ? `⚠️ Stock bajo: ${product.stock} unidades` : `Disponibles: ${product.stock}`}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* ✅ Botón de WhatsApp al fondo del modal */}
        <div className="p-6 md:p-8 bg-white">
          <a
            href={`https://wa.me/5493816080780?text=Hola! Me interesa el producto ${product.name} (${formatPrice(product.price)})`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 px-4 bg-purple-800 text-white text-center rounded-md hover:bg-purple-900 transition-colors duration-300"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;