import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductSectionProps {
  title: string;
  id: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, id, products }) => {
  return (
    <section id={id} className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-100 mb-4">{title}</h2>
          <div className="w-16 h-1 bg-[#D4AF37]"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection