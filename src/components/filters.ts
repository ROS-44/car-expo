export function createFilters(
  categories: string[],
  onChange: (category: string | null) => void
): HTMLElement {
  const nav = document.createElement("nav");
  nav.className = "filters";
  nav.setAttribute("aria-label", "Filtrer par catégorie");

  const options = ["Toutes", ...categories];

  options.forEach((cat) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-chip" + (cat === "Toutes" ? " active" : "");
    button.textContent = cat;
    button.addEventListener("click", () => {
      nav.querySelectorAll(".filter-chip").forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      onChange(cat === "Toutes" ? null : cat);
    });
    nav.appendChild(button);
  });

  return nav;
}
