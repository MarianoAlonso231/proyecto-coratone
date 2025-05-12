import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { isAdmin } from '../lib/auth';
import AdminPanel from '../components/AdminPanel';

const AdminRoute = () => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const admin = await isAdmin();
        setAuthorized(admin);

        if (!admin) navigate('/', { replace: true });
      } catch {
        navigate('/');
      }
    };

    checkAccess();
  }, [navigate]);

  if (authorized === false) return <Navigate to="/" replace />;
  if (authorized === null) return <p className="text-center text-gray-600">Cargando...</p>;

  return <AdminPanel />;
};

export default AdminRoute;