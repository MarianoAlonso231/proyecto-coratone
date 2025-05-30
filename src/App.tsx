import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductSection from './components/ProductSection';
import { fetchProducts, clearProductsCache } from './lib/api';
import { Product } from './types/product';
import Login from './pages/Login';
import AdminRoute from './routes/AdminRoute';
import Layout from './components/Layout';
import { CartProvider } from "./context/CartContext";
import { clearAuthCache } from './lib/auth';

function App() {
  const [products, setProducts] = useState<{ 
    anillos: Product[]; 
    collares: Product[]; 
    aros: Product[];
    pulseras: Product[]; // Nueva categoría añadida
  }>({
    anillos: [],
    collares: [],
    aros: [],
    pulseras: [], // Inicialización añadida
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await fetchProducts();

      setProducts({
        anillos: allProducts.filter((p) => p.category === 'anillos'),
        collares: allProducts.filter((p) => p.category === 'collares'),
        aros: allProducts.filter((p) => p.category === 'aros'),
        pulseras: allProducts.filter((p) => p.category === 'pulseras'),
      });

      setLoading(false);
    };

    fetchData();

    // Limpiar caché al desmontar
    return () => {
      clearProductsCache();
      clearAuthCache();
    };
  }, []);

  useEffect(() => {
    supabase.auth.signOut().then(() => console.log("✅ Sesión cerrada automáticamente al iniciar la app."));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-600 mb-4"></div>
        <p className="text-lg font-semibold">Estamos preparando algo especial para vos...</p>
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  {products.anillos.length > 0 ? (
                    <ProductSection id="anillos" title="Anillos" products={products.anillos} />
                  ) : (
                    <p className="text-center text-gray-500">No hay anillos disponibles.</p>
                  )}
                  {products.collares.length > 0 ? (
                    <ProductSection id="collares" title="Collares" products={products.collares} />
                  ) : (
                    <p className="text-center text-gray-500">No hay collares disponibles.</p>
                  )}
                  {products.aros.length > 0 ? (
                    <ProductSection id="aros" title="Aros" products={products.aros} />
                  ) : (
                    <p className="text-center text-gray-500">No hay aritos disponibles.</p>
                  )}
                  {products.pulseras.length > 0 ? ( // Nueva sección de pulseras
                    <ProductSection id="pulseras" title="Pulseras" products={products.pulseras} />
                  ) : (
                    <p className="text-center text-gray-500">No hay pulseras disponibles.</p>
                  )}
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminRoute />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;