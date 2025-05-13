import { supabase } from './supabaseClient';
import { Product } from '../types/product';

// Leer productos
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, category, price, stock, size, image_url, description, created_at'); // ✅ Se agregó image_url

  if (error) {
    console.error('❌ Error obteniendo productos:', error.message);
    return [];
  }

  return data || [];
}
  
// Agregar producto
export async function addProduct(product: Product): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select('id, name, category, price, stock, size, image_url, description, created_at'); // ✅ Se agregó image_url

  if (error) {
    console.error('❌ Error al agregar producto:', error.message);
    return null;
  }

  return data ? data[0] : null;
}

// Actualizar producto
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select('id, name, category, price, stock, size, image_url, description, created_at'); // ✅ Se agregó image_url

  if (error) {
    console.error('❌ Error al actualizar producto:', error.message);
    return null;
  }

  return data ? data[0] : null;
}

// Eliminar producto
export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    console.error('❌ Error al eliminar producto:', error.message);
    return false;
  }

  return true;
}