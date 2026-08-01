import type { Car } from "../types";
import { AGENCY } from "../data/contact";

export function createHero(cars: Car[]): HTMLElement {
  const section = document.createElement("section");
  section.className = "hero";

  const stripCars = cars.length > 0 ? [...cars, ...cars] : []; // doublé pour boucler la bande

  section.innerHTML = `
    <div class="hero-text">
      <p class="hero-kicker">Location de voitures &middot; ${AGENCY.city}</p>
      <h1>Trouvez votre voiture,<br />contactez-nous en un geste.</h1>
      <p class="hero-desc">${AGENCY.description}</p>
      <a class="btn btn-principal hero-cta" href="#catalogue">Voir le catalogue</a>
    </div>
    ${
      stripCars.length > 0
        ? `
      <div class="hero-strip" aria-hidden="true">
        <div class="hero-strip-track">
          ${stripCars
            .map(
              (car) => `
            <div class="hero-strip-item">
              <img src="${car.photo}" alt="" loading="lazy" onerror="this.src='/images/placeholder.svg'" />
              <span>${car.brand} ${car.model}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
        : ""
    }
  `;

  return section;
}
