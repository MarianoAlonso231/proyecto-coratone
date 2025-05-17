import React, { useMemo } from "react";
import ProductCarousel from "./ProductCarousel";
import { Product } from "../types/product";
import { ChevronRight } from "lucide-react";

interface ProductSectionProps {
  title: string;
  id: string;
  products: Product[] | null;
  subtitle?: string;
  showAll?: boolean;
  allProductsPath?: string;
  filterOptions?: {
    showOutOfStock?: boolean;
    showNoImage?: boolean;
  };
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  id,
  products,
  subtitle,
  showAll = false,
  allProductsPath = "/productos",
  filterOptions = {
    showOutOfStock: false,
    showNoImage: false,
  },
}) => {
  // Usando useMemo para evitar filtrado innecesario en cada renderizado
  const validProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(product => {
      // Filtra productos sin imagen a menos que se indique lo contrario
      if (!product.image_url && !filterOptions.showNoImage) return false;
      
      // Filtra productos sin stock a menos que se indique lo contrario
      if (product.stock <= 0 && !filterOptions.showOutOfStock) return false;
      
      return true;
    });
  }, [products, filterOptions.showNoImage, filterOptions.showOutOfStock]);

  // Estado para determinar qué mostrar basado en la carga y disponibilidad
  const sectionState = !products 
    ? "loading" 
    : validProducts.length > 0 
      ? "hasProducts" 
      : "noProducts";

  return (
    <section id={id} className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-3 text-center">{title}</h2>
          
          {subtitle && (
            <p className="text-gray-600 text-center max-w-2xl mb-4">{subtitle}</p>
          )}
          
          <div className="w-16 h-1 bg-purple-800 rounded-full"></div>
        </div>

        {sectionState === "loading" && (
          <div className="flex flex-col items-center py-12">
            <div className="animate-pulse flex space-x-4 mb-4">
              <div className="rounded-full bg-gray-200 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
            <p className="text-gray-500 mt-4">Cargando productos...</p>
          </div>
        )}

        {sectionState === "hasProducts" && (
          <>
            <ProductCarousel products={validProducts} />
            
            {showAll && validProducts.length >= 4 && (
              <div className="flex justify-center mt-8">
                <a 
                  href={allProductsPath} 
                  className="inline-flex items-center px-6 py-2.5 border-2 border-purple-900 text-purple-900 hover:bg-purple-900 hover:text-white font-medium rounded-lg transition-colors duration-300"
                >
                  Ver todos los productos
                  <ChevronRight size={18} className="ml-2" />
                </a>
              </div>
            )}
          </>
        )}

        {sectionState === "noProducts" && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-3 mb-4">
              <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No hay productos disponibles</h3>
            <p className="text-gray-600">
              En este momento no hay productos disponibles en esta categoría.
              Por favor, vuelve a consultar más tarde.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(ProductSection);