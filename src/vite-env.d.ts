/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEET_API_URL?: string;
  readonly VITE_JSONBIN_BIN_ID?: string;
  readonly VITE_JSONBIN_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
