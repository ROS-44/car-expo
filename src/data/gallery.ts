import type { Car, CarWithGallery } from "../types";

/**
 * Découverte des photos d'une voiture — résolue au moment du BUILD, pas au
 * runtime.
 *
 * Convention : les photos vivent dans `src/assets/images/<id-voiture>/`,
 * numérotées `1`, `2`, `3`... en `.webp`. Vite scanne ce dossier pendant la
 * compilation via `import.meta.glob` et génère la liste exacte des fichiers
 * réellement présents — il n'y a plus aucune requête réseau pour "deviner"
 * si une photo existe, donc plus aucune dépendance au comportement de
 * l'hébergeur (redirections, pages 404 personnalisées, etc.) qui causait
 * des faux positifs.

 */

const modules = import.meta.glob("/src/assets/images/*/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function buildGalleryIndex(): Record<string, string[]> {
  const grouped: Record<string, { order: number; url: string }[]> = {};

  for (const [path, url] of Object.entries(modules)) {
    const match = path.match(/\/images\/([^/]+)\/(\d+)\.webp$/);
    if (!match) continue;
    const [, carId, orderStr] = match;
    (grouped[carId] ??= []).push({ order: Number(orderStr), url });
  }

  const index: Record<string, string[]> = {};
  for (const [carId, photos] of Object.entries(grouped)) {
    index[carId] = photos.sort((a, b) => a.order - b.order).map((p) => p.url);
  }
  return index;
}

const GALLERY_INDEX = buildGalleryIndex();

export function resolveGallery(carId: string): string[] {
  return GALLERY_INDEX[carId] ?? [];
}

/** Attache à chaque voiture la liste (déjà connue, triée) de ses photos. */
export function attachGalleries(cars: Car[]): CarWithGallery[] {
  return cars.map((car) => ({ ...car, gallery: resolveGallery(car.id) }));
}
