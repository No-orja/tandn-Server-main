# TandinShop — API Contract

This contract was **extracted from the frontend code** (Redux slices in
`frontend/src/Redux/Reduser/`, the axios CRUD helpers in `frontend/src/Hooks/`,
and the feature hooks/components that read the stored responses). Nothing here is
invented — every shape is justified by a concrete read path in the frontend.

All endpoints are mounted under `/api/v1`. Base URL when running locally:
`http://localhost:8000/`.

## How the frontend consumes responses (critical background)

The axios helpers (`frontend/src/Hooks/`) behave differently, which dictates the
exact wrapper shapes:

| Helper | Returns | Used by |
| --- | --- | --- |
| `useGetData` / `useGetDataToken` | `response.data` (**HTTP body only**) | all GET thunks |
| `useInsertData` / `useInsertDataWithImage` | **full axios response** (`.data` = body, `.status` = HTTP status) | POST thunks |
| `useUpdateData` | **full axios response** | most PUT thunks |
| `useUpdateDataWithImage` | `response.data` (body) | product update |
| `useDeleteData` / `useDeleteDataToken` | **full axios response** | DELETE thunks |

Consequences honored by this server:
- For **GET** endpoints the slice stores the body directly, so components read
  e.g. `state.allProduct.allProduct.data`.
- For **POST/PUT/DELETE** the slice stores the whole axios response, so
  components check `response.status === 200/201` and read `response.data.*`.
  Therefore **delete endpoints return HTTP 200** (not 204) because the product
  and cart slices explicitly check `action.payload.status === 200`.

All authenticated requests send `Authorization: Bearer <token>` (token from
`localStorage`). Image uploads are `multipart/form-data`.

---

## AUTH (`state.Auth`, slice `frontend/src/Redux/Reduser/AuthReducer.js`)

### POST `/api/v1/auth/signup`  — public
Body: `{ name, email, password, passwordConfirm?, phone? }`
`RegisterHook.js` reads `response.data.token` and stores `response.data.data` as the user.

### POST `/api/v1/auth/login`  — public
Body: `{ email, password }`
`LoginHook.js` lines 56–61:
```js
if (response?.data?.token && !error) {
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.data));
}
```
**Required response body** (HTTP 200/201):
```json
{
  "token": "<jwt>",
  "data": { "_id": "...", "name": "...", "email": "...", "phone": "...", "role": "user|admin", "active": true }
}
```
> **Ambiguity resolved.** `NavBarLogin.js` (rendered on every page) reads
> `user.name` and `user.role` **flat**, while the *disabled* `ProtectedRoutHook.js`
> reads `userData.data.role` (nested). The flat shape is the one the live UI uses,
> so the stored user (`response.data.data`) is a **flat** user object. The nested
> read in `ProtectedRoutHook` is a latent bug in commented-out route guards and is
> not satisfiable simultaneously; we optimize for the rendered NavBar + profile.

### POST `/api/v1/auth/forgotPasswords` — public
Body: `{ email }`. `ForgetPasswordHook` reads `response.data.status === "Success"` and `response.data.message`.
Response: `{ "status": "Success", "message": "Reset code sent to email" }`.
(No SMTP configured — the 6-digit reset code is printed to the **server console**.)

### POST `/api/v1/auth/verifyResetCode` — public
Body: `{ resetCode }`. Reads `response.data.status === "Success"`.
Response: `{ "status": "Success" }`.

### PUT `/api/v1/auth/resetPassword` — public
Body: `{ email, newPassword }`. `ResetPasswordHook` reads `response.data.token`.
Response: `{ "token": "<jwt>", "data": { ...user } }`.

---

## USERS / LOGGED USER (`state.userData`, `LoggedUserSliceReducer.js`)

### PUT `/api/v1/users/updateMe` — auth
Body: `{ name, email, phone }`. `UpdateUserDataHook` checks `response.status === 200`
then stores `response.data.data.user`.
Response (HTTP 200): `{ "data": { "user": { ...flat user } } }`.

### PUT `/api/v1/users/changeMyPassword` — auth
Body: `{ currentPassword, password, passwordConfirm }`. `UpdateUserPassHook` checks
`response.status === 200`. Response: `{ "token": "<jwt>", "data": { ...user } }`.

> No admin `/users` list/create/delete endpoints are called anywhere in the
> frontend (grep of `/api/v1/users` only finds `updateMe` + `changeMyPassword`).
> A minimal admin user CRUD is still provided for completeness but is not required.

---

## PRODUCTS (`state.allProduct`, `ProductSliceReducer.js`)

