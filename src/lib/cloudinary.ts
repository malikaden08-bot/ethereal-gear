// Cloudinary Image Optimization & Responsive Transformation Helper
export function getOptimizedImageUrl(
  originalUrl: string,
  options: { width?: number; height?: number; crop?: string; quality?: string } = {}
): string {
  if (!originalUrl) return '';

  // If already a Cloudinary URL, inject performance transformation flags
  if (originalUrl.includes('res.cloudinary.com')) {
    const widthParam = options.width ? `w_${options.width},` : '';
    const heightParam = options.height ? `h_${options.height},` : '';
    const cropParam = options.crop ? `c_${options.crop},` : 'c_fill,';
    const qualityParam = options.quality ? `q_${options.quality},` : 'q_auto,';
    const transformStr = `f_auto,${qualityParam}${cropParam}${widthParam}${heightParam}`;

    return originalUrl.replace('/upload/', `/upload/${transformStr}/`);
  }

  // Return standard fallback image URL
  return originalUrl;
}
