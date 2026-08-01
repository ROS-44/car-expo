import type { CarWithGallery } from "../types";
import { emailLink, phoneLink, whatsappLink } from "../data/contact";
import { drawQRCode } from "./qrcode";

let overlay: HTMLElement | null = null;
let currentGallery: string[] = [];
let currentIndex = 0;

function createOverlay(): HTMLElement {
  const el = document.createElement("div");
  el.className = "modal-overlay";
  el.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="Fermer">&times;</button>

      <div class="modal-gallery">
        <button type="button" class="gallery-nav gallery-prev" aria-label="Photo précédente">&#8249;</button>
        <img src="" alt="" />
        <button type="button" class="gallery-nav gallery-next" aria-label="Photo suivante">&#8250;</button>
        <span class="gallery-counter"></span>
      </div>

      <div class="modal-body">
        <h2 class="car-title" style="margin:0"></h2>
        <div class="car-specs"></div>
        <div class="car-price"></div>
        <div class="car-actions"></div>
        <div class="qr-panel open">
          <canvas></canvas>
          <p>Scannez pour ouvrir<br />la conversation WhatsApp.</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(el);

  el.addEventListener("click", (e) => {
    if (e.target === el) closeModal();
  });
  el.querySelector(".modal-close")?.addEventListener("click", closeModal);
  el
    .querySelector(".gallery-prev")
    ?.addEventListener("click", () => showPhoto(currentIndex - 1));
  el
    .querySelector(".gallery-next")
    ?.addEventListener("click", () => showPhoto(currentIndex + 1));

  document.addEventListener("keydown", (e) => {
    if (!overlay?.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") showPhoto(currentIndex - 1);
    if (e.key === "ArrowRight") showPhoto(currentIndex + 1);
  });

  return el;
}

function showPhoto(index: number): void {
  if (!overlay || currentGallery.length === 0) return;
  currentIndex = (index + currentGallery.length) % currentGallery.length;

  const img = overlay.querySelector(".modal-gallery img") as HTMLImageElement;
  img.src = currentGallery[currentIndex];
  img.onerror = () => (img.src = "/images/placeholder.svg");

  const counter = overlay.querySelector(".gallery-counter") as HTMLElement;
  counter.textContent =
    currentGallery.length > 1
      ? `${currentIndex + 1} / ${currentGallery.length}`
      : "";

  const multiple = currentGallery.length > 1;
  overlay.querySelector(".gallery-prev")?.classList.toggle("hidden", !multiple);
  overlay.querySelector(".gallery-next")?.classList.toggle("hidden", !multiple);
}

export function closeModal(): void {
  overlay?.classList.remove("open");
}

export async function openModal(car: CarWithGallery): Promise<void> {
  if (!overlay) overlay = createOverlay();

  const fullName = `${car.brand} ${car.model}`;
  const bookingLink = whatsappLink(fullName);

  currentGallery =
    car.gallery.length > 0 ? car.gallery : ["/images/placeholder.svg"];
  showPhoto(0);

  (overlay.querySelector(".modal-gallery img") as HTMLImageElement).alt =
    fullName;
  (overlay.querySelector("h2") as HTMLElement).textContent = fullName;

  overlay.querySelector(".car-specs")!.innerHTML = `
    <div><span>Année</span>${car.year}</div>
    <div><span>Catégorie</span>${car.category}</div>
    <div><span>Carburant</span>${car.fuel}</div>
    <div><span>Boîte</span>${car.transmission}</div>
    <div><span>Places</span>${car.seats}</div>
    <div><span>Statut</span>${car.available ? "Disponible" : "Indisponible"}</div>
  `;

  overlay.querySelector(".car-price")!.innerHTML =
    `${car.pricePerDay}€<small>/ jour</small>`;

  overlay.querySelector(".car-actions")!.innerHTML = `
    <a class="btn btn-principal" href="${bookingLink}" target="_blank" rel="noopener">WhatsApp</a>
    <a class="btn" href="${emailLink(fullName)}">Email</a>
    <a class="btn" href="${phoneLink()}">Appeler</a>
  `;

  overlay.classList.add("open");

  const canvas = overlay.querySelector("canvas") as HTMLCanvasElement;
  await drawQRCode(canvas, bookingLink);
}
