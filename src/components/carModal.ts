import type { Car } from "../types";
import { emailLink, phoneLink, whatsappLink } from "../data/contact";
import { drawQRCode } from "./qrcode";

let overlay: HTMLElement | null = null;

function createOverlay(): HTMLElement {
  const el = document.createElement("div");
  el.className = "modal-overlay";
  el.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="Fermer">&times;</button>
      <img src="" alt="" />
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
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  return el;
}

export function closeModal(): void {
  overlay?.classList.remove("open");
}

export async function openModal(car: Car): Promise<void> {
  if (!overlay) overlay = createOverlay();

  const fullName = `${car.brand} ${car.model}`;
  const bookingLink = whatsappLink(fullName);

  const img = overlay.querySelector("img") as HTMLImageElement;
  img.src = car.photo;
  img.alt = fullName;
  img.onerror = () => (img.src = "/images/placeholder.svg");

  (overlay.querySelector("h2") as HTMLElement).textContent = fullName;

  overlay.querySelector(".car-specs")!.innerHTML = `
    <div><span>Année</span>${car.year}</div>
    <div><span>Catégorie</span>${car.category}</div>
    <div><span>Carburant</span>${car.fuel}</div>
    <div><span>Boîte</span>${car.transmission}</div>
    <div><span>Places</span>${car.seats}</div>
    <div><span>Statut</span>${car.available ? "Disponible" : "Indisponible"}</div>
  `;

  overlay.querySelector(".car-price")!.innerHTML = `${car.pricePerDay}€<small>/ jour</small>`;

  overlay.querySelector(".car-actions")!.innerHTML = `
    <a class="btn btn-principal" href="${bookingLink}" target="_blank" rel="noopener">WhatsApp</a>
    <a class="btn" href="${emailLink(fullName)}">Email</a>
    <a class="btn" href="${phoneLink()}">Appeler</a>
  `;

  overlay.classList.add("open");

  const canvas = overlay.querySelector("canvas") as HTMLCanvasElement;
  await drawQRCode(canvas, bookingLink);
}
