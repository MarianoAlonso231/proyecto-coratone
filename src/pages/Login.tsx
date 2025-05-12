import { useState } from 'react';
import { signIn } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const user = await signIn(email, password);

    if (user) {
      alert('Inicio de sesión exitoso');
      navigate('/admin'); // Redirige al panel de administración
    } else {
      setErrorMessage('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold text-center mb-4">Iniciar sesión</h2>
        {errorMessage && <p className="text-red-500 text-center mb-2">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="border p-2 w-full mb-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;