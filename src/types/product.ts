export interface Product {
  id: string; // UUID generado por Supabase
  name: string;
  category: 'anillos' | 'aros' | 'collares' | 'pulseras'; // Agregamos 'pulseras'
  size?: string | null;
  stock: number;
  price: number;
  image_url: string;
  description?: string;
  created_at: string; // Fecha en formato string o Date
}