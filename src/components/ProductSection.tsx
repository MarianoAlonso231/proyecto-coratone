import React, { useRef } from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProductSectionProps {
  title: string;
  id: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, id, products }) => {
  const sliderRef = useRef<Slider>(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const handleModalOpen = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPause();
    }
  };

  const handleModalClose = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  };

  return (
    <section id={id} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">{title}</h2>
          <div className="w-16 h-1 bg-purple-800"></div>
        </div>
        
        <div className="relative px-12">
          <Slider ref={sliderRef} {...sliderSettings}>
            {products.map((product) => (
              <div key={product.id} className="px-3">
                <ProductCard 
                  product={product} 
                  onModalOpen={handleModalOpen}
                  onModalClose={handleModalClose}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-300 -translate-x-6"
    >
      <ChevronLeft className="text-purple-800 w-6 h-6" />
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-300 translate-x-6"
    >
      <ChevronRight className="text-purple-800 w-6 h-6" />
    </button>
  );
};

export default ProductSection;