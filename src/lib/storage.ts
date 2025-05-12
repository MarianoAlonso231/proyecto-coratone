import { supabase } from './supabaseClient';

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    console.log("📸 Nombre del archivo generado:", fileName);

    // ✅ Convertir el archivo a Blob con el `Content-Type` correcto
    const fileBlob = new Blob([file], { type: file.type });

    // ✅ Subir la imagen con el tipo MIME correcto
    const { data, error } = await supabase.storage.from('products').upload(fileName, fileBlob, {
      cacheControl: '3600',
      upsert: true, // ✅ Evita duplicados al subir el mismo archivo
    });

    if (error) throw new Error(`❌ Error al subir la imagen: ${error.message}`);

    console.log("📂 Imagen subida correctamente:", data);

    // ✅ Construir la URL manualmente
    const publicUrl = `https://xtabqtyclyliadkzajxh.supabase.co/storage/v1/object/public/products/${fileName}`;
    console.log("🔗 URL generada manualmente:", publicUrl);

    return publicUrl;
  } catch (err) {
    console.error("❌ Error en uploadImage:", err);
    return null;
  }
};