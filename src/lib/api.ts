import { supabase } from './supabaseClient';
import { Product } from '../types/product';

// Sistema de caché
interface CacheData {
  data: Product[] | null;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
let productsCache: CacheData = {
  data: null,
  timestamp: 0
};

// Leer productos con caché
export async function fetchProducts(): Promise<Product[]> {
  // Verificar caché
  if (productsCache.data && (Date.now() - productsCache.timestamp) < CACHE_DURATION) {
    return productsCache.data;
  }

  const { data, error } = await supabase
    .from('products')
    .select('id, name, category, price, stock, image_url, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error obteniendo productos:', error.message);
    return [];
  }

  // Actualizar caché
  productsCache = {
    data: data || [],
    timestamp: Date.now()
  };

  return data || [];
}

// Obtener detalles completos de un producto
export async function fetchProductDetails(productId: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  if (error) {
    console.error(`❌ Error obteniendo detalles del producto ${productId}:`, error.message);
    return null;
  }

  return data;
}
  
// Agregar producto
export async function addProduct(product: Product): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) {
    console.error('❌ Error al agregar producto:', error.message);
    return null;
  }

  // Invalidar caché al agregar un producto
  productsCache = { data: null, timestamp: 0 };
  return data;
}

// Actualizar producto
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('❌ Error al actualizar producto:', error.message);
    return null;
  }

  // Invalidar caché al actualizar un producto
  productsCache = { data: null, timestamp: 0 };
  return data;
}

// Eliminar producto
export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('❌ Error al eliminar producto:', error.message);
    return false;
  }

  // Invalidar caché al eliminar un producto
  productsCache = { data: null, timestamp: 0 };
  return true;
}

// Limpiar caché
export function clearProductsCache() {
  productsCache = { data: null, timestamp: 0 };
}