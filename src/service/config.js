export const appwriteVar = {
  APPWRITE_PROJECT_NAME: String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
  APPWRITE_PROJECT_ID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  APPWRITE_ENDPOINT: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  VERIFY_REDIRECT_URL: String(import.meta.env.VITE_VERIFY_REDIRECT_URL),
};
