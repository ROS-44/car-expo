import "./style.css";
import { AGENCY, emailLink, phoneLink, whatsappLink } from "./data/contact";
import { createHeader } from "./components/header";
import { createFooter } from "./components/footer";

const ICONS = {
  phone: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 2-2Z"/></svg>`,
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>`,
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
