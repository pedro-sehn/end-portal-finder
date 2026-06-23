# End Portal Finder

Triangulate the location of a Minecraft stronghold (and its End Portal) from two
eye-of-ender throws. Enter the two throw angles and the distance you walked
between them, and the app calculates the stronghold's **X / Z** coordinates.

🔗 **Live:** https://pedro-sehn.github.io/end-portal-finder/

## How it works

1. Stand still and throw an eye of ender. Open the debug screen (`F3`) and read
   the horizontal **Facing** angle while the eye flies — that's the **first angle**.
2. (Optional) Enter your current X / Z so the result is in world coordinates.
   Leave them at `0` to get coordinates relative to where you stood.
3. Walk in a single cardinal direction (the one selected in the form) and count
   the blocks travelled.
4. Throw a second eye and read its angle — that's the **second angle**.
5. Hit **Find** to triangulate the stronghold.

The two throws define two sight lines; the app intersects them to find where the
stronghold lies. If the angles point the same way (parallel lines) they never
cross — walk further or in a different direction and read the angles again.

## Development

```bash
npm install
npm run dev      # start the dev server (http://localhost:3000)
npm run build    # static export to ./out
npm run lint     # lint
```

Built with Next.js (App Router), React 19, Tailwind CSS, shadcn/ui, and
react-three-fiber (animated starfield background).

## Deployment

Pushes to `main` are automatically built and published to **GitHub Pages** via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

One-time setup: in the repository, go to **Settings → Pages → Build and
deployment → Source** and select **GitHub Actions**.

The app is a Next.js **static export** (`output: "export"`) with a
`/end-portal-finder` base path (configured in `next.config.ts`) to match the
Pages project URL. `npm run build` writes the static site to `./out`.
