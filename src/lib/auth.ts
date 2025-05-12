import { supabase } from './supabaseClient';

// Reiniciar completamente la autenticación
export const resetAuth = async () => {
  try {
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    indexedDB.deleteDatabase("supabase");
  } catch {
    // Manejo de errores silencioso para producción
  }
};

// Verificar si el usuario es administrador
export const isAdmin = async (): Promise<boolean> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return false;

    const { data: roleData } = await supabase
      .from('users')
      .select('role') // Consulta más eficiente, solo obtiene el rol
      .eq('id', userData.user.id)
      .maybeSingle();

    return roleData?.role?.trim().toLowerCase() === 'admin';
  } catch {
    return false;
  }
};

// Iniciar sesión con email y contraseña
export const signIn = async (email: string, password: string) => {
  try {
    await resetAuth();
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