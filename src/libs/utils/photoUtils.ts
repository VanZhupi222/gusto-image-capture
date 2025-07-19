import CryptoJS from 'crypto-js';

/**
 * Generate a hash from image data for client-side identification
 * Uses MD5 algorithm on the image data only (no timestamp)
 * This allows backend to implement deduplication/instant upload for identical images
 * 
 * @param imageData - Base64 image data string
 * @returns MD5 hash string for client identification and deduplication
 */
export function generateClientHash(imageData: string): string {
  return CryptoJS.MD5(imageData).toString();
} 