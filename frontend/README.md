# JWT Auth Frontend

A React single-page application that provides a **Login** page and a protected **Welcome** page, backed by the FastAPI JWT Authentication API in the `backend/` folder.

---

## Features

| Feature | Detail |
|---|---|
| Login page | Calls `POST /auth/token` and stores the JWT in `sessionStorage` |
| Protected route | `/welcome` redirects to `/` if no token is present |
| Welcome page | Displays the logged-in username and a sign-out button |
| Session token | Token is cleared when the browser tab is closed (sessionStorage) |
| Responsive design | Works on mobile, tablet, and desktop |
| Design system | Follows the Stripe-inspired design language from `DESIGN.md` |

---

## Project Structure

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── GradientMesh.jsx    # Decorative gradient mesh backdrop
│   │   └── ProtectedRoute.jsx  # Route guard – redirects unauthenticated users
│   ├── pages/
│   │   ├── Login.jsx           # Login form page
│   │   ├── Login.module.css
│   │   ├── Welcome.jsx         # Protected welcome page
│   │   └── Welcome.module.css
│   ├── services/
│   │   └── auth.js             # Login / logout / token helpers (sessionStorage)
│   ├── App.jsx                 # Router configuration
│   ├── main.jsx                # React entry point
│   └── index.css               # Design tokens (CSS custom properties)
├── index.html
├── package.json
├── vite.config.js
└── README.md                   # This file
```

---

## Prerequisites

- **Node.js 18+** (tested with Node 24)
- **npm 9+**
- The backend API running at `http://localhost:8000` (see `backend/README.md`)

---

## Local Development

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. (Optional) Configure the API URL

By default the frontend points to `http://localhost:8000`.
To override, create a `.env.local` file:

```dotenv
VITE_API_URL=http://localhost:8000
```

### 3. Start the backend

```bash
# In a separate terminal
cd backend
poetry run uvicorn app.main:app --reload
```

### 4. Start the dev server

```bash
cd frontend
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## Build for Production

```bash
cd frontend
npm run build
# Output in frontend/dist/
```

Preview the production build locally:

```bash
npm run preview
```

---

## Default Credentials

These are provided by the backend's simulated user database:

| Username | Password |
|---|---|
| `admin` | `admin123` |

---

## Routes

| Path | Description | Auth required |
|---|---|---|
| `/` | Login page | No |
| `/welcome` | Welcome / dashboard page | **Yes** |
| Any other | Redirects to `/` | — |

---

## How It Works

1. The user submits credentials on the Login page.
2. The frontend sends `POST /auth/token` to the backend.
3. On success, the `access_token` is saved to `sessionStorage`.
4. React Router redirects the user to `/welcome`.
5. `ProtectedRoute` checks `sessionStorage` on every navigation — if no token is present, it redirects back to `/`.
6. Clicking **Sign out** removes the token from `sessionStorage` and redirects to `/`.

---

## Design System

The UI follows the Stripe-inspired design language described in `DESIGN.md` at the project root:

- **Primary color**: `#533afd` (indigo) for CTAs and focus states.
- **Typography**: Inter (weight 300) with negative letter-spacing on display sizes.
- **Buttons**: Pill-shaped (`border-radius: 9999px`), `8px 16px` padding.
- **Gradient mesh**: Atmospheric pastel backdrop on marketing/hero surfaces.
- **Spacing**: 8px base unit system.
