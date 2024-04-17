# TestPopups

URL: https://test-popups.vercel.app/

https://github.com/miguelcast/test-popups/assets/6609142/a581862d-78ca-4e9d-ae25-2f7947723536

## Folder structure

```md
Root
├── apps
│   └── web               # Main web project with Vite
└── libs
    ├── components-system # Project with vite, components
    ├── component-a       # Project Vite Component
    └── component-b       # Project Vite Component

```

## Technologies

- Vite
- Nx
- PNPM
- React
- Prettier
- ESLINT
- Typescript
- Zustand
- TailWind
- Github Actions

## Start the application
Before run you must install the dependencies running: `pnpm install`

Run `pnpx nx serve web` to start the development server.

## Build for production

Run `pnpx nx run web:build` to build the application.
The build artifacts are stored in the output directory (`dist/apps/web`), ready to be deployed.

## CI

Can you see the CI en each Pull Request: https://github.com/miguelcast/test-popups/pulls?q=is:pr+is:closed

And the configuration is in the file `.github/workflows/ci.yml` 

## Explore the project graph

Run `pnpx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.


## TODO
 - [x] Initial Setup
 - [x] Create components-system project
 - [x] Create base components Board, Containers and Header
 - [x] Zustand setup
 - [x] Create popups store
 - [x] Add and Remove Popups
 - [x] Drag And Drop Setup
 - [x] Horizontal Drop Popups
 - [x] Vertical Drop Popups
 - [x] Deploy to Vercel or Netflix
 - [x] Testing
 - [x] Create external component(A and B) for the popups
 - [ ] Resize Popups width
 - [ ] Resize Popups height
 - [ ] Use something like clsx to merge classes
 - [ ] Fixes Popups
 - [ ] Refactor updateContainerPosition
