import { supabase } from './supabaseClient';

// 🔥 Reiniciar completamente la autenticación
export const resetAuth = async () => {
  try {
    await supabase.auth.signOut(); // ✅ Cierra sesión correctamente
    localStorage.clear(); // ✅ Borra almacenamiento local
    sessionStorage.clear(); // ✅ Borra almacenamiento de sesión
    indexedDB.deleteDatabase("supabase"); // 🔄 Borra caché de Supabase
    console.log("🔄 Autenticación completamente reiniciada.");
  } catch (err) {
    console.error("❌ Error al reiniciar autenticación:", err);
  }
};

// ✅ Verificar si el usuario es administrador
export const isAdmin = async (): Promise<boolean> => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      console.error("❌ No se pudo obtener el usuario autenticado.");
      return false;
    }

    const userId = userData.user.id;
    console.log("🔍 ID autenticado correctamente:", userId);

    const { data: roleData, error: roleError } = await supabase
      .from('users')
      .select('*') // 🔥 Obtiene todas las columnas para verificar si `role` realmente existe
      .eq('id', userId)
      .maybeSingle();

    console.log("🔎 Datos completos del usuario:", roleData);
    console.log("🔎 Rol obtenido:", roleData?.role);

    if (roleError) {
      console.error("❌ Error verificando rol de usuario:", roleError.message);
      return false;
    }

    return roleData?.role?.trim().toLowerCase() === 'admin';
  } catch (err) {
    console.error("❌ Error inesperado en isAdmin:", err);
    return false;
  }
};

// ✅ Iniciar sesión con email y contraseña
export const signIn = async (email: string, password: string) => {
  try {
    await resetAuth(); // 🔄 Reinicia autenticación completamente antes de iniciar sesión

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("❌ Error al iniciar sesión:", error.message);
      return null;
    }

    console.log("✅ Usuario autenticado correctamente:", data?.user);

    // 🔄 Fuerza la actualización de la sesión para evitar autenticaciones incorrectas
    await supabase.auth.refreshSession();
    console.log("🔄 Sesión actualizada.");

    return data?.user;
  } catch (err) {
    console.error("❌ Error inesperado en signIn:", err);
    return null;
  }
};

// ✅ Cerrar sesión
export const signOut = async () => {
  try {
    await resetAuth(); // 🔄 Asegurar cierre total de sesión
    console.log("✅ Sesión cerrada correctamente.");
    return true;
  } catch (err) {
    console.error("❌ Error inesperado en signOut:", err);
    return false;
  }
};