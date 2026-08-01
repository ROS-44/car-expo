import { AGENCY } from "../data/contact";

export function createFooter(): HTMLElement {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <p>${AGENCY.name} — ${AGENCY.address}</p>
    <p>
      <a href="/mentions-legales.html">Mentions légales</a>
      <span>•</span>
      <a href="/404.html">404</a>
    </p>
    <p>&copy; ${new Date().getFullYear()} ${AGENCY.name}. Tous droits réservés.</p>
  `;
  return footer;
}