Read paths: `allProduct.data` (array), `allProduct.paginationResult.numberOfPages`
(pagination), `selectedProduct.data` (single), `peoductsByCategory.data`,
`searchResults.data`. Product fields read across cards/details/edit:
`_id, title, description, price, quantity, imageCover, images[], availableColors[],
ratingsQuantity, ratingsAverage, category, brand, subcategory[]`.

> `ProductText.js` dispatches `featchSpicificCategory(products.category)` and
> `featchSpicificBrand(products.brand)` — so on a product, **`category` and
> `brand` are ID strings (NOT populated)**. (Cart/Order items DO populate them.)

| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| GET | `/products?limit=&page=&keyword=&category=&brand=&sort=&...` | public | list + filter/search/sort/paginate |
| GET | `/products/:id` | public | single |
| POST | `/products` | admin | multipart |
| PUT | `/products/:id` | admin | multipart |
| DELETE | `/products/:id` | admin | returns **200** |

List response: `{ results, paginationResult: { currentPage, limit, numberOfPages, next?, prev? }, data: [ ...products ] }`
Single response: `{ data: { ...product } }`

Create multipart field names (from `AddProductHook.js`): `title, description,
quantity, price, category, brand, imageCover` (single file), `images` (multiple
files), `availableColors` (repeated), `subcategory` (repeated).

`imageCover`/`images` are returned as **absolute URLs**
(`http://localhost:8000/products/<file>`) — the frontend uses them directly as
`<img src>` and only prefixes a host when the value does not already start with `http`.

---

## CATEGORIES (`state.allCategory`, `CategorySliceReducer.js`)
Reads: `allCategory.data`, `allCategoryPage.paginationResult.numberOfPages`,
`spicificCategory.data` (`.name`). Fields: `_id, name, image`.

| Method | Path | Auth |
| --- | --- | --- |
| GET | `/categories?limit=&page=` | public |
| GET | `/categories/:id` | public |
| POST | `/categories` (multipart, field `image`) | admin |
| PUT | `/categories/:id` | admin |
| DELETE | `/categories/:id` | admin |
| GET | `/categories/:id/subcategories` | public |

List: `{ results, paginationResult, data:[{_id,name,image}] }`. Single: `{ data:{...} }`.
`image` returned as absolute URL `http://localhost:8000/categories/<file>`.

## SUBCATEGORIES (`state.allSubCategoy`, `SubCategorySliceReducer.js`)
Reads: `allSubCategory.data` (array of `{_id,name,category}`).

| Method | Path | Auth |
| --- | --- | --- |
| GET | `/subcategories` | public |
| GET | `/categories/:id/subcategories` | public |
| POST | `/subcategories` | admin |

POST body (from `AddSubCategryHook.js`): `{ name, category }`. Checks `response.status === 201`.

## BRANDS (`state.allBrand`, `BrandSliceReducer.js`)
Reads: `alBrand.data` (note the single-l `alBrand` key), `spicificBrand.data` (`.name`).
Fields: `_id, name, image`.

| Method | Path | Auth |
| --- | --- | --- |
| GET | `/brands?limit=&page=` | public |
| GET | `/brands/:id` | public |
| POST | `/brands` (multipart, field `image`) | admin |
| PUT | `/brands/:id` | admin |
| DELETE | `/brands/:id` | admin |

---

## CART (`state.Cart`, `CartSliceReducer.js`)

Read paths (`Cart.js`, `GetAllUserHook.js`, `OrderPayCashHook.js`):
`cartItems.numOfCartItems`, `cartItems.data.products` (array),
`cartItems.data.totalCartPrice`, `cartItems.data.totalAfterDiscount` (optional),
`cartItems.data.coupon` (optional), `cartItems.data._id`.
Each item (`CartItem.js`): `item._id`, `item.color`, `item.price`, `item.count`,
`item.product.{title,imageCover,ratingsAverage,category.name,brand.name}`
→ **cart product is populated incl. category & brand objects**.

| Method | Path | Auth | Body | Response status |
| --- | --- | --- | --- | --- |
| GET | `/cart` | auth | — | 200 |
| POST | `/cart` | auth | `{ productId, color }` | 201; reads `data.status === "success"`, `data.message` |
| PUT | `/cart/:itemId` | auth | `{ count }` | 200 |
| PUT | `/cart/applyCoupon` | auth | `{ couponName }` | 200 |
| DELETE | `/cart/:itemId` | auth | — | 200 |
| DELETE | `/cart` | auth | — | 200 |

Cart body shape:
```json
{ "status": "success", "message": "...", "numOfCartItems": 2,
  "data": { "_id": "...", "products": [
      { "_id": "...", "count": 1, "color": "#000",
        "price": 100,
        "product": { "_id": "...", "title": "...", "imageCover": "http://...",
                     "ratingsAverage": 4, "category": {"name":"..."}, "brand": {"name":"..."} } }
    ],
    "totalCartPrice": 100, "totalAfterDiscount": 90, "coupon": "SUMMER" } }
```

