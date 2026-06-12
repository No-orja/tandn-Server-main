# TandinShop — Backend Server

A drop-in REST API replacement for the dead server
`https://tandinshop-server.vercel.app/` that the **TandinShop** Arabic
e-commerce React frontend (in `../frontend`) talks to. Every endpoint and
response shape was reverse-engineered from the frontend code — see
[`API_CONTRACT.md`](./API_CONTRACT.md).

## Stack

- Node.js + Express 4
- MongoDB + Mongoose 8
- JWT auth (`jsonwebtoken` + `bcryptjs`)
- Image uploads: `multer` (memory) + `sharp` (resize), served statically from `uploads/`
- Validation: `express-validator`

## Prerequisites

- Node.js 18+
- A running MongoDB (local `mongodb://127.0.0.1:27017` or MongoDB Atlas)

## Setup

```bash
cd backend
npm install
cp .env.example .env      # then edit values if needed
npm run seed              # creates admin/user + sample catalog with images
npm run dev               # starts on http://localhost:8000 (nodemon)
# or: npm start
```

### Environment variables (`.env`)

| Var | Purpose | Default |
| --- | --- | --- |
| `PORT` | server port | `8000` |
| `NODE_ENV` | `development` shows full errors + morgan logs | `development` |
| `BASE_URL` | host used to build absolute image URLs | `http://localhost:8000` |
| `DB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/tandinshop` |
| `JWT_SECRET` | JWT signing secret | — |
| `JWT_EXPIRES_IN` | token lifetime | `90d` |
| `CLIENT_URL` | CORS origin (React app) | `http://localhost:3000` |

## Seeded accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@gmail.com` | `pass123` |
| User | `user@gmail.com` | `pass123` |

The login form in the frontend ships with `admin@gmail.com` / `pass123`
pre-filled, so you can log in as admin immediately after seeding.

> **Password reset:** there is no SMTP service wired up. When you call
> `forgotPasswords`, the 6-digit reset code is printed to the **server console**
> — copy it from there to verify the code in the UI.

## npm scripts

| Script | Description |
| --- | --- |
| `npm start` | run the server (`node server.js`) |
| `npm run dev` | run with nodemon (auto-reload) |
| `npm run seed` | wipe + reseed the database and placeholder images |

## Connecting the frontend (one-line change)

The frontend hardcodes the API base URL in
[`frontend/src/Api/baseURL.js`](../frontend/src/Api/baseURL.js). Change it to
point at this server:

```js
import axios from 'axios'

const baseURL = axios.create({ baseURL: "http://localhost:8000/" })
export default baseURL
```

(That is the **only** change required in the frontend — do not change anything
else there. This change is *suggested*, not applied.)

Then run the frontend (`cd ../frontend && npm install && npm start`) on
`http://localhost:3000`, which CORS already allows.

## Project structure

```
backend/
├── config/db.js            # Mongo connection
├── models/                 # Mongoose schemas (user, product, category, ...)
├── controllers/            # request handlers (+ handlersFactory for shared CRUD)
├── routes/                 # one router per domain, mounted in routes/index.js
├── middlewares/            # error handler, auth, multer upload, validator
├── utils/                  # ApiError, ApiFeatures, createToken, validators/
├── seed/seed.js            # database seeder
├── uploads/                # static image storage (products/categories/brands/users)
├── server.js               # app entry point
├── API_CONTRACT.md         # the extracted frontend ↔ backend contract
└── CLAUDE.md               # notes for future AI/devs working on this server
```

## Notes / gotchas

- **Delete endpoints return HTTP 200** (not 204): the product and cart Redux
  slices explicitly check `action.payload.status === 200`.
- **Images are absolute URLs** in responses (`http://localhost:8000/products/…`).
  If you change `BASE_URL`/`PORT`, re-seed so stored images resolve.
- **Pagination keys differ by design** to match the frontend: products /
  categories / brands / reviews use `paginationResult.numberOfPages`; orders use
  `pagination.totalPages`.
- See `API_CONTRACT.md` for the exact request/response shape of every endpoint
  and the read-path in the frontend that justifies it.
