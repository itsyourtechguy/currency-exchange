import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/currency-exchange/',
  test: {
    environment: 'jsdom',
    globals: true,
  },
});