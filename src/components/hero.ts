import type { CarWithGallery } from "../types";
import { AGENCY } from "../data/contact";

function renderStripItems(cars: CarWithGallery[]): string {
  if (cars.length === 0) return "";
  const stripCars = [...cars, ...cars]; // doublé pour boucler la bande

  return stripCars
    .map(
      (car) => `
        <div class="hero-strip-item">
          <img src="${car.gallery[0] ?? "/images/placeholder.svg"}" alt="" loading="lazy" onerror="this.src='/images/placeholder.svg'" />
          <span>${car.brand} ${car.model}</span>
        </div>
      `,
    )
    .join("");
}

export function createHero(cars: CarWithGallery[]): HTMLElement {
  const section = document.createElement("section");
  section.className = "hero";

  section.innerHTML = `
    <div class="hero-text">
      <p class="hero-kicker">Location de voitures &middot; ${AGENCY.city}</p>
      <h1>Trouvez votre voiture,<br />contactez-nous en un geste.</h1>
      <p class="hero-desc">${AGENCY.description}</p>
      <a class="btn btn-principal hero-cta" href="#catalogue">Voir le catalogue</a>
    </div>
    <div class="hero-strip" aria-hidden="true">
      <div class="hero-strip-track">${renderStripItems(cars)}</div>
    </div>
  `;

  return section;
}

/**
 * Remplit le bandeau de photos une fois les données prêtes, sans recréer
 * ni remplacer le hero — la hauteur de `.hero-strip` est déjà réservée en
 * CSS (min-height), donc ce remplissage ne provoque aucun décalage de
 * mise en page (contrairement à un remplacement du hero entier).
 */
export function updateHeroStrip(
  section: HTMLElement,
  cars: CarWithGallery[],
): void {
  const track = section.querySelector(".hero-strip-track");
  if (track) track.innerHTML = renderStripItems(cars);
}
