import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl, description } = product;

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
  };

  return (
    <div className="group overflow-hidden bg-[#1E1E1E] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden h-64">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-serif text-gray-100 mb-1">{name}</h3>
        <p className="text-[#D4AF37] font-medium mb-3">{formatPrice(price)}</p>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>
        <button className="w-full py-2 border border-[#D4AF37] text-[#D4AF37] rounded-md 
          hover:bg-[#D4AF37] hover:text-white transition-colors duration-200">
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default ProductCard