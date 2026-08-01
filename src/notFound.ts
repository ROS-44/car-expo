import "./style.css";
import { createHeader } from "./components/header";
import { createFooter } from "./components/footer";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = "";
app.appendChild(createHeader("home"));

const main = document.createElement("main");
main.className = "not-found-main";
main.id = "main-content";
main.innerHTML = `
  <section class="not-found-card">
    <p class="eyebrow">Erreur 404</p>
    <h1>Cette page n'existe pas</h1>
    <p>
      La page que vous cherchez n'est pas disponible ou a été déplacée.
    </p>
    <a class="btn btn-principal" href="/index.html">Retour à l'accueil</a>
  </section>
`;

app.appendChild(main);
app.appendChild(createFooter());
