import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../lib/auth';
import { fetchProducts, updateProduct, addProduct } from '../lib/api';
import { uploadImage } from '../lib/storage';
import { Product } from '../types/product';

const AdminPanel = () => {
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'anillos',
    price: '',
    stock: '',
    size: '',
    description: '',
    imageFile: null as File | null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await isAdmin();
      setIsUserAdmin(adminStatus);
      if (!adminStatus) navigate('/');
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
      loadProducts();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setNewProduct((prev) => ({ ...prev, imageFile: file }));
  };

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newProduct.imageFile) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    const imageUrl = await uploadImage(newProduct.imageFile);
    if (!imageUrl) {
      alert('Error al subir la imagen.');
      return;
    }

    await addProduct({
      id: crypto.randomUUID(),
      name: newProduct.name,
      category: newProduct.category as 'anillos' | 'collares' | 'aritos',
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      size: newProduct.category === 'anillos' ? newProduct.size : undefined,
      image_url: imageUrl, // ✅ Ahora coincide con la base de datos
      description: newProduct.description,
      created_at: new Date().toISOString(),
    });

    alert('Producto agregado correctamente!');
    setNewProduct({ name: '', category: 'anillos', price: '', stock: '', size: '', description: '', imageFile: null });
    loadProducts();
  };

  return isUserAdmin ? (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Panel de Administración</h2>

      <form onSubmit={handleAddProduct} className="border p-4 mb-6">
        <h3 className="text-lg font-semibold">Agregar Nuevo Producto</h3>
        <input type="text" placeholder="Nombre" required onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <select onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
          <option value="anillos">Anillos</option>
          <option value="collares">Collares</option>
          <option value="aritos">Aritos</option>
        </select>
        <input type="number" placeholder="Precio" required onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input type="number" placeholder="Stock" required onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
        {newProduct.category === 'anillos' && (
          <input type="text" placeholder="Tamaño" onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })} />
        )}
        <input type="text" placeholder="Descripción del producto" onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit" className="bg-green-500 text-white px-3 py-1 mt-2 rounded">Agregar Producto</button>
      </form>

      {products.map((product) => (
        <div key={product.id} className="border p-4 mb-2 flex justify-between items-center">
          <span>{product.name} - Stock: {product.stock}</span>
          <button onClick={() => handleEditClick(product)} className="bg-blue-500 text-white px-3 py-1 rounded">Editar stock</button>
        </div>
      ))}

      {editingProduct && (
        <div className="border p-4 mt-4">
          <h3 className="text-lg font-semibold">Editando {editingProduct.name}</h3>
          <input type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })} />
          <button onClick={handleUpdateStock} className="bg-green-500 text-white px-3 py-1 mt-2 rounded">Guardar cambios</button>
        </div>
      )}
    </div>
  ) : null;
};

export default AdminPanel;