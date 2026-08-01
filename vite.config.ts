import { defineConfig } from "vite";
import { resolve } from "node:path";

// __dirname n'existe pas en ESM ("type": "module") : on utilise
// import.meta.dirname (Node 20.11+ / 21+).
const rootDir = import.meta.dirname;

export default defineConfig({
  // host: true -> écoute sur 0.0.0.0, donc accessible depuis les autres
  // appareils de ton réseau local (téléphone, tablette, autre PC) via
  // http://<IP-de-ce-PC>:5173 . Trouve ton IP locale avec `ipconfig`
  // (Windows) et vérifie que le pare-feu autorise le port.
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        contact: resolve(rootDir, "contact.html"),
        mentionsLegales: resolve(rootDir, "mentions-legales.html"),
        notFound: resolve(rootDir, "404.html"),
      },
    },
  },
});
