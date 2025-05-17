import { supabase } from './supabaseClient';

/**
 * Sube una imagen a Supabase Storage optimizada para carga rápida
 * @param file Archivo de imagen a subir
 * @param options Opciones adicionales para la carga
 * @returns URL pública de la imagen o null en caso de error
 */
export const uploadImage = async (
  file: File, 
  options: { 
    maxSizeKB?: number,
    compressQuality?: number, 
    resizeWidth?: number
  } = {}
): Promise<string | null> => {
  try {
    // Validar tamaño máximo de archivo (por defecto 5MB)
    const maxSize = (options.maxSizeKB || 5000) * 1024;
    if (file.size > maxSize) {
      throw new Error(`❌ El archivo excede el tamaño máximo permitido (${options.maxSizeKB || 5000}KB)`);
    }

    // Comprobar si es una imagen y optimizarla
    if (file.type.startsWith('image/')) {
      file = await optimizeImage(file, options.compressQuality || 0.8, options.resizeWidth);
      console.log("🔄 Imagen optimizada:", `${(file.size / 1024).toFixed(2)}KB`);
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    console.log("📸 Nombre del archivo generado:", fileName);

    // Crear un ArrayBuffer para lectura más eficiente
    const arrayBuffer = await file.arrayBuffer();
    const fileBlob = new Blob([arrayBuffer], { type: file.type });

    // ✅ Subir la imagen con configuración optimizada
    const { data, error } = await supabase.storage.from('products').upload(fileName, fileBlob, {
      cacheControl: '31536000', // Cache por 1 año
      upsert: true,
      contentType: file.type,
    });

    if (error) throw new Error(`❌ Error al subir la imagen: ${error.message}`);

    console.log("📂 Imagen subida correctamente:", data);

    // ✅ Obtener la URL pública utilizando el método de Supabase
    const { data: publicUrlData } = supabase.storage.from('products').getPublicUrl(fileName);
    
    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error('❌ No se pudo obtener la URL pública');
    }
    
    console.log("🔗 URL pública generada:", publicUrlData.publicUrl);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("❌ Error en uploadImage:", err);
    return null;
  }
};

/**
 * Optimiza una imagen reduciendo su tamaño y calidad
 * @param file Archivo de imagen original
 * @param quality Calidad de compresión (0-1)
 * @param maxWidth Ancho máximo en píxeles
 * @returns Archivo de imagen optimizado
 */
const optimizeImage = async (
  file: File,
  quality: number = 0.8,
  maxWidth?: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // Calcular dimensiones proporcionales si se especifica maxWidth
        let width = img.width;
        let height = img.height;
        
        if (maxWidth && width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = Math.round(height * ratio);
        }
        
        // Crear canvas para la optimización
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo crear el contexto del canvas'));
          return;
        }
        
        // Dibujar la imagen con las nuevas dimensiones
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convertir a formato apropiado según el tipo original
        let mimeType = file.type;
        if (mimeType === 'image/png' && !containsTransparency(ctx, width, height)) {
          mimeType = 'image/jpeg'; // Convertir PNG sin transparencia a JPEG
        }
        
        // Obtener la imagen optimizada como blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('No se pudo generar el blob'));
              return;
            }
            
            // Crear nuevo File a partir del blob optimizado
            const optimizedFile = new File([blob], file.name, {
              type: mimeType,
              lastModified: Date.now(),
            });
            
            resolve(optimizedFile);
          },
          mimeType,
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Error al cargar la imagen'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };
  });
};

/**
 * Verifica si una imagen PNG contiene píxeles transparentes
 */
const containsTransparency = (ctx: CanvasRenderingContext2D, width: number, height: number): boolean => {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  // Verificar si hay píxeles con transparencia (canal alfa < 255)
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) {
      return true;
    }
  }
  
  return false;
};