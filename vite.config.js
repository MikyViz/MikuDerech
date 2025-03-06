import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://mdapi.kolkasher.co.il',
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => {
  //         console.log(`Proxying request: ${path}`);
  //         return path.replace(/^\/api/, '');
  //       }
  //     }
  //   }
  // }
});


