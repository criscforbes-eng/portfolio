# tapaProducciones

Short description
tapaProducciones is a small web site that demonstrates a multi‑page web site with a static frontend (HTML/CSS/JS) and the use of EmailJS for receiving the response via email from the website "Contact" form. It’s suitable as a portfolio piece to show frontend + EmailJS integration. The main purpose of this project is to give users the chace to know more about the services that the company "Tapa Producciones" offers, and get in contact.

Preview / Demo

- Add a deployed demo URL here once available.
- Add a screenshot under `images/` and reference it here:

  ![tapaProducciones screenshot](images/screenshot.png)

Tech stack

- Frontend: HTML, CSS, JavaScript (static files)
- EmailJS

Project structure

- frontend/
  - css/
  - js/
  - img/
  - contacto.html
  - equipoHumano.html
  - equipoTecnologico.html
  - eventosCultura.html
  - eventosDeporte.html
  - eventosEntretenimiento.html
  - index.html
  - nosotros.html
- images/ (screenshots)
- README.md (this file)

Prerequisites

- none

Screenshots & assets

- Put screenshots under `projects/tapaProducciones/images/` and reference them in this README. Keep sizes moderate (< 1–2 MB).

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
