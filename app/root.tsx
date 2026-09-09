import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import type { Route } from './+types/root';
import { siteConfig } from './config/site';
import './styles/reset.css';
import './styles/tokens.css';
import './styles/global.css';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const title =
    isRouteErrorResponse(error) && error.status === 404
      ? 'Page not found'
      : 'Something went wrong';
  return (
    <main className="error-page">
      <p className="eyebrow">{siteConfig.name}</p>
      <h1>{title}</h1>
      <p>The page could not be displayed. Please return to the homepage.</p>
      <a href="/">Back to NGentik</a>
    </main>
  );
}
