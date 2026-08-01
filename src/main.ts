import "./style.css";
import type { Car, CarWithGallery } from "./types";
import { loadCars } from "./data/carsSource";
import localCars from "./data/cars.json";
import { createHeader } from "./components/header";
import { createHero } from "./components/hero";
import { createFilters } from "./components/filters";
import { createCarCard } from "./components/carCard";
import { openModal } from "./components/carModal";
import { createFooter } from "./components/footer";
import { attachGalleries } from "./data/gallery";

const app = document.querySelector<HTMLDivElement>("#app")!;

async function init(): Promise<void> {
  const fallbackCars = await attachGalleries(localCars as Car[]);
  let currentCars: CarWithGallery[] = fallbackCars;

  app.innerHTML = "";
  app.appendChild(createHeader("home"));

  const main = document.createElement("main");
  main.id = "main-content";
  app.appendChild(main);

  main.appendChild(createHero(currentCars));

  const filtersZone = document.createElement("div");
  main.appendChild(filtersZone);

  const grid = document.createElement("div");
  grid.className = "cars-grid";
  grid.id = "catalogue";
  main.appendChild(grid);

  app.appendChild(createFooter());

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

  function renderFilters(list: CarWithGallery[]): void {
    const categories = [...new Set(list.map((c) => c.category))];
    filtersZone.replaceChildren(
      createFilters(categories, (category) => {
        const filtered = category
          ? list.filter((c) => c.category === category)
          : list;
        renderCars(filtered);
      }),
    );
  }

  renderFilters(currentCars);
  renderCars(currentCars);

  try {
    const remoteCars = await loadCars();
    if (remoteCars.length > 0) {
      currentCars = await attachGalleries(remoteCars);
      renderFilters(currentCars);
      renderCars(currentCars);

      const heroNode = main.querySelector(".hero");
      if (heroNode) {
        main.replaceChild(createHero(currentCars), heroNode);
      }
    }
  } catch {
    // keep the already-rendered local catalogue if the remote fetch fails
  }
}

init();
