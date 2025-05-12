import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirección
import { isAdmin } from '../lib/auth';
import { fetchProducts, updateProduct } from '../lib/api'; // Supabase
import { Product } from '../types/product';

const AdminPanel = () => {
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await isAdmin();
      setIsUserAdmin(adminStatus);
      if (!adminStatus) navigate('/'); // Redirigir si no es admin
    };

    checkAdmin();
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateStock = async () => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, { stock: editingProduct.stock });
      setEditingProduct(null);
      loadProducts(); // Recargar productos después de la edición
    }
  };

  return isUserAdmin ? (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Panel de Administración</h2>

      {products.map(product => (
        <div key={product.id} className="border p-4 mb-2 flex justify-between items-center">
          <span>{product.name} - Stock: {product.stock}</span>
          <button onClick={() => handleEditClick(product)} className="bg-blue-500 text-white px-3 py-1 rounded">
            Editar stock
          </button>
        </div>
      ))}

      {editingProduct && (
        <div className="border p-4 mt-4">
          <h3 className="text-lg font-semibold">Editando {editingProduct.name}</h3>
          <input
            type="number"
            value={editingProduct.stock}
            onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
            className="border p-2 w-full"
          />
          <button onClick={handleUpdateStock} className="bg-green-500 text-white px-3 py-1 mt-2 rounded">
            Guardar cambios
          </button>
        </div>
      )}
    </div>
  ) : null;
};

export default AdminPanel;