import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // Écoute sur toutes les adresses IP, pratique pour tester sur des appareils du réseau local
    },
});
