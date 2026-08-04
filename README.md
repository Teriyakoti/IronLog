# IronLog

IronLog est une PWA de suivi de musculation conçue autour d’un cycle A1, A2, B1 et B2.

## Fonctionnalités

- démarrage manuel ou automatique ;
- chronomètre total et minuteur de repos ;
- charges, répétitions, volume et progression ;
- fin de séance avec historique ;
- mode clair/sombre ;
- sauvegarde locale ;
- fonctionnement hors ligne ;
- installation sur iPhone ;
- export/import des données.

## Workflow recommandé

1. créer une issue ;
2. créer une branche depuis `main` ;
3. développer et tester ;
4. ouvrir une pull request ;
5. fusionner dans `main` ;
6. laisser GitHub Actions déployer ;
7. créer une release pour les versions importantes.

## Branches

```text
feature/nom-court
fix/nom-du-bug
docs/nom-du-document
chore/maintenance
```

## Commits

```text
feat: ajoute une fonctionnalité
fix: corrige un bug
docs: améliore la documentation
refactor: réorganise le code
```

## Développement local

```bash
python3 -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Licence

MIT.
