# MangaHub 0.9 — Paperback et LeafReader

Extension **Mangahub** pour l'API publique Paperback 0.9 et l'adaptateur LeafReader.

Cette version **ne remplace pas** notre extension 0.8 (3.1.7) : la publication
existante reste sous `/0.8/`; l'extension 0.9 utilise `/0.9/`.

## Fonctionnalités

- Recherche, pagination, tris, genres et filtres avancés
- Découvrir : mises à jour populaires, récentes, nouveautés et œuvres terminées
- Fiches, chapitres et lecture d'images
- API corrigée `https://mangahub.io/graphql` (pas `api.mghcdn.com`)
- Chiffrement de chapitres `enc:v1` et clés `/api/chapter-crypto`
- Cookie MangaHub `mhub_access` issu du site, sans token inventé
- Cookies limités aux hôtes MangaHub, sans fuite vers le CDN d'images
- Identifiants stables : slug manga et numéro de chapitre, comme en 0.8

## Compilation et publication

Node.js 24 est requis.

```sh
npm install
npm run check
npm run bundle
```

Le bundle installable et son manifeste sont dans `bundles/`.
Lors des PR, le workflow joint un artefact `mangahub-0.9-bundle`.
Après fusion dans `main`, le workflow publie sous `/0.9/` sans toucher à `/0.8/`.

**URL à utiliser après publication :**
https://laxan94.github.io/Paperback-MangaHub-0.8-pages/0.9

LeafReader demande `versioning.json` et `Mangahub/index.js`, produits par
`paperback-cli bundle`.

## Vérifications restantes

La compilation et la structure du bundle sont contrôlées en CI. La réception
de sessions, les éventuels défis Cloudflare et la lecture réelle des pages doivent
être testés dans Paperback/LeafReader sur iPhone. En particulier, LeafReader doit
gérer un flux Cloudflare interactif quand le site le demande.

## Licence et crédits

Adaptation de [kittycatgit/kitty-extensions-0.9](https://github.com/kittycatgit/kitty-extensions-0.9)
(GPL-3.0-or-later), avec les correctifs et comportements retenus pour notre MangaHub
0.8 (3.1.7). Les fichiers dérivés conservent l'attribution de kittycatgit.
Le code et ses dérivés sont publiés sous GPL-3.0-or-later (`LICENSE`).

Ce dépôt n'est pas affilié officiellement à MangaHub ou Paperback.