---

## ORDERS (`state.userOreder`, `CheckOutSliceReducer.js`)

| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| POST | `/orders/:cartId` | auth | body `{ details, city, postalCode, phone }`; checks `response.status === 201` |
| GET | `/orders` | auth | user→own, admin→all; optional `?isPaid=true\|false`, `?isDelivered=true\|false`, `page`, `limit` |
| GET | `/orders/:id` | auth | |
| PUT | `/orders/:id/pay` | admin | |
| PUT | `/orders/:id/deliver` | admin | |

GET `/orders` response (read `resAllOrder.data`, `resAllOrder.pagination.totalPages`):
```json
{ "results": 1, "pagination": { "totalPages": 1, "currentPage": 1 }, "data": [ { ...order } ] }
```
Order fields read: `id/_id, cartItems[].product.{title,imageCover}, cartItems[].count,
cartItems[].color, totalOrderPrice, isPaid, isDelivered, paymentMethodType,
user.{name,email}, shippingAddress.{details,phone,city,postalCode}, createdAt`.
GET `/orders/:id` → `{ "data": { ...order } }`.

---

## ADDRESSES (`state.userAddress`, `UserAdressSliceReducer.js`)

| Method | Path | Auth | Body |
| --- | --- | --- | --- |
| GET | `/addresses` | auth | — |
| POST | `/addresses` | auth | `{ alias, details, phone, city, postalCode }` |
| GET | `/addresses/:id` | auth | — |
| PUT | `/addresses/:id` | auth | address fields |
| DELETE | `/addresses/:id` | auth | — |

GET `/addresses` → `{ "data": [ {_id, alias, details, phone, city, postalCode} ] }`
(component reads `allAddresses[0].data` because the slice **pushes** each response
into an array).
GET `/addresses/:id` → `{ "data": { ...address } }` (reads `oneAddress.data.details/city/postalCode/phone`).

---

## WISHLIST (`state.WishList`, `WishSliceReducer.js`)

| Method | Path | Auth | Body |
| --- | --- | --- | --- |
| GET | `/wishlist` | auth | — |
| POST | `/wishlist` | auth | `{ productId }` |
| DELETE | `/wishlist/:productId` | auth | — |

GET `/wishlist` → `{ "status":"success", "count": N, "data": [ ...populated products ] }`
(`UserFavoriteProducts` reads `response.data` = array of products).

---

## REVIEWS (`state.Reviews`, `ReviewsSliceReducer.js`)

| Method | Path | Auth | Body |
| --- | --- | --- | --- |
| GET | `/products/:id/reviews?limit=&page=` | public | — |
| POST | `/products/:id/reviews` | auth (user) | `{ review, rating }` |
| PUT | `/reviews/:id` | auth (owner) | `{ review, rating }` |
| DELETE | `/reviews/:id` | auth (owner/admin) | — |

> Field names are `review` (text) and `rating` (number) — confirmed in
> `AddReviewHook.js` (`body: { review: rateText, rating: rateValue }`).
GET → `{ results, paginationResult: { numberOfPages }, data: [ { _id, review, rating,
user: { _id, name }, createdAt } ] }`. One review per user per product; rating
average + quantity recomputed on the product.

---

## COUPONS (`state.Copone`, `CoponeSliceReducer.js`)

| Method | Path | Auth | Body |
| --- | --- | --- | --- |
| GET | `/coupons` | admin | — |
| POST | `/coupons` | admin | `{ name, expire, discount }` |
| GET | `/coupons/:id` | admin | — |
| PUT | `/coupons/:id` | admin | `{ name, expire, discount }` |
| DELETE | `/coupons/:id` | admin | — |

GET `/coupons` → `{ data: [ {_id, name, expire, discount} ] }` (reads `allCopone.data`).
GET `/coupons/:id` → `{ data: { ...coupon } }` (reads `oneCoupon.data.name/expire/discount`).

---

## Errors
Consistent JSON: `{ "status": "fail"|"error", "message": "...", "errors"?: [ { "param": "...", "msg": "..." } ] }`.
`LoginHook` checks `error.message === "Incorrect email or password"`; auth hooks
check `error.status === "fail"` and `error.errors[i].msg`. Validation failures use
the `errors` array with `param`/`msg`.

## Pagination key differences (intentional, matching the frontend)
- products / categories / brands / reviews → `paginationResult.numberOfPages`
- orders → `pagination.totalPages` (+`currentPage`)
