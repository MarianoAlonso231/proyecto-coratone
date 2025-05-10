import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import { getProductsByCategory } from './data/products';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const rings = getProductsByCategory('ring');
  const necklaces = getProductsByCategory('necklace');
  const bracelets = getProductsByCategory('bracelet');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ProductSection id="anillos" title="Anillos" products={rings} />
      <ProductSection id="collares" title="Collares" products={necklaces} />

      <ProductSection id="aritos" title="Aritos" products={bracelets} />

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App