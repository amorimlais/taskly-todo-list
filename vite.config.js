import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Garante caminhos relativos para os arquivos gerados
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
