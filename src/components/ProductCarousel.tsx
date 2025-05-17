import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import ProductCard from "./ProductCard";
import { Product } from "../types/product";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  // 1. Crea referencias para los botones
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative px-4">
      {/* 2. Añade los botones fuera del Swiper pero dentro del contenedor */}
      <div className="swiper-button-prev !left-0" ref={prevRef}>
        <svg className="w-8 h-8 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="py-8"
        // 3. Actualiza Swiper cuando los elementos estén listos
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
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

      <div className="swiper-button-next !right-0" ref={nextRef}>
        <svg className="w-8 h-8 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* 4. Estilos personalizados */}
      <style>{`
        .swiper-button-prev,
        .swiper-button-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 10;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: #f3f4f6;
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductCarousel;