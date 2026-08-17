// src/main.ts
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

  main.innerHTML = `
    <div class="loading-state" role="status" aria-live="polite">
      <span class="spinner" aria-hidden="true"></span>
      <p>Chargement du catalogue…</p>
    </div>
  `;

  app.appendChild(createFooter());

  const rawCars = await loadCars();
  const cars: CarWithGallery[] = attachGalleries(rawCars);

  main.innerHTML = "";
  main.appendChild(createHero(cars));

  const filtersZone = document.createElement("div");
  main.appendChild(filtersZone);

  const grid = document.createElement("div");
  grid.className = "cars-grid";
  grid.id = "catalogue";
  main.appendChild(grid);

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
