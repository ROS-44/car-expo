# F-Location — Catalogue de voitures

Site vitrine statique (Vite + TypeScript, sans backend). Deux pages : accueil (catalogue) et contact. Chaque voiture propose 3 façons de contacter (WhatsApp, Email, Téléphone) + un QR code généré à la volée.

## Démarrer en local

```bash
npm install
npm run dev
```

Le terminal affiche deux URLs :

- `Local` — pour toi, sur ce PC.
- `Network` — l'adresse à utiliser depuis un autre appareil du même réseau Wi-Fi (téléphone, tablette). Exemple : `http://192.168.1.23:5173`.

Si l'appareil distant n'arrive pas à se connecter, vérifie que le pare-feu Windows autorise Node.js/Vite sur les réseaux privés (une popup Windows le demande généralement au premier lancement — accepte-la).

## Construire pour la mise en ligne

```bash
npm run build
```

Résultat dans `dist/` (contient `index.html` ET `contact.html`) — à héberger tel quel sur Netlify, Vercel, GitHub Pages ou Cloudflare Pages.

Avant la mise en ligne, remplace `https://www.f-location.example` (placeholder) par ton vrai nom de domaine dans : `index.html`, `contact.html`, `public/robots.txt`, `public/sitemap.xml`.

## Modifier les coordonnées de l'agence

Fichier : `src/data/contact.ts` — téléphone, WhatsApp, email, adresse, ville, description (utilisée dans le hero).

## Ajouter / modifier des voitures

Fichier : `src/data/cars.json` — un objet par voiture :

```json
{
  "id": "identifiant-unique",
  "brand": "Peugeot",
  "model": "208",
  "year": 2023,
  "category": "Citadine",
  "pricePerDay": 40,
  "fuel": "Essence",
  "transmission": "Manuelle",
  "seats": 5,
  "photo": "/images/peugeot-208.jpg",
  "available": true
}
```

Mets `"available": false` pour griser la voiture et désactiver les boutons de contact.

## Photos

Dépose les images dans `public/images/` avec le même nom que le champ `photo` (idéalement `.webp` ou `.jpg`, ratio 4:3, < 300 Ko). Si une image manque, un placeholder s'affiche automatiquement.

## Rendre la disponibilité modifiable sans redéployer (discussion)

Aujourd'hui, `cars.json` est intégré au build : changer `"available"` nécessite un nouveau `npm run build` + redéploiement. C'est le point que tu as soulevé — voici les options, sans ajouter de vrai backend :

### Option retenue : Google Apps Script / Google Sheets (lecture seule côté site)

1. Publie le tableau Google Sheets en tant qu'API via Apps Script, en exposant une URL publique de type `https://script.google.com/macros/s/.../exec`.
2. Colle l'URL dans le fichier `.env` à la racine (déjà ignoré par git) :
   ```
   VITE_GOOGLE_SHEET_API_URL=https://script.google.com/macros/s/.../exec
   ```
3. Relance `npm run dev`. Le site (`src/data/carsSource.ts`) va automatiquement lire les données depuis cette URL à chaque chargement, avec repli automatique sur le fichier local si la requête échoue ou si la variable n'est pas définie.

Pour changer la disponibilité : tu modifies directement les données dans la feuille Google Sheets ou dans le script associé, aucune mise en ligne à refaire — le site relit à chaque visite.

**Limite assumée** : c'est un GET public en lecture seule. L'URL du script est publique, donc le contenu est visible par quiconque l'a. C'est acceptable ici car le catalogue est déjà public.

### Autres options possibles si tu veux aller plus loin un jour

- **Airtable API** : proche de Google Sheets mais avec une interface plus riche pour gérer un catalogue.
- **Cloudflare Worker / petite fonction serverless** : si un jour tu veux un vrai bouton "Disponible / Indisponible" directement sur le site (écriture), il faudra un minimum de backend pour protéger l'écriture — c'est la seule option qui permette ça proprement.

L'intégration Google Sheets est maintenant prise en charge côté site. Il ne te reste qu'à renseigner l'URL dans `.env`.

## QR code

Généré directement dans le navigateur (librairie `qrcode`) à partir du lien WhatsApp de la voiture — rien à héberger séparément.

## SEO & accessibilité

- `public/robots.txt` + `public/sitemap.xml` (à mettre à jour avec ton vrai domaine).
- Balises meta description, Open Graph, canonical, et JSON-LD (`AutoRental`) sur la page d'accueil.
- Un seul `<h1>` par page, landmarks sémantiques (`header`, `main`, `footer`, `nav`), lien d'évitement ("Aller au contenu principal") pour la navigation clavier.
- Focus visible au clavier, `aria-current="page"` sur le lien de nav actif, `aria-disabled` sur les boutons de voitures indisponibles, `prefers-reduced-motion` respecté (bandeau du hero, transitions).
- Favicon SVG léger (`public/favicon.svg`).
