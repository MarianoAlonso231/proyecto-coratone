import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import { Product } from "../types/product";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [swiperInitialized, setSwiperInitialized] = useState(false);

  return (
    <div className="relative px-4">
      {/* Botón anterior personalizado fuera del área de navegación de Swiper */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 left-1 z-10 cursor-pointer bg-white rounded-full p-2 shadow-md" 
        ref={prevRef}
      >
        <svg className="w-6 h-6 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="py-8"
        onBeforeInit={(swiper) => {
          // Asignamos los refs a los elementos de navegación
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        onInit={() => {
          setSwiperInitialized(true);
        }}
        onSwiper={(swiper) => {
          // Actualiza la navegación después de que el componente se monte
          setTimeout(() => {
            if (swiper.navigation) {
              swiper.navigation.update();
            }
          });
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="h-auto">
            <div className="h-full p-2">
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botón siguiente personalizado fuera del área de navegación de Swiper */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 right-1 z-10 cursor-pointer bg-white rounded-full p-2 shadow-md" 
        ref={nextRef}
      >
        <svg className="w-6 h-6 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default ProductCarousel;