import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith('/admin'); // ✅ Detecta si estamos en el panel de administración

  return (
    <div className="min-h-screen bg-white">
      {!isAdminPanel && <Header />}
      {children}
      {!isAdminPanel && <Footer />}
    </div>
  );
};

export default Layout;