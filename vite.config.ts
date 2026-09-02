import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  // Relative base so the build works whether it's deployed at the domain root
  // (e.g. a custom domain or username.github.io) or under a GitHub Pages
  // project path (e.g. username.github.io/repo-name/).
  base: './',
  plugins: [react(), tailwindcss()],
})
