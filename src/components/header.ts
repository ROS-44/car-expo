import { AGENCY } from "../data/contact";

export type CurrentPage = "home" | "contact";

const FAVICON_ICON = `
<img src="/favicon.svg" alt="" width="20" height="20" aria-hidden="true" />
`;

export function createHeader(current: CurrentPage): HTMLElement {
  const header = document.createElement("header");
  header.className = "site-header";

  header.innerHTML = `
    <div class="nav-bar">
      <a class="nav-link" href="/index.html" ${current === "home" ? 'aria-current="page"' : ""}>Accueil</a>
      <a class="brand" href="/index.html" aria-label="${AGENCY.name} — retour à l'accueil">
        ${FAVICON_ICON}
        <span>${AGENCY.name}</span>
      </a>
      <a class="nav-link" href="/contact.html" ${current === "contact" ? 'aria-current="page"' : ""}>Contact</a>
    </div>
  `;

  return header;
}
