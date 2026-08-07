export type CurrentPage = "home" | "contact";

export function createHeader(current: CurrentPage): HTMLElement {
  const header = document.createElement("header");
  header.className = "site-header";

  header.innerHTML = `
    <div class="nav-bar">
      <a class="nav-link" href="/index.html" ${current === "home" ? 'aria-current="page"' : ""}>Accueil</a>
      <p class="logo" aria-label="Aysallrentcar74">
        <span class="logo-highlight">Aysall</span><span class="logo-base">rentcar<span class="logo-74">74</span></span>
      </p>
      <a class="nav-link" href="/contact.html" ${current === "contact" ? 'aria-current="page"' : ""}>Contact</a>
    </div>
  `;

  return header;
}
