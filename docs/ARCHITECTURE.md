# Architecture

IronLog est une application web statique installable.

- `index.html` : interface et logique ;
- `manifest.webmanifest` : installation PWA ;
- `service-worker.js` : cache hors ligne ;
- `localStorage` : données sur l’appareil ;
- GitHub Actions : déploiement GitHub Pages.

## Flux

```text
Issue → branche → commits → pull request → main → GitHub Actions → GitHub Pages
```

## Limites

- données locales au navigateur ;
- export/import nécessaire entre appareils ;
- une suppression des données Safari peut effacer l’historique.
