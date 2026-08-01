import type { Car } from "../types";
import { emailLink, phoneLink, whatsappLink } from "../data/contact";
import { drawQRCode } from "./qrcode";

export function createCarCard(
  car: Car,
  onOpenModal: (car: Car) => void
): HTMLElement {
  const fullName = `${car.brand} ${car.model}`;

  const card = document.createElement("article");
  card.className = "car-card" + (car.available ? "" : " unavailable");
  card.setAttribute("aria-label", fullName);

  const bookingLink = whatsappLink(fullName);

  card.innerHTML = `
    <div class="car-photo" role="button" tabindex="0" aria-label="Voir les détails de ${fullName}">
      <img src="${car.photo}" alt="${fullName}" loading="lazy"
        onerror="this.src='/images/placeholder.svg'" />
      <span class="badge-year">${car.year}</span>
      ${!car.available ? `<div class="badge-unavailable">Indisponible</div>` : ""}
    </div>

    <div class="perforation" aria-hidden="true"></div>

    <div class="car-card-body">
      <h3 class="car-title">
        ${fullName}
        <span class="category">${car.category}</span>
      </h3>

      <div class="car-specs">
        <div><span>Carburant</span>${car.fuel}</div>
        <div><span>Boîte</span>${car.transmission}</div>
        <div><span>Places</span>${car.seats}</div>
      </div>

      <div class="car-price">${car.pricePerDay}€<small>/ jour</small></div>

      <div class="car-actions">
        <a class="btn btn-principal" href="${bookingLink}" target="_blank" rel="noopener"
          ${car.available ? "" : 'aria-disabled="true" tabindex="-1"'}>
          WhatsApp
        </a>
        <a class="btn" href="${emailLink(fullName)}"
          ${car.available ? "" : 'aria-disabled="true" tabindex="-1"'}>
          Email
        </a>
        <a class="btn" href="${phoneLink()}"
          ${car.available ? "" : 'aria-disabled="true" tabindex="-1"'}>
          Appeler
        </a>
        <button type="button" class="btn btn-qr" ${car.available ? "" : "disabled"}>QR code</button>
      </div>

      <div class="qr-panel">
        <canvas></canvas>
        <p>Scannez pour ouvrir<br />la conversation WhatsApp.</p>
      </div>
    </div>
  `;

  const photoZone = card.querySelector(".car-photo") as HTMLElement;
  const open = () => onOpenModal(car);
  photoZone.addEventListener("click", open);
  photoZone.addEventListener("keydown", (e) => {
    if (e instanceof KeyboardEvent && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      open();
    }
  });

  const qrButton = card.querySelector(".btn-qr") as HTMLButtonElement | null;
  const qrPanel = card.querySelector(".qr-panel") as HTMLElement;
  const canvas = card.querySelector("canvas") as HTMLCanvasElement;
  let drawn = false;

  qrButton?.addEventListener("click", async () => {
    qrPanel.classList.toggle("open");
    if (!drawn && qrPanel.classList.contains("open")) {
      await drawQRCode(canvas, bookingLink);
      drawn = true;
    }
  });

  return card;
}
