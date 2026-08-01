import "./style.css";
import { AGENCY, emailLink, phoneLink, whatsappLink } from "./data/contact";
import { createHeader } from "./components/header";
import { createFooter } from "./components/footer";

const ICONS = {
  phone: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 2-2Z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 1 1-14.6-4.6L4 20l4.8-1.3A8 8 0 0 1 20 12Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" /></svg>`,
  email: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>`,
};

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = "";
app.appendChild(createHeader("contact"));

const main = document.createElement("main");
main.className = "contact-main";
main.id = "main-content";

main.innerHTML = `
  <h1>Contactez-nous</h1>
  <p class="contact-intro">
    Une question sur une voiture, une réservation à finaliser ? Choisissez le
    canal qui vous convient, on vous répond rapidement.
  </p>

  <div class="contact-cards">
    <a class="contact-card" href="${whatsappLink()}" target="_blank" rel="noopener">
      <span class="icon">${ICONS.whatsapp}</span>
      <span>
        <span class="label">WhatsApp</span>
        <span class="value">Discuter directement</span>
      </span>
    </a>

    <a class="contact-card" href="${phoneLink()}">
      <span class="icon">${ICONS.phone}</span>
      <span>
        <span class="label">Téléphone</span>
        <span class="value">${AGENCY.phone}</span>
      </span>
    </a>

    <a class="contact-card" href="${emailLink()}">
      <span class="icon">${ICONS.email}</span>
      <span>
        <span class="label">Email</span>
        <span class="value">${AGENCY.email}</span>
      </span>
    </a>
  </div>

  <address class="contact-address">
    ${AGENCY.name}<br />
    ${AGENCY.address}
  </address>
`;

app.appendChild(main);
app.appendChild(createFooter());
