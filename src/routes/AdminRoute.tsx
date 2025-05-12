import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { isAdmin } from '../lib/auth'; // Importar la función correctamente
import AdminPanel from '../components/AdminPanel'; // Panel de administración

const AdminRoute = () => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const admin = await isAdmin();
        console.log("🔍 ¿Es administrador?", admin); // 👀 Log para depuración

        setAuthorized(admin);

        if (!admin) {
          navigate('/', { replace: true }); // 🔄 Usa `{ replace: true }` para evitar historial incorrecto
        }
      } catch (error) {
        console.error('❌ Error verificando acceso:', error);
        navigate('/'); // Redirige si hay un fallo inesperado
      }
    };

    checkAccess();
  }, [navigate]); // 🔄 Asegura que la navegación no se rompa en algunos casos

  if (authorized === false) {
    return <Navigate to="/" replace />; // 🔥 Redirige directamente si no es administrador
  }

  if (authorized === null) {
    return <p className="text-center text-gray-600">Cargando...</p>; // 🔄 Muestra un mensaje de carga mientras verifica acceso
  }

  return <AdminPanel />;
};

export default AdminRoute;