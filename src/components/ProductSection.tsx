import React from "react";
import ProductCarousel from "./ProductCarousel";
import { Product } from "../types/product";

interface ProductSectionProps {
  title: string;
  id: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, id, products }) => {
  return (
    <section id={id} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">{title}</h2>
          <div className="w-16 h-1 bg-purple-800"></div>
        </div>

        {products.length > 0 ? (
          <ProductCarousel products={products} /> // ✅ Reutilizamos el nuevo componente
        ) : (
          <p className="text-center text-gray-500">No hay productos disponibles.</p>
        )}
      </div>
    </section>
  );
};

export default ProductSection;