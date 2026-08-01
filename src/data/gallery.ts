import type { Car, CarWithGallery } from "../types";

/**
 * Découverte automatique des photos d'une voiture.
 *
 * Convention : les photos vivent dans `public/images/<id-voiture>/`,
 * numérotées `1`, `2`, `3`... (extension libre : jpg, jpeg, png ou webp).
 * Le site sonde chaque numéro et se stoppe au premier absent.
 */
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const MAX_PHOTOS_PER_CAR = 8;

function tryLoadImage(src: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function resolveSlot(
  carId: string,
  index: number,
): Promise<string | null> {
  const attempts = EXTENSIONS.map((ext) =>
    tryLoadImage(`/images/${carId}/${index}.${ext}`),
  );
  const results = await Promise.all(attempts);
  return results.find((result) => result !== null) ?? null;
}

export async function resolveGallery(carId: string): Promise<string[]> {
  const gallery: string[] = [];

  for (let index = 1; index <= MAX_PHOTOS_PER_CAR; index += 1) {
    const found = await resolveSlot(carId, index);
    if (!found) break;
    gallery.push(found);
  }

  return gallery;
}

export async function attachGalleries(cars: Car[]): Promise<CarWithGallery[]> {
  return Promise.all(
    cars.map(async (car) => {
      const gallery = await resolveGallery(car.id);
      if (gallery.length === 0 && car.photo) {
        return { ...car, gallery: [car.photo] };
      }
      return { ...car, gallery };
    }),
  );
}
