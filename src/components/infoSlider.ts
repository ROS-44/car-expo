interface InfoSlide {
  title: string;
  /** Phrase courte, toujours visible. */
  summary: string;
  /** Détails affichés sous « En savoir plus ». */
  details: string[];
  /** Contenu interne d'un <svg viewBox="0 0 24 24"> */
  icon: string;
}

// Ton volontairement commercial et discret : aucun tarif, aucune pénalité,
// aucun détail d'assurance ici. Tout cela est réservé à la future page
// « conditions de location ».
const SLIDES: InfoSlide[] = [
  {
    title: "Vignette suisse incluse",
    summary:
      "Direction Genève ou la Suisse ? La vignette autoroutière est incluse : vous partez sans démarche supplémentaire.",
    details: [
      "La vignette autoroutière suisse est comprise dans votre location.",
      "Elle est rattachée à l'immatriculation du véhicule : lors d'un contrôle, la vérification se fait directement à partir de la plaque.",
    ],
    icon: `<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 4v16" stroke-dasharray="2.2 2.2"/><path d="m14.5 10.5 1.8 1.8 3-3.3"/>`,
  },
  {
    title: "Une location encadrée",
    summary:
      "Chaque location s'appuie sur un contrat clair, que nous vous présentons avant la remise des clés.",
    details: [
      "Les garanties et conditions de prise en charge figurent dans votre contrat de location.",
      "Nous prenons le temps de vous les expliquer avant le départ, et de répondre à toutes vos questions.",
      "Une page détaillée sera bientôt disponible.",
    ],
    icon: `<path d="M12 3.5 19 6.5v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10v-5L12 3.5Z"/><path d="m9 12 2 2 4-4"/>`,
  },
  {
    title: "Démarches simplifiées",
    summary:
      "Votre permis de conduire en cours de validité, et les formalités se font simplement, sur place.",
    details: [
      "Un permis de conduire valide est nécessaire.",
      "Un dépôt de garantie, adapté à la catégorie du véhicule, est prévu : notre équipe vous en précise les modalités.",
    ],
    icon: `<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 17c.5-1.8 1.8-2.7 3-2.7s2.5.9 3 2.7"/><path d="M14 9h5"/><path d="M14 13h5"/>`,
  },
  {
    title: "Carburant sans prise de tête",
    summary:
      "Le niveau de carburant est relevé ensemble au départ : vous le rendez au même niveau, c'est tout.",
    details: [
      "Le niveau est noté sur votre contrat lors de la remise du véhicule.",
      "À la restitution, il suffit de revenir au même niveau.",
    ],
    icon: `<path d="M5 21V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v15"/><path d="M4 21h11"/><path d="M14 10h1.5a1.5 1.5 0 0 1 1.5 1.5V17a1.5 1.5 0 0 0 3 0v-6l-2.2-2.2"/><path d="M7 5v4h5V5"/>`,
  },
  {
    title: "On vient à vous",
    summary:
      "Livraison et récupération du véhicule au lieu convenu avec vous : le service de cartage.",
    details: [
      "Le lieu et l'heure du rendez-vous sont fixés ensemble, à l'avance.",
      "Le lieu de restitution est également convenu avec vous.",
      "Les conditions du service de cartage seront détaillées sur la page dédiée.",
    ],
    icon: `<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>`,
  },
  {
    title: "Un retour sans tracas",
    summary:
      "Nos véhicules vous sont remis propres et entretenus. Un retour à l'heure et dans le même état, et tout se passe bien.",
    details: [
      "Merci de restituer le véhicule propre, à l'heure convenue, pour le client suivant.",
      "Un imprévu ? Prévenez-nous : mieux vaut en parler à l'avance.",
    ],
    icon: `<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`,
  },
];

const AUTOPLAY_MS = 6000;

let currentIndex = 0;
let expanded = false;
let autoplayTimer: ReturnType<typeof setInterval> | null = null;

