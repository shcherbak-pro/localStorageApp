# Browser Storage Demo — Angular 22

This project is an Angular example that demonstrates how to implement user management on top of different browser storage APIs.

The app contains two equivalent examples placed in Angular Material tabs:

- **Local Storage** — users are stored in `window.localStorage` and remain available after the browser tab is closed and reopened.
- **Session Storage** — users are stored in `window.sessionStorage` and are available only during the current browser tab session.

## What this example shows

The project demonstrates how to build the same feature using different storage types:

- create a new user;
- edit existing user information;
- delete one user;
- clear all users from a selected storage;
- search by name, email, city, role, or id;
- filter by role and age range;
- sort by creation date, name, or age;
- persist and read data from `localStorage` and `sessionStorage`;
- keep UI state reactive using Angular Signals;
- organize storage access through reusable Angular services.

## Tech stack

- Angular 22
- Angular Material
- Standalone components
- Angular Signals
- Reactive Forms
- GitHub Pages deployment workflow

## Project structure

```text
src/app/
  core/storage/
    browser-storage.service.ts
  features/users-storage/
    components/
      storage-users-panel/
      user-editor-dialog/
    models/
      user.ts
    services/
      user-storage.store.ts
      local-users.store.ts
      session-users.store.ts
```

## Storage implementation overview

The reusable `BrowserStorageService` wraps direct access to browser APIs:

```ts
window.localStorage
window.sessionStorage
```

Feature stores use this service instead of accessing browser storage directly from components:

```ts
LocalUsersStore
SessionUsersStore
```

Both stores inherit the same CRUD and search behavior from `UserStorageStore`. The only difference is the selected storage area and storage key.

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
4. Push to `main` or `master`, or run the workflow manually.

The project is static and can be hosted on GitHub Pages.
