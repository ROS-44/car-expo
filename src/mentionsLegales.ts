import "./style.css";
import { createHeader } from "./components/header";
import { createFooter } from "./components/footer";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = "";
app.appendChild(createHeader("home"));

const main = document.createElement("main");
main.className = "legal-main";
main.id = "main-content";
main.innerHTML = `
  <section class="legal-card">
    <h1>Mentions légales</h1>
    <p>
      <strong>F-Location</strong> est une agence de location de véhicules à annemasse.
      Les informations affichées sur ce site sont fournies à titre informatif.
    </p>
    <h2>Éditeur</h2>
    <p>
      F-Location<br />
      je sais pas, 75010 annemasse<br />
      contact@f-location.fr
    </p>
    <h2>Responsable de publication</h2>
    <p>F-Location, représentée par son équipe de direction.</p>
    <h2>Hébergement</h2>
    <p>
      Ce site est hébergé par une plateforme statique. Les coordonnées exactes
      d'hébergement peuvent être communiquées sur demande.
    </p>
    <h2>Propriété intellectuelle</h2>
    <p>
      Tous les contenus du site, textes, visuels et code, sont protégés par les
      droits de propriété intellectuelle. Toute reproduction est soumise à autorisation.
    </p>
    <h2>Protection des données</h2>
    <p>
      Les informations transmises via les liens de contact sont utilisées uniquement
      pour répondre à votre demande de réservation ou d'information.
    </p>
  </section>
`;

app.appendChild(main);
app.appendChild(createFooter());
