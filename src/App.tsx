import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import { getProductsByCategory } from './data/products';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const anillos = getProductsByCategory('anillos');
  const collares = getProductsByCategory('collares');
  const aritos = getProductsByCategory('aritos');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ProductSection id="anillos" title="Anillos" products={anillos} />
      <ProductSection id="collares" title="Collares" products={collares} />

      <ProductSection id="aritos" title="Aritos" products={aritos} />

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App