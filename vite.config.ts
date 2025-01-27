import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Make sure your build output is in the 'dist' folder
  },
  base: './', // Ensure the base path is set correctly for deployment
});
