# CLAUDE.md — TandinShop Backend

Guidance for Claude Code / future devs working on this server.

## Overview

Express + MongoDB REST API that exists for **one reason**: to be a faithful,
drop-in replacement for the dead `https://tandinshop-server.vercel.app/` that the
React frontend in `../frontend` expects. The frontend is the source of truth —
its Redux slices (`../frontend/src/Redux/Reduser/`), axios helpers
(`../frontend/src/Hooks/`), and feature hooks (`../frontend/src/Hook/`) define
the exact endpoints, request bodies, and **response wrapper shapes**. Those are
captured in [`API_CONTRACT.md`](./API_CONTRACT.md) — read it before changing any
response shape.

## Stack

Node + Express 4, Mongoose 8, JWT (`jsonwebtoken`/`bcryptjs`), `multer`+`sharp`
for image processing, **Cloudinary** for image storage (`config/cloudinary.js`,
env: `CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET`), `express-validator`.

## Deployment (Vercel)

Deployed as a single serverless function: `api/index.js` exports the Express app
and `vercel.json` rewrites every path to it. `server.js` only calls
`app.listen()` when `process.env.VERCEL` is unset (local dev). `config/db.js`
caches the mongoose connection promise across warm invocations. Production URL:
`https://tandinshop-server-eight.vercel.app` (project `tandinshop-server`,
deploy with `vercel deploy --prod` from `./backend`). Env vars live in the
Vercel project (set them with `vercel env add NAME production --value "..."` —
do NOT pipe values via PowerShell `echo |`, it corrupts them). Vercel
Deployment Protection is disabled on the project; re-enabling it breaks all
public API access (requests 401/hang).

## Commands

```bash
npm install
npm run seed     # reset DB + placeholder images; creates admin@gmail.com/pass123
npm run dev      # nodemon on PORT (default 8000)
npm start
```

## Structure & conventions

- `routes/index.js` → `mountRoutes(app)` mounts every domain under `/api/v1`.
- One `controllers/<domain>Controller.js` + `routes/<domain>Route.js` per domain.
- `controllers/handlersFactory.js` holds generic CRUD used by the simple
  resources (category, subcategory, brand, product, coupon). Cart/order/auth/
  wishlist/address have bespoke controllers because their response shapes differ.
- `utils/apiFeatures.js` builds list queries (filter/search/sort/paginate) and
  produces `paginationResult` (`numberOfPages`).
- Auth lives in `controllers/authController.js`, which also exports `protect`
  (verify JWT) and `allowedTo(...roles)` (RBAC) middleware. `sanitizeUser`
  there defines the **flat** user object the frontend stores.

## Response-shape rules that MUST hold (else the frontend breaks)

- **List GET** → `{ results, paginationResult: { numberOfPages, currentPage, limit, next?, prev? }, data: [...] }`.
- **Single GET / create / update** → `{ data: {...} }`.
- **Delete** → HTTP **200** `{ status, message }` (slices check `payload.status === 200`).
- **Auth login/signup** → `{ token, data: <flat user> }` (frontend stores `response.data.data`, NavBar reads `user.name`/`user.role`).
- **updateMe** → `{ data: { user: <flat user> } }`, HTTP 200.
- **Cart GET** → `{ numOfCartItems, data: { _id, products:[{_id,product,count,color,price}], totalCartPrice, totalAfterDiscount?, coupon? } }`; cart `product` is populated incl. `category.name` + `brand.name`.
- **Orders GET** → `{ results, pagination: { totalPages, currentPage }, data:[...] }` (note: `pagination`, NOT `paginationResult`). Accepts optional `?isPaid=true|false` and `?isDelivered=true|false` status filters (used by the admin orders page) on top of `page`/`limit`; any other value is ignored (unfiltered).
- **Products**: `category`/`brand` are left as **ID strings** (the product detail page fetches them separately). Cart & order items DO populate them.
- **Reviews** use field names `review` (text) + `rating` (number).

## Gotchas

- Images are uploaded to **Cloudinary** (sharp processes the buffer in memory,
  `uploadBuffer()` streams it up) and the DB stores the full `https://res.cloudinary.com/...`
  URL. The model `post('init')`/`post('save')` hooks that prefix `BASE_URL` only
  fire for legacy non-`http` filenames and are now effectively no-ops — keep them
  for back-compat. The seed also uploads its placeholders to Cloudinary, so it
  needs the `CLOUDINARY_*` env vars and works against any DB (local or Atlas).
- `forgotPasswords` prints the reset code to the server console (no SMTP).
- CORS allows `CLIENT_URL` (the deployed frontend, `https://tandinshop.vercel.app`
  in production) plus `http://localhost:3000` — both always.
- The frontend's `useGetData*` helpers return the HTTP **body**, while
  `useInsertData`/`useUpdateData`/`useDelete*` return the **full axios response**
  — this is why POST/PUT/DELETE consumers read `.status` and `.data.*`.
- Some frontend read paths are latent bugs that can't all be satisfied at once
  (e.g. the disabled `ProtectedRoutHook` reads `user.data.role` while the live
  NavBar reads `user.role`). We optimize for the rendered UI; see API_CONTRACT.md.

## Domains

auth, users, categories, subcategories, brands, products, reviews, wishlist,
addresses, cart, coupons, orders.
