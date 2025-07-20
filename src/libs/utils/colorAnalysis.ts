/**
 * Calculate average brightness of an image
 * @param pixels - Image pixel data
 * @returns Average brightness value (0-255)
 */
function calculateAverageBrightness(pixels: Uint8ClampedArray): number {
  let totalBrightness = 0;
  const totalPixels = pixels.length / 4;

  for (let i = 0; i < pixels.length; i += 4) {
    const red = pixels[i];
    const green = pixels[i + 1];
    const blue = pixels[i + 2];
    
    // Calculate brightness using standard formula
    const brightness = (red * 0.299 + green * 0.587 + blue * 0.114);
    totalBrightness += brightness;
  }

  return totalBrightness / totalPixels;
}

/**
 * Check for presence indicators based on environment
 * @param red - Red value (0-255)
 * @param green - Green value (0-255) 
 * @param blue - Blue value (0-255)
 * @param isDarkEnvironment - Whether the image is in dark environment
 * @returns true if pixel indicates presence
 */
function checkPresencePixel(red: number, green: number, blue: number, isDarkEnvironment: boolean): boolean {
  if (isDarkEnvironment) {
    // Dark environment: look for warm tones
    const warmth = red + green - blue * 2;
    return warmth > 100 && red > 80 && green > 60;
  } else {
    // Bright environment: avoid dominant red (clothes, objects)
    const isRed = red > 150 && red > green * 1.3 && red > blue * 1.3;
    return !isRed;
  }
}

/**
 * Adaptive face detection using color analysis
 * Detects presence of faces by analyzing color pixels in different lighting conditions
 * @param image - The image element to check
 * @returns true if face is likely present, false otherwise
 */
export function checkRedPixels(image: HTMLImageElement | HTMLCanvasElement): boolean {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return false;

    canvas.width = image instanceof HTMLImageElement ? image.naturalWidth : image.width;
    canvas.height = image instanceof HTMLImageElement ? image.naturalHeight : image.height;
    
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    const avgBrightness = calculateAverageBrightness(pixels);
    const isDarkEnvironment = avgBrightness <= 120;
    
    let targetPixels = 0;
    const totalPixels = pixels.length / 4; // Each pixel has 4 values: RGBA

    for (let i = 0; i < pixels.length; i += 4) {
      const red = pixels[i];
      const green = pixels[i + 1];
      const blue = pixels[i + 2];
      
      if (checkPresencePixel(red, green, blue, isDarkEnvironment)) {
        targetPixels++;
      }
    }

    const targetPercentage = (targetPixels / totalPixels) * 100;
    
    if (isDarkEnvironment) {
      // Dark environment: detect warm pixels
      const threshold = 15;
      console.log(`Color analysis (dark): ${targetPixels}/${totalPixels} warm pixels (${targetPercentage.toFixed(2)}%), brightness: ${avgBrightness.toFixed(1)}, threshold: >${threshold}%`);
      return targetPercentage > threshold;
    } else {
      // Bright environment: avoid red dominance
      const threshold = 80;
      console.log(`Color analysis (bright): ${targetPixels}/${totalPixels} non-red pixels (${targetPercentage.toFixed(2)}%), brightness: ${avgBrightness.toFixed(1)}, threshold: >${threshold}%`);
      return targetPercentage > threshold;
    }
    
  } catch (error) {
    console.error('Color analysis failed:', error);
    return false;
  }
} 