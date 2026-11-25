# Assignment 4 — COMP229

Le portfolio d’Assignment 3, placé dans la structure du dépôt du professeur (Vite + Express). Un seul service Render sert le site et l’API.

## Lancer en local

```powershell
cd c:\Users\zonon\Documents\4ChangeHub\MERN\comp229-assignment4
npm install
npm install --prefix server
npm install --prefix client
npm run dev
```

- Site : http://localhost:5173
- API : http://localhost:3001
- `server/.env` contient `MONGO_URI`, `JWT_SECRET`, `ADMIN_NAME`, `ADMIN_EMAIL` et `ADMIN_PASSWORD`. Il ne doit pas être commité.

La page d’accueil affiche **Welcome to My Portfolio**. Les pages sont Home, About, Projects, Education, Services, Contact, Sign in et Sign up.

## Tests

```powershell
npm test
```

Le test client vérifie que le formulaire Contact vide affiche `First name is required` et n’appelle pas l’API, puis qu’un message valide est envoyé à `POST /api/contacts`. Le test serveur vérifie que le jeton contient le rôle enregistré en base.

Vidéo Cypress, avec `npm run dev` déjà lancé :

```powershell
npx --prefix client cypress install
npm run e2e --prefix client
```

La vidéo est dans `client/cypress/videos`.

## Performance

About, Projects, Education, Services, Contact, Sign in, Sign up et Messages sont chargés avec `React.lazy`. Le build de production laisse ces pages dans des fichiers séparés. Le fichier principal fait 366,51 kB, gzip 112,03 kB. Contact fait 4,53 kB, gzip 1,40 kB, et n’est téléchargé qu’à l’ouverture de la page.

## Déploiement Render

- Build command : `npm run render-build`
- Start command : `npm start`
- Variables : `MONGO_URI`, `JWT_SECRET`, `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- Ne pas définir `PORT`.

`https://TON-SERVICE.onrender.com/api/health` répond `{ "ok": true, "message": "Welcome to My Portfolio application." }`.

## Aide IA à déclarer

Cursor a aidé à reporter le portfolio d’Assignment 3 dans la structure Vite/Express du dépôt du cours, et à écrire les tests du formulaire Contact. L’interface et les routes du portfolio viennent d’Assignment 3. La structure client/serveur vient de https://github.com/CENT-COL/comp229-f26-mern
