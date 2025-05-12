export interface Product {
  id: string; // UUID generado por Supabase
  name: string;
  category: 'anillos' | 'aritos' | 'collares';
  size?: string; // Opcional para anillos
  stock: number;
  price: number;
  imageUrl?: string;
  description?: string;
  created_at: string; // Fecha en formato string o Date
}