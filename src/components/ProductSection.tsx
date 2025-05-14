import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/product";
import { Swiper, SwiperSlide } from "swiper/react"; // ✅ Importación de Swiper
import { Navigation } from "swiper/modules"; // ✅ Módulo de navegación
import "swiper/css"; // ✅ Estilos base de Swiper
import "swiper/css/navigation"; // ✅ Estilos para la navegación con flechas

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
          <Swiper
            modules={[Navigation]} // ✅ Activamos la navegación manual
            spaceBetween={20} // ✅ Espacio entre productos
            slidesPerView={1} // ✅ Mostrar un producto por vista (puedes ajustar)
            navigation // ✅ Agrega flechas de navegación
            breakpoints={{
              640: { slidesPerView: 2 }, // ✅ En pantallas pequeñas, mostrar 2 productos
              1024: { slidesPerView: 3 }, // ✅ En pantallas grandes, mostrar 3 productos
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">No hay productos disponibles.</p>
        )}
      </div>
    </section>
  );
};

export default ProductSection;