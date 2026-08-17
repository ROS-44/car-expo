import "./style.css";
import type { CarWithGallery } from "./types";
import { loadCars } from "./data/carsSource";
import { attachGalleries } from "./data/gallery";
import { createHeader } from "./components/header";
import { createHero, updateHeroStrip } from "./components/hero";
import { createFilters } from "./components/filters";
import { createCarCard } from "./components/carCard";
import { createFooter } from "./components/footer";

async function handleOpenModal(car: CarWithGallery): Promise<void> {
  const { openModal } = await import("./components/carModal");
  openModal(car);
}

const app = document.querySelector<HTMLDivElement>("#app")!;

async function init(): Promise<void> {
  app.innerHTML = "";
  app.appendChild(createHeader("home"));

  const main = document.createElement("main");
  main.id = "main-content";
  app.appendChild(main);

  // Le hero (texte + bandeau, hauteur déjà réservée par CSS) s'affiche
  // tout de suite : l'utilisateur a quelque chose à lire pendant que le
  // catalogue charge. Seule la zone catalogue montre un spinner.
  const heroSection = createHero([]);
  main.appendChild(heroSection);

  const catalogueZone = document.createElement("div");
  catalogueZone.innerHTML = `
    <div class="loading-state" role="status" aria-live="polite">
      <span class="spinner" aria-hidden="true"></span>
      <p>Chargement du catalogue…</p>
    </div>
  `;
  main.appendChild(catalogueZone);

  app.appendChild(createFooter());

  const rawCars = await loadCars();
  const cars: CarWithGallery[] = attachGalleries(rawCars);

  // Remplit juste le bandeau déjà présent dans le hero, ne le recrée pas.
  updateHeroStrip(heroSection, cars);

  catalogueZone.innerHTML = "";

  const filtersZone = document.createElement("div");
  catalogueZone.appendChild(filtersZone);

  const grid = document.createElement("div");
  grid.className = "cars-grid";
  grid.id = "catalogue";
  catalogueZone.appendChild(grid);

  function renderCars(list: CarWithGallery[]): void {
    grid.innerHTML = "";
    if (list.length === 0) {
      grid.innerHTML = `<p class="empty-state">Aucune voiture ne correspond à ce filtre pour le moment.</p>`;
      return;
    }
    list.forEach((car) => {
      grid.appendChild(createCarCard(car, handleOpenModal));
    });
  }

  const categories = [...new Set(cars.map((c) => c.category))];
  filtersZone.appendChild(
    createFilters(categories, (category) => {
      const filtered = category
        ? cars.filter((c) => c.category === category)
        : cars;
      renderCars(filtered);
    }),
  );

  renderCars(cars);
}

init();
