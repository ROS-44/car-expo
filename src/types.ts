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
  available: boolean;
}

/** Une voiture une fois sa galerie de photos résolue (voir data/gallery.ts). */
export interface CarWithGallery extends Car {
  /** Chemins des photos trouvées, dans l'ordre. Vide si aucune photo. */
  gallery: string[];
}
