export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  pricePerDay: number;
  fuel: string;
  transmission: string;
  seats: number;
  /** Repli optionnel si aucune photo n'est trouvée dans public/images/<id>/ */
  photo?: string;
  available: boolean;
}

/** Une voiture une fois sa galerie de photos résolue (voir data/gallery.ts). */
export interface CarWithGallery extends Car {
  /** Chemins des photos trouvées, dans l'ordre. Vide si aucune photo. */
  gallery: string[];
}
