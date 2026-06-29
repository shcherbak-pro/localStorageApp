# Local Storage App

Static Angular application for adding, listing, removing, and clearing users stored in the browser `localStorage`.

## Tech stack

- Angular 22
- Standalone components
- Angular Signals
- Reactive Forms
- GitHub Pages deployment workflow

## Development

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Build

```bash
npm run build
```

For GitHub Pages, the workflow builds with repository-based base href:

```bash
npm run build -- --base-href "/<repository-name>/"
```

## Deploy to GitHub Pages

1. Push this project to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` or run the workflow manually.

The project is static and can be hosted on GitHub Pages.
