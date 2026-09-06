# SocietySphere

A recruitment portal for college societies — browse societies, view open roles, and apply, all in one place.

## Live Preview

## Features

- **Home page** with a live stats overview (societies, categories, open roles)
- **Society directory** with category filter tabs (Tech / Literary / Sports) and live text search
- **Society detail pages** with description, recruitment criteria, and open roles
- **Application form** with controlled inputs and client-side validation
- **Applications persist via `localStorage`** — survives page refresh
- **Admin-style Applications view** — see all submitted applications, color-coded by society category
- **Dark mode by default**, with a light mode toggle (persisted across sessions)
- **Fully responsive** — mobile-first layout
- **Recruitment status badges** (Open/Closed) — closed societies block new applications
- **Society recommendation quiz** — a short quiz that suggests which society best fits the user

## Tech Stack

- [React](https://react.dev/) (Vite)
- [React Router](https://reactrouter.com/) — client-side routing, dynamic routes
- [Lucide React](https://lucide.dev/) — icons
- Plain CSS with custom properties (CSS variables) for theming — no CSS framework
- `localStorage` for persistence (no backend in this track)

## Getting Started

```bash
git clone https://github.com/shauryakushwaha08/SocietySphere.git
cd SocietySphere
npm install
npm run dev
```

Visit `http://localhost:5173`.