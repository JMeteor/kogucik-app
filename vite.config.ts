/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const generateScopedName =
    mode === 'development' ? '[local]_[hash:base64:2]' : '[hash:base64:5]';

  return defineConfig({
    resolve: {
      alias: {},
    },
    plugins: [react()],
    test: {
      environment: 'happy-dom',
      setupFiles: ['./src/test/setup.ts'],
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName,
      },
    },
  });
};
