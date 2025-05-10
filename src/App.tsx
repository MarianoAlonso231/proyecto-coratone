import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { getProductsByCategory } from './data/products';

function App() {
  const rings = getProductsByCategory('ring');
  const necklaces = getProductsByCategory('necklace');
  const bracelets = getProductsByCategory('bracelet');

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Public routes */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <HeroSection />
                <ProductSection id="anillos" title="Anillos" products={rings} />
                <ProductSection id="collares" title="Collares" products={necklaces} />
                <ProductSection id="aritos" title="Aritos" products={bracelets} />
                <Footer />
                <WhatsAppButton />
              </>
            }
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;