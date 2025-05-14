import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../lib/auth';
import { fetchProducts, updateProduct, addProduct, deleteProduct } from '../lib/api';
import { uploadImage } from '../lib/storage';
import { Product } from '../types/product';

const AdminPanel = () => {
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
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
    setIsEditing(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, isEditMode = false) => {
    const file = event.target.files?.[0] || null;
    
    if (isEditMode) {
      setUploadedImage(file);
    } else {
      setNewProduct((prev) => ({ ...prev, imageFile: file }));
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    
    let updates: Partial<Product> = {
      name: editingProduct.name,
      price: editingProduct.price,
      stock: editingProduct.stock,
      description: editingProduct.description || '',
    };
    
    if (editingProduct.category === 'anillos') {
      updates.size = editingProduct.size || '';
    }
    
    // Si hay una nueva imagen, súbela primero
    if (uploadedImage) {
      const imageUrl = await uploadImage(uploadedImage);
      if (imageUrl) {
        updates.image_url = imageUrl;
      }
    }
    
    await updateProduct(editingProduct.id, updates);
    setEditingProduct(null);
    setIsEditing(false);
    setUploadedImage(null);
    loadProducts();
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
      category: newProduct.category as 'anillos' | 'collares' | 'aros',
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      size: newProduct.category === 'anillos' ? newProduct.size : undefined,
      image_url: imageUrl,
      description: newProduct.description,
      created_at: new Date().toISOString(),
    });

    alert('Producto agregado correctamente!');
    setNewProduct({ name: '', category: 'anillos', price: '', stock: '', size: '', description: '', imageFile: null });
    loadProducts();
  };
  
  const confirmDelete = (productId: string) => {
    setIsDeleting(productId);
  };
  
  const handleDeleteProduct = async (productId: string) => {
    const success = await deleteProduct(productId);
    if (success) {
      alert('Producto eliminado con éxito');
      loadProducts();
    } else {
      alert('Error al eliminar el producto');
    }
    setIsDeleting(null);
  };
  
  const cancelDelete = () => {
    setIsDeleting(null);
  };

  return isUserAdmin ? (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Panel de Administración</h2>

      {/* Formulario para agregar nuevo producto */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Producto</h3>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input 
              type="text" 
              placeholder="Nombre del producto" 
              required 
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select 
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              value={newProduct.category}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="anillos">Anillos</option>
              <option value="collares">Collares</option>
              <option value="aros">Aros</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <input 
              type="number" 
              placeholder="Precio" 
              required 
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input 
              type="number" 
              placeholder="Stock" 
              required 
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          {newProduct.category === 'anillos' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tamaño</label>
              <input 
                type="text" 
                placeholder="Tamaño del anillo" 
                value={newProduct.size}
                onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
          
          <div className={newProduct.category === 'anillos' ? "md:col-span-2" : ""}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea 
              placeholder="Descripción del producto" 
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => handleFileChange(e)}
              required 
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="md:col-span-2">
            <button 
              type="submit" 
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Agregar Producto
            </button>
          </div>
        </form>
      </div>

      {/* Lista de productos */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Gestionar Productos</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full h-16 border-b border-gray-200">
                <th className="text-left pl-4">Imagen</th>
                <th className="text-left pl-4">Nombre</th>
                <th className="text-left pl-4">Categoría</th>
                <th className="text-left pl-4">Precio</th>
                <th className="text-left pl-4">Stock</th>
                <th className="text-left pl-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="h-20 border-b border-gray-200">
                  <td className="pl-4">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="h-14 w-14 object-cover rounded"
                    />
                  </td>
                  <td className="pl-4">{product.name}</td>
                  <td className="pl-4 capitalize">{product.category}</td>
                  <td className="pl-4">${product.price}</td>
                  <td className="pl-4">{product.stock}</td>
                  <td className="pl-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditClick(product)} 
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => confirmDelete(product.id)} 
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de edición */}
      {isEditing && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-2xl w-full">
            <h3 className="text-xl font-semibold mb-4">Editar: {editingProduct.name}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input 
                  type="text" 
                  value={editingProduct.name} 
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                <input 
                  type="number" 
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input 
                  type="number" 
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              {editingProduct.category === 'anillos' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tamaño</label>
                  <input 
                    type="text" 
                    value={editingProduct.size || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, size: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}
              
              <div className={editingProduct.category === 'anillos' ? "md:col-span-2" : ""}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea 
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center space-x-4 mb-2">
                  <label className="block text-sm font-medium text-gray-700">Imagen actual:</label>
                  <img 
                    src={editingProduct.image_url}
                    alt={editingProduct.name}
                    className="h-14 w-14 object-cover rounded"
                  />
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nueva imagen (opcional)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(e, true)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button 
                onClick={() => {setIsEditing(false); setEditingProduct(null); setUploadedImage(null);}}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleUpdateProduct}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de confirmación para eliminar */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirmar eliminación</h3>
            <p className="mb-6">¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.</p>
            
            <div className="flex justify-end space-x-2">
              <button 
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => handleDeleteProduct(isDeleting)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default AdminPanel;