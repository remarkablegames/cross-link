<p align="center">
  <img src="public/favicon.png" width="200" alt="Cross-Link">
</p>

# Cross-Link

[![release](https://img.shields.io/github/v/release/remarkablegames/cross-link)](https://github.com/remarkablegames/cross-link/releases)
[![build](https://github.com/remarkablegames/cross-link/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablegames/cross-link/actions/workflows/build.yml)

🔗 Connect the dots. Cross the lines.

Play the game on:

- [remarkablegames](https://remarkablegames.org/cross-link/)

## How to Play

1. **Connect the dots** – Tap a colored star, then tap another star of the same color to draw a line between them.
2. **Cross to clear** – When two or more lines cross, all connected pairs disappear. The goal is to clear all stars from the board.
3. **Plan your moves** – The order in which you connect pairs matters. Think ahead to create crossings that clear multiple pairs at once.
4. **Deselect** – Tap a selected star again to cancel, or tap anywhere else on the screen.

## Prerequisites

[nvm](https://github.com/nvm-sh/nvm#installing-and-updating):

```sh
brew install nvm
```

## Install

Clone the repository:

```sh
git clone https://github.com/remarkablegames/cross-link.git
cd cross-link
```

Install the dependencies:

```sh
npm install
```

Update the files:

- [ ] `index.html`
- [ ] `public/app-icon.png`
- [ ] `public/favicon.png`
- [ ] `public/manifest.webmanifest`

## Environment Variables

Update the environment variables:

```sh
cp .env .env.local
```

Update the **Secrets** in the repository **Settings**.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the game in the development mode.

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

You will also see any errors in the console.

### `npm run build`

Builds the game for production to the `dist` folder.

It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your game is ready to be deployed!

### `npm run bundle`

Builds the game and compresses the contents into a ZIP archive in the `dist` folder.

Your game can be uploaded to your server, [itch.io](https://itch.io/), [newgrounds](https://www.newgrounds.com/), etc.

## Testing

Open a specific level by appending `?level=<number>` to the URL (e.g., `?level=2`):

```sh
open http://localhost:5173/?level=5
```

## License

[MIT](LICENSE)
