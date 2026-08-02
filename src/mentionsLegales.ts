import "./style.css";
import { AGENCY } from "./data/contact";
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
      <strong>${AGENCY.name}</strong> est une agence de location de véhicules située à Annemasse,
      en Haute-Savoie. Les informations présentées sur ce site sont fournies à titre
      informatif.
    </p>

    <h2>Éditeur du site</h2>
    <p>
      ${AGENCY.name}<br />
      ${AGENCY.address}<br />
      ${AGENCY.email}
    </p>

    <h2>Responsable de la publication</h2>
    <p>Le responsable de la publication est le représentant légal de ${AGENCY.name}.</p>

    <h2>Hébergement</h2>
    <p>
      Ce site est hébergé par <strong>Netlify, Inc.</strong>, dont le siège social
      est situé à <strong> 44 Montgomery Street, Suite 300,<br />
      San Francisco, California 94104, États-Unis.</strong>.
    </p>

    <h2>Propriété intellectuelle</h2>
    <p>
      L’ensemble des contenus présents sur ce site, notamment les textes, les visuels,
      les photographies, les éléments graphiques et le code, est protégé par les
      dispositions applicables en matière de propriété intellectuelle. Toute
      reproduction, représentation, modification ou utilisation, totale ou partielle,
      sans autorisation préalable, est interdite, sauf disposition légale contraire.
    </p>

    <h2>Protection des données et services Google</h2>
    <p>
      Le site ne comporte aucun formulaire, espace client, outil de mesure d’audience ni
      dispositif publicitaire. Il ne collecte ni ne stocke directement de données
      personnelles par l’intermédiaire du site.
    </p>

    <p>
      Les liens de contact présents sur le site permettent à l’utilisateur de contacter
      directement ${AGENCY.name} par téléphone ou par courrier électronique. Les données
      éventuellement communiquées dans le cadre de ces échanges sont utilisées
      uniquement pour répondre aux demandes d’information ou de réservation et assurer
      le suivi de la relation commerciale.
    </p>

    <p>
      Le site utilise certains services fournis par Google, notamment Google Fonts pour
      l’affichage des polices et l’API Google Sheets pour consulter et afficher les
      informations publiques relatives aux véhicules. Lors de l’utilisation de ces
      services, certaines données techniques nécessaires au fonctionnement du site,
      telles que l’adresse IP, les informations relatives au navigateur et les données
      de connexion, peuvent être traitées par Google.
    </p>

    <p>
      Les données affichées depuis Google Sheets concernent uniquement des informations
      publiques relatives aux véhicules. Aucune donnée personnelle des visiteurs n’est
      enregistrée dans cette source de données.
    </p>

    <p>
      Le site n’utilise aucun cookie ni traceur à des fins de publicité, de mesure
      d’audience ou de profilage.
    </p>
  </section>
`;

app.appendChild(main);
app.appendChild(createFooter());
