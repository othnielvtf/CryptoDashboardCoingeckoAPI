import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  console.log('Environment variables loaded:', {
    VITE_VALID_USERNAME: env.VITE_VALID_USERNAME || 'not set',
    VITE_VALID_PASSWORD: env.VITE_VALID_PASSWORD ? '***' : 'not set',
    VITE_API_KEY: env.VITE_API_KEY ? '***' : 'not set',
  });
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    // Make env variables available to the client
    define: {
      // This ensures all environment variables are available
      'import.meta.env.VITE_VALID_USERNAME': JSON.stringify(env.VITE_VALID_USERNAME),
      'import.meta.env.VITE_VALID_PASSWORD': JSON.stringify(env.VITE_VALID_PASSWORD),
      'import.meta.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY)
    }
  };
});
