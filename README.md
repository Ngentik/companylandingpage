# Ngentik website

The production landing page for Ngentik, a Finland-based technology services company. The site presents Ngentik's practical approach to automation, managed technology, infrastructure and digital solutions.

## Technology

- React and TypeScript
- React Router Framework Mode with Vite
- Static pre-rendering for meaningful build-time HTML
- CSS Modules and CSS custom properties
- Vitest and Testing Library
- ESLint and Prettier

## Prerequisites

- Node.js 24 LTS
- npm 11 or later

## Getting started

```sh
npm install
npm run dev
```

The development server prints its local URL to the terminal.

## Quality and build commands

```sh
npm run lint          # lint TypeScript and React
npm run typecheck     # generate route types and run strict TypeScript checks
npm test              # run the test suite once
npm run format:check  # check formatting
npm run build         # create the pre-rendered production build
npm run start         # preview the production client build
```

## Project structure

```text
app/
├── components/
│   ├── layout/       # Header and Footer
│   ├── sections/     # Landing-page sections
│   └── ui/           # Small reusable interface primitives
├── config/           # Company and site-level configuration
├── routes/           # Route modules
├── styles/           # Reset, design tokens and global rules
├── test/             # Shared test setup
├── root.tsx          # Document shell and route outlet
└── routes.ts         # Route manifest
public/               # Static SEO and brand assets
```

Component styles live beside the component that owns them. Global colour, type, spacing, radius and width tokens are defined in `app/styles/tokens.css`. Reusable company details and navigation are defined in `app/config/site.ts`.

## Adding a page

1. Add a route module such as `app/routes/about.tsx`.
2. Register it in `app/routes.ts` with `route('about', 'routes/about.tsx')`.
3. If the page should be static, add `/about` to `prerender` in `react-router.config.ts`.
4. Export route-specific metadata from the route module.

No client-exposed environment variables are currently required, so there is intentionally no `.env.example`.

## Deployment

The production output is generated in `build/client`. Deploy that directory to a static host. Configure security headers such as Content Security Policy, HSTS, Referrer Policy and Permissions Policy at the hosting or CDN layer.

## Content TODOs

- Confirm the public contact email before launch.
- Add verified legal company details and a privacy page when supplied.
- Add an Open Graph image when final brand assets are available.