function renderSlide(section: HTMLElement): void {
  const slide = SLIDES[currentIndex];

  section.querySelector(".info-slide-icon")!.innerHTML = slide.icon;
  section.querySelector(".info-slide-title")!.textContent = slide.title;
  section.querySelector(".info-slide-desc")!.textContent = slide.summary;

  const list = section.querySelector<HTMLUListElement>(".info-slide-details")!;
  list.replaceChildren(
    ...slide.details.map((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      return li;
    }),
  );

  section.querySelector(".info-slider-counter")!.textContent =
    `${currentIndex + 1} / ${SLIDES.length}`;

  section.querySelectorAll(".info-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function setExpanded(section: HTMLElement, value: boolean): void {
  expanded = value;
  const button = section.querySelector<HTMLButtonElement>(".info-more")!;
  const list = section.querySelector<HTMLUListElement>(".info-slide-details")!;
  button.setAttribute("aria-expanded", String(value));
  button.textContent = value ? "Réduire" : "En savoir plus";
  list.hidden = !value;
}

function goTo(section: HTMLElement, index: number): void {
  currentIndex = (index + SLIDES.length) % SLIDES.length;
  setExpanded(section, false);
  renderSlide(section);
}

function stopAutoplay(): void {
  if (autoplayTimer) clearInterval(autoplayTimer);
  autoplayTimer = null;
}

function startAutoplay(section: HTMLElement): void {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  stopAutoplay();
  // Pas de défilement automatique si l'utilisateur lit le détail.
  if (reduceMotion || expanded) return;
  autoplayTimer = setInterval(
    () => goTo(section, currentIndex + 1),
    AUTOPLAY_MS,
  );
}

export function createInfoSlider(): HTMLElement {
  const section = document.createElement("section");
  section.className = "info-slider";
  section.setAttribute("role", "region");
  section.setAttribute("aria-roledescription", "carrousel");
  section.setAttribute("aria-label", "Informations pratiques sur la location");

  section.innerHTML = `
    <div class="info-slide">
      <div class="info-slide-icon-wrap">
        <svg class="info-slide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"></svg>
      </div>
      <h2 class="info-slide-title"></h2>
      <p class="info-slide-desc"></p>
      <button type="button" class="info-more" aria-expanded="false" aria-controls="info-slide-details">En savoir plus</button>
      <ul class="info-slide-details" id="info-slide-details" hidden></ul>
    </div>

    <div class="info-slider-controls">
      <button type="button" class="info-nav info-prev" aria-label="Information précédente">&#8249;</button>
      <div class="info-dots"></div>
      <button type="button" class="info-nav info-next" aria-label="Information suivante">&#8250;</button>
    </div>
    <span class="info-slider-counter"></span>
  `;

  const dotsZone = section.querySelector(".info-dots")!;
  SLIDES.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "info-dot";
    dot.setAttribute("aria-label", `Aller à l'information ${i + 1}`);
    dot.addEventListener("click", () => {
      goTo(section, i);
      startAutoplay(section);
    });
    dotsZone.appendChild(dot);
  });

  section.querySelector(".info-prev")?.addEventListener("click", () => {
    goTo(section, currentIndex - 1);
    startAutoplay(section);
  });
  section.querySelector(".info-next")?.addEventListener("click", () => {
    goTo(section, currentIndex + 1);
    startAutoplay(section);
  });

  section.querySelector(".info-more")?.addEventListener("click", () => {
    setExpanded(section, !expanded);
    startAutoplay(section);
  });

  // Pause au survol et au focus clavier : un carrousel qui défile seul
  // doit pouvoir être arrêté par l'utilisateur.
  section.addEventListener("mouseenter", stopAutoplay);
  section.addEventListener("mouseleave", () => startAutoplay(section));
  section.addEventListener("focusin", stopAutoplay);
  section.addEventListener("focusout", () => startAutoplay(section));

  renderSlide(section);
  setExpanded(section, false);
  startAutoplay(section);

  return section;
}
