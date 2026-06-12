# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An Arabic-language (RTL content) e-commerce storefront ("TandinShop") built with Create React App. It is the **frontend only** — it consumes the REST API in `../backend` (endpoints under `/api/v1/...`; locally `http://localhost:8000`, in production `https://tandinshop-server-eight.vercel.app`). The app covers a customer storefront (browse products/categories/brands, cart, checkout, reviews, wishlist, addresses, orders) and an admin area (manage products, categories, subcategories, brands, coupons, orders).

## Tech Stack

- React 18 + Create React App (`react-scripts` 5.0.1) — JavaScript only, no TypeScript
- Redux Toolkit 2 (`createSlice` + `createAsyncThunk`) with `react-redux`
- React Router DOM v7
- Axios for HTTP
- UI: React-Bootstrap 2 / Bootstrap 5 (primary), some MUI (`@mui/material`, `@mui/joy`), `react-toastify` for notifications, Swiper/`react-multi-carousel` for sliders

## Commands

```bash
npm install        # install dependencies
npm start          # dev server at http://localhost:3000
npm run build      # production build into build/
npm test           # Jest in watch mode (CRA)
npm test -- --watchAll=false                 # run all tests once
npm test -- App.test.js --watchAll=false     # run a single test file
```

There is no lint script; ESLint runs via CRA's `react-app` config during `npm start`/`build`. The API base URL comes from `REACT_APP_API_URL` (baked in at build time, CRA-style) with a `http://localhost:8000/` fallback — see [src/Api/baseURL.js](src/Api/baseURL.js). The production deployment on Vercel (project `tandinshop`, https://tandinshop.vercel.app) sets it to `https://tandinshop-server-eight.vercel.app/` plus `CI=false` (CRA treats the codebase's many lint warnings as errors when `CI=true`). Deploy with `vercel deploy --prod` from `./frontend`.

## Architecture

Data flows in one direction through four layers:

```
Page (src/Page) → Component (src/Component) → Feature Hook (src/Hook)
  → Redux thunk/slice (src/Redux/Reduser) → Axios helpers (src/Hooks) → baseURL (src/Api)
```

- **`src/Api/baseURL.js`** — single Axios instance with the hardcoded server URL.
- **`src/Hooks/`** (plural) — generic CRUD helpers (`UseGetData`, `UseInsertData`, `UseUpdateData`, `UseDeleteData`). Despite the `use` prefix these are **not React hooks**, just async functions. They attach `Authorization: Bearer <token>` from `localStorage.getItem("token")`; the `*WithImage` variants send `multipart/form-data`.
- **`src/Redux/Reduser/`** — one slice per domain (products, categories, brands, cart, auth, reviews, wishlist, coupons, addresses, orders, logged user). Thunks are named `featch*` (sic). Slices store the **raw API response**, so components read e.g. `state.allProduct.allProduct.data`. All slices are registered in [src/Redux/Store.js](src/Redux/Store.js).
- **`src/Hook/`** (singular) — per-feature logic hooks (e.g. `LoginHook`, `AddToCartHook`). They own local form state, dispatch thunks, select state, fire `notify()` toasts, and **return positional arrays** that components destructure in order. Follow this pattern when adding features.
- **`src/Page/`** — route-level pages (one per route in [src/App.js](src/App.js)); **`src/Component/`** — presentational/composite components grouped by domain (Admin, Cart, Product, User, Utility, ...).

**Auth model:** login stores `token` and `user` (JSON) in localStorage, then does `window.location.href = "/"` — a deliberate full reload so the navbar (outside the router, see Gotchas) picks up the new user. `ProtectedRoutHook` derives `isUser`/`isAdmin` from `localStorage.user.data.role` (any role other than `"user"` is treated as admin).

## Conventions

- Directory-per-domain naming with PascalCase files; pages end in `Page.js`, feature hooks in `Hook.js`, slices in `SliceReducer.js`.
- User-facing strings are Arabic; comments are mixed Arabic/English.
- Components are function components; state via Redux + local `useState`, no context providers.

## Gotchas

- **Misspelled names are load-bearing.** `Redux/Reduser/`, `ProdectedRoute.js`, `featch*` thunks, `Copone`, `Detailes`, `Adress`, `UseNotifaction.js`, and the directory literally named `src/Hook/SubCategory.js/` are referenced by imports throughout. Do not "fix" a spelling without updating every import.
- **Two hook directories:** `src/Hook/` (feature hooks) vs `src/Hooks/` (axios CRUD helpers). Easy to import from the wrong one.
- **Route protection is currently disabled.** The `<ProtectedRoute>` wrappers around the admin and user route groups in [src/App.js](src/App.js) are commented out, so those routes are open. `ProtectedRoute` itself works and expects an `auth` prop from `ProtectedRoutHook`.
- **`NavBarLogin` is rendered outside `BrowserRouter`** in App.js (Footer too). Router hooks/`<Link>` will crash there — it uses plain `<a href>` links, which cause full page reloads. Don't move router-dependent code into it without also moving it inside the router.
- **Header search works around the router boundary.** Pressing Enter in the navbar search navigates via `window.location.href = "/products?keyword=..."` (full reload — `useNavigate` is unavailable there). `RiewSearchProductHook` and `NavBarSearchHook` read `keyword` from the URL on mount; while already on `/products`, typing live-searches through the shared Redux store (debounced 500ms). Product search sends the backend's `keyword` query param (regex, partial match) — **not** `title` (exact match).
- **[LoginHook.js](src/Hook/Auth/LoginHook.js) ships with prefilled admin credentials** (`admin@gmail.com` / `pass123`) as default form state — a dev artifact to be aware of (and not to replicate).
- `useGetData(url, paramas)` passes its second argument as the axios **config**, not query params — callers embed query strings directly in the URL (`?limit=...&page=...`). Keep doing that.
- `React.StrictMode` is commented out in [src/index.js](src/index.js); re-enabling it may surface double-invocation effects the code doesn't currently tolerate.
- No backend code lives here; if API responses change shape, fixes belong in the slices/hooks, not the server.
- The project is not a git repository and has only the default CRA test ([src/App.test.js](src/App.test.js)).
