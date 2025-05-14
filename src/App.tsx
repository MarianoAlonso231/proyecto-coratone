import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';

import { fetchProducts } from './lib/api';
import { Product } from './types/product';
import Login from './pages/Login';
import AdminRoute from './routes/AdminRoute';
import Layout from './components/Layout';
import { CartProvider } from "./context/CartContext"; // ✅ Ahora el carrito es accesible en toda la aplicación

function App() {
  const [products, setProducts] = useState<{ anillos: Product[]; collares: Product[]; aritos: Product[] }>({
    anillos: [],
    collares: [],
    aritos: [],
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await fetchProducts();

      setProducts({
        anillos: allProducts.filter((p) => p.category === 'anillos'),
        collares: allProducts.filter((p) => p.category === 'collares'),
        aritos: allProducts.filter((p) => p.category === 'aritos'),
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    supabase.auth.signOut().then(() => console.log("✅ Sesión cerrada automáticamente al iniciar la app."));
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Cargando productos...</p>;
  }

  return (
    <CartProvider> {/* 🛒 Envuelve toda la app para que el contexto esté disponible en cualquier componente */}
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
                  {products.aritos.length > 0 ? (
                    <ProductSection id="aritos" title="Aritos" products={products.aritos} />
                  ) : (
                    <p className="text-center text-gray-500">No hay aritos disponibles.</p>
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