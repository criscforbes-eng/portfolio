# runConnect

Short description
runConnect is a small web app that demonstrates a full‑stack web project with a static frontend (HTML/CSS/JS) and a Node.js + Express backend using MongoDB for storage. It’s suitable as a portfolio piece to show frontend + backend integration. The main purpose of this project is to give users the chace to create Running activities and to be part of them.

Preview / Demo

- Add a deployed demo URL here once available.
- Add a screenshot under `images/` and reference it here:

  ![runConnect screenshot](images/screenshot.png)

Tech stack

- Frontend: HTML, CSS, JavaScript (static files)
- Backend: Node.js + Express
- Database: MongoDB (local or Atlas)
- Dev tools: npm, optionally nodemon

Project structure

- frontend/
  - css/
  - js/
  - img/
  - carrerasCorredor.html
  - carrerasOrganizador.html
  - confirmarInscripcionCorredor.html
  - crearCarreraOrganizador.html
  - dashboardMenuCorredor.html
  - dashboardMenuOrganizador.html
  - inscripcionACarreraCorredor.html
  - landingPage.html
  - login.html
  - perfilVerEditarCorredor.html
  - perfilVerEditarOrganizador.html
  - registroCorredor.html
  - registroOrganizador.html
- backend/
  - package.json
  - app.js
  - routes/
  - models/
  - controllers/
  - doc/
- images/ (screenshots)
- README.md (this file)

Prerequisites

- Node.js (v16+ recommended)
- npm (or yarn)
- MongoDB (local) OR Docker OR MongoDB Atlas account

Environment (.env)
Create `projects/runConnect/backend/.env` (do not commit) based on `.env.example` (committed). Example keys:

- MONGODB_URI — connection string for MongoDB
- PORT — backend port (e.g., 3000)
- JWT_SECRET — secret for signing JWTs (if used)
- NODE_ENV — development/production

Run locally — backend (Node/Express + MongoDB)

1. Start MongoDB:
   - Local install: start `mongod` as usual, or
   - Docker (quick):
     ```bash
     docker run -d -p 27017:27017 --name runconnect-mongo mongo:6
     ```
2. Open a terminal and start the backend:
   ```bash
   cd projects/runConnect/backend
   npm ci         # or npm install
   # create .env (see .env.example)
   npm run dev    # if you have nodemon script
   # OR
   npm start
   ```
3. Backend should log the listening port (e.g., http://localhost:3000). API endpoints will be available there.

Run locally — frontend (static)

1. Serve the static frontend files (so fetch/XHR works reliably):
   ```bash
   cd projects/runConnect/frontend
   # Python 3 simple server:
   python -m http.server 8000
   # OR Node static server:
   npx http-server -p 8000
   ```
2. Open http://localhost:8000 in your browser and verify API calls are pointed to `http://localhost:3000` (or the backend port).

CORS / API base URL

- If the frontend makes fetch requests, make sure the backend enables CORS (npm package `cors`) or that the frontend points to the correct backend origin.
- Example Express CORS usage:
  ```js
  const cors = require("cors");
  app.use(cors({ origin: "http://localhost:8000" }));
  ```

Optional: seed the database

- If you have seed data, add a script (e.g., `scripts/seed.js`) and run:
  ```bash
  node scripts/seed.js
  ```

Useful scripts (package.json)

- dev: run nodemon for development
- start: run node server.js for production
  (If you don’t have these, consider adding them to package.json.)

Security / env notes

- Do NOT commit `.env` or secrets. Add `.env` to `.gitignore`.
- Commit a `.env.example` with placeholder names (example provided).

Screenshots & assets

- Put screenshots under `projects/runConnect/images/` and reference them in this README. Keep sizes moderate (< 1–2 MB).

What I learned

- Add a short bullet list of lessons, e.g.:
  - Implemented RESTful API endpoints with Express
  - Connected Express to MongoDB and designed Mongoose models
  - Handled CORS and same‑origin issues for local development

Troubleshooting

- "ECONNREFUSED" from frontend: ensure backend is running and the fetch URL matches.
- MongoDB connection errors: check `MONGODB_URI` and that mongod is running.
- If `npm ci` fails, try `npm install`.

License
This project is covered by the root LICENSE (MIT).
