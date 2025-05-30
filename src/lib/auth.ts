import { supabase } from './supabaseClient';

// Caché de roles de administrador
interface AdminRoleCache {
  [userId: string]: {
    isAdmin: boolean;
    timestamp: number;
  }
}

const ADMIN_CACHE_DURATION = 30 * 60 * 1000; // 30 minutos
let adminRoleCache: AdminRoleCache = {};

// Reiniciar completamente la autenticación
export const resetAuth = async () => {
  try {
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    adminRoleCache = {}; // Limpiar caché de roles
  } catch {
    // Manejo de errores silencioso para producción
  }
};

// Verificar si el usuario es administrador con caché
export const isAdmin = async (): Promise<boolean> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return false;

    const userId = userData.user.id;
    const cachedRole = adminRoleCache[userId];

    // Verificar caché válida
    if (cachedRole && (Date.now() - cachedRole.timestamp) < ADMIN_CACHE_DURATION) {
      return cachedRole.isAdmin;
    }

    const { data: roleData } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .maybeSingle();

    const isAdminRole = roleData?.role?.trim().toLowerCase() === 'admin';

    // Actualizar caché
    adminRoleCache[userId] = {
      isAdmin: isAdminRole,
      timestamp: Date.now()
    };

    return isAdminRole;
  } catch {
    return false;
  }
};

// Iniciar sesión con email y contraseña
export const signIn = async (email: string, password: string) => {
  try {
    await resetAuth(); // Esto también limpia la caché
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return null;

    await supabase.auth.refreshSession();
    return data?.user;
  } catch {
    return null;
  }
};

// Cerrar sesión
export const signOut = async () => {
  try {
    await resetAuth();
    return true;
  } catch {
    return false;
  }
};

// Limpiar caché de roles
export const clearAuthCache = () => {
  adminRoleCache = {};
};