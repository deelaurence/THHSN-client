import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET||"6ghjknjbhvffxrd$%$%34##gjnhlhih";
// Encrypt data before storing in local storage
export const encryptData = (data: any): string => {
  const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  return encrypted;
};

// Decrypt data when retrieving from local storage
export const decryptData = (encryptedData: string | null): any => {
  if (!encryptedData) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } catch (error) {

    console.error("Decryption error:", error);
    window.location.reload()
    return null;
  }
};
