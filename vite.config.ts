import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react()],
    preview: {
        port: 3000,
        strictPort: true,
        cors: true
    },
    server: {
        port: 3000,
        cors: true,
        host: true,
        origin: 'http://localhost:3000'
    }
})
