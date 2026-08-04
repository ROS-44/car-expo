import "./style.css";
import type { CarWithGallery } from "./types";
import { loadCars } from "./data/carsSource";
import { attachGalleries } from "./data/gallery";
import { createHeader } from "./components/header";
import { createHero } from "./components/hero";
import { createFilters } from "./components/filters";
import { createCarCard } from "./components/carCard";
import { openModal } from "./components/carModal";
import { createFooter } from "./components/footer";

const app = document.querySelector<HTMLDivElement>("#app")!;

async function init(): Promise<void> {
  app.innerHTML = "";
  app.appendChild(createHeader("home"));

  const main = document.createElement("main");
  main.id = "main-content";
  app.appendChild(main);

  // Le hero s'affiche tout de suite, sans attendre les données : l'utilisateur
  // a quelque chose à lire pendant le chargement. Sans voitures, il n'a
  // simplement pas de bandeau de photos défilantes (cars.json vide -> hero.ts
  // masque cette section de lui-même).
  main.appendChild(createHero([]));

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

  // Le hero est remplacé pour ajouter le bandeau de photos maintenant
  // disponible (texte identique, juste le bandeau qui apparaît).
  const heroNode = main.querySelector(".hero");
  if (heroNode) main.replaceChild(createHero(cars), heroNode);

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
      grid.appendChild(createCarCard(car, openModal));
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
