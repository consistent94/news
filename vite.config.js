import { defineConfig } from 'vite';
import ejs from 'vite-plugin-ejs';

export default defineConfig({
  root: 'views', 
  plugins: [ejs()],
  build: {
    outDir: '../dist', // Specify the output directory
    rollupOptions: {
      input: 'views/index.ejs' // Set the entry point to your EJS file
    }
  }
});
