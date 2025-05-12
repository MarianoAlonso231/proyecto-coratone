import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../types/product';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden transform transition-all duration-500 ease-in-out">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-full">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-serif text-gray-800 mb-2">{product.name}</h3>
            <p className="text-purple-800 text-xl font-medium mb-4">
              {formatPrice(product.price)}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>
            
            <div className="space-y-4">
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Detalles del producto:</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Material de alta calidad</li>
                  <li>• Diseño exclusivo</li>
                  <li>• Garantía de fabricación</li>
                </ul>
              </div>
              
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
      </div>
    </div>
  );
};

export default ProductModal;