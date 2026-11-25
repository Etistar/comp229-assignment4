# Assignment 4 — COMP229

Application du professeur (Vite + Express 5 + MongoDB), préparée pour un seul service Render. Le dossier `Assignment4` d’origine (Create React App, port 5000) n’est pas celui à déployer.

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
- Le fichier `server/.env` contient `MONGO_URI` et `JWT_SECRET`. Il ne doit pas être commité.

## Tests

```powershell
npm test
npm run build
```

Le test client vérifie qu’un mot de passe refusé affiche le message de l’API et n’ouvre pas l’étape authenticator. Le test serveur vérifie que le jeton n’est émis qu’avec `twoFactorEnabled: true`.

Vidéo Cypress, sur ta machine :

```powershell
npm install --prefix client
npx --prefix client cypress install
npm run dev
npm run e2e --prefix client
```

La vidéo est dans `client/cypress/videos`.

## Performance

Login, Register, la liste des projets et le détail d’un projet sont chargés seulement quand on ouvre leur page (`React.lazy`). Build de production mesuré :

- page d’accueil, `index-*.js` : 238,40 kB, gzip 75,08 kB
- champs de formulaire, chargés seulement sur Login ou Register, `TextField-*.js` : 79,57 kB, gzip 24,50 kB
- pages séparées : login 1,24 kB, register 0,95 kB, projects 3,01 kB, détail 1,24 kB, authenticator 1,27 kB (gzip)

Avant cette modification, le code du professeur mettait ces modules dans le premier fichier. Après, ils n’apparaissent dans l’onglet Network qu’au premier clic sur Login ou Projects.

## Branche à montrer

La phrase visible est `Assignment 4 — Etienne ZONON` dans `client/src/core/Home.jsx`. Change un mot sur une branche, ouvre une pull request, et garde la capture avant / après. Le workflow `.github/workflows/ci.yml` lance les tests et le build, puis appelle le hook Render si le secret `RENDER_DEPLOY_HOOK_URL` existe.

## Déploiement Render

Un seul Web Service, à la racine de **ton** dépôt GitHub (pas le dépôt CENT-COL).

- Build command : `npm run render-build`
- Start command : `npm start`
- Node 20
- Variables : `MONGO_URI`, `JWT_SECRET`
- Ne pas définir `PORT` : Render le fournit, et le serveur l’utilise.

`vite` est une devDependency. `render-build` installe le client avec `--include=dev`, sinon le build Render échoue quand `NODE_ENV=production`.

Vérification après le déploiement : `https://TON-SERVICE.onrender.com/api/health` doit répondre `{ "ok": true }`, et la page d’accueil doit afficher la phrase Assignment 4.

## Connexion

Le mot de passe ne donne pas le jeton. Après Register ou Login, l’application affiche un QR code. Il faut une application authenticator (Google Authenticator, Microsoft Authenticator, etc.), scanner le QR, puis entrer le code à 6 chiffres. Sans cette étape, Projects reste inaccessible : c’est le comportement du code du professeur.

## Aide IA à déclarer

Les tests, le chargement différé des pages, le port Render et le workflow ont été préparés avec Cursor. Le code des routes, de l’authentification à deux facteurs et des projets vient du dépôt du cours : https://github.com/CENT-COL/comp229-f26-mern
