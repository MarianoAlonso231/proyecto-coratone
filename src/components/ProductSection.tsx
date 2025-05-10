import React from 'react';
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
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    prevArrow: <ChevronLeft className="text-purple-800 w-8 h-8" />,
    nextArrow: <ChevronRight className="text-purple-800 w-8 h-8" />,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
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

  return (
    <section id={id} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">{title}</h2>
          <div className="w-16 h-1 bg-purple-800"></div>
        </div>
        
        <div className="relative px-8">
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <div key={product.id} className="px-2">
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;