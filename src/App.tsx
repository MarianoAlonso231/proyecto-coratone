import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import { getProductsByCategory } from './data/products';

function App() {
  const rings = getProductsByCategory('ring');
  const necklaces = getProductsByCategory('necklace');
  const bracelets = getProductsByCategory('bracelet');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ProductSection id="rings" title="Anillos" products={rings} />
      <ProductSection id="necklaces" title="Collares" products={necklaces} />
      <ProductSection id="bracelets" title="Pulseras" products={bracelets} />
      <Footer />
    </div>
  );
}

export default App