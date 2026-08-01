import type { Car } from "../types";
import localCars from "./cars.json";

/**
 * Source des données véhicules.
 *
 * Par défaut, le catalogue vient du fichier local `cars.json` (inclus dans
 * le build — toute modification, notamment le statut `available`, nécessite
 * donc un nouveau déploiement).
 *
 * Pour changer la disponibilité d'une voiture SANS redéployer le site, on
 * peut brancher une feuille Google Sheet ou un endpoint public exposant un
 * tableau JSON. Le site relit les données à chaque chargement et retombe sur
 * le fichier local si la requête échoue ou si aucune variable d'env n'est
 * définie.
 */

const GOOGLE_SHEET_API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID;
const ACCESS_KEY = import.meta.env.VITE_JSONBIN_ACCESS_KEY;

function isCarArray(value: unknown): value is Car[] {
  return Array.isArray(value);
}

export async function loadCars(): Promise<Car[]> {
  if (!GOOGLE_SHEET_API_URL && !BIN_ID) {
    return localCars as Car[];
  }

  try {
    const response = GOOGLE_SHEET_API_URL
      ? await fetch(GOOGLE_SHEET_API_URL)
      : await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
          headers: ACCESS_KEY ? { "X-Access-Key": ACCESS_KEY } : undefined,
        });

    if (!response.ok) {
      throw new Error(
        GOOGLE_SHEET_API_URL
          ? `Google Sheets a répondu ${response.status}`
          : `JSONBin a répondu ${response.status}`,
      );
    }

    const payload = await response.json();
    const record = GOOGLE_SHEET_API_URL ? payload : payload.record;

    if (!isCarArray(record)) {
      throw new Error("Format de données inattendu");
    }

    return record as Car[];
  } catch (error) {
    console.warn(
      "Impossible de charger le catalogue distant, utilisation des données locales.",
      error,
    );
    return localCars as Car[];
  }
}
