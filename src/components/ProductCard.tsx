import React, { useState } from 'react';
import { Product } from '../types';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, price, imageUrl, description } = product;

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
  };

  return (
    <>
      <div className="group overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative overflow-hidden h-64">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-serif text-gray-800 mb-1">{name}</h3>
          <p className="text-purple-800 font-medium mb-3">{formatPrice(price)}</p>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2 border border-purple-800 text-purple-800 rounded-md 
              hover:bg-purple-800 hover:text-white transition-colors duration-200"
          >
            Ver detalles
          </button>
        </div>
      </div>

      <ProductModal 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;