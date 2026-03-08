# Guide de Maintenance du Portfolio

## 📋 Mise à Jour Régulière

### Mettre à Jour les Informations Personnelles

Modifiez **`src/data/portfolio.ts`**:

```typescript
export const portfolioData = {
  personal: {
    name: "Votre Nom",
    title: "Votre Titre",
    email: "votre@email.com",
    phone: "+212 6XX XXX XXX",
    location: "Ville, Pays",
    bio: "Votre bio courte",
    image: "/images/profile.jpg"
  },
  // ... autres sections
};
```

Puis committez:
```bash
git add src/data/portfolio.ts
git commit -m "Update personal information"
git push origin main
```

### Ajouter un Nouveau Projet

Dans `src/data/portfolio.ts`, ajoutez à la section `projects`:

```typescript
projects: [
  {
    title: "Nom du Projet",
    description: "Description du projet",
    technologies: ["Tech1", "Tech2"],
    image: "/images/projects/project.jpg",
    links: {
      github: "https://github.com/...",
      live: "https://..."
    },
    highlights: [
      "Point clé 1",
      "Point clé 2"
    ]
  },
  // ... autres projets
]
```

### Ajouter une Expérience Professionnelle

Dans `src/data/portfolio.ts`, ajoutez à la section `experience`:

```typescript
experience: [
  {
    company: "Nom de l'entreprise",
    position: "Votre titre",
    startDate: "Jan 2024",
    endDate: "Présent",
    description: "Description du rôle",
    achievements: [
      "Réussite 1",
      "Réussite 2"
    ]
  },
  // ... autres expériences
]
```

### Mettre à Jour les Compétences

Dans `src/data/portfolio.ts`, modifiez la section `about.skills`:

```typescript
skills: {
  frontend: ["Compétence 1", "Compétence 2"],
  backend: ["Compétence 3", "Compétence 4"],
  tools: ["Outil 1", "Outil 2"]
}
```

## 🎨 Personnalisation du Design

### Modifier les Couleurs

Dans `src/styles/global.css`:

```css
:root {
  --primary: #1a1a1a;        /* Couleur principale */
  --secondary: #404040;      /* Couleur secondaire */
  --accent: #0066cc;         /* Couleur d'accentuation */
  --background: #ffffff;     /* Couleur de fond */
  --text-primary: #1a1a1a;   /* Texte principal */
  --text-secondary: #666666; /* Texte secondaire */
}
```

### Modifier la Police

Dans `src/styles/global.css`:

```css
:root {
  --font-sans: "Votre Police", sans-serif;
  --font-mono: "Monaco", monospace;
}
```

### Ajouter un Mode Sombre

Modifiez la section `@media (prefers-color-scheme: dark)` dans `src/styles/global.css`.

## 🖼️ Gestion des Images

### Structure des Images

```
public/
├── images/
│   ├── profile.jpg
│   └── projects/
│       ├── project1.jpg
│       ├── project2.jpg
│       └── project3.jpg
```

### Optimiser les Images

1. **Redimensionnez** les images à la bonne taille
2. **Compressez** avec un outil comme TinyPNG
3. **Convertissez** au format WebP si possible
4. Utilisez des images responsives

### Ajouter une Photo de Profil

1. Placez l'image dans `public/images/profile.jpg`
2. Mettez à jour dans `src/data/portfolio.ts`:

```typescript
personal: {
  image: "/images/profile.jpg"
}
```

## 📱 Responsive Design

Le portfolio est responsive par défaut. Les breakpoints sont:

- **Mobile**: < 768px
- **Tablet**: 768px - 968px
- **Desktop**: > 968px

Modifiez dans `src/styles/global.css` si nécessaire.

## 🔍 SEO

### Meta Tags

Dans chaque page, mettez à jour le titre et la description:

```astro
<Layout 
  title="Mon Titre"
  description="Ma description pour SEO"
>
```

### Sitemap

Mettez à jour `public/sitemap.xml` avec votre URL finale:

```xml
<loc>https://yourportfolio.com/</loc>
```

### Robots.txt

Mettez à jour `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://yourportfolio.com/sitemap.xml
```

## 🔧 Dépannage

### Le site ne s'affiche pas?

1. Vérifiez que `npm install` a fonctionné
2. Lancez `npm run build` pour voir les erreurs
3. Vérifiez les logs Vercel

### Les styles ne s'appliquent pas?

1. Videz le cache du navigateur
2. Vérifiez que les imports CSS sont corrects
3. Relancez le serveur de développement

### Les images ne s'affichent pas?

1. Vérifiez les chemins (`/images/...`)
2. Vérifiez que les fichiers existent
3. Assurez-vous qu'elles sont dans `public/`

## 📦 Mise à Jour des Dépendances

```bash
# Vérifier les mises à jour disponibles
npm outdated

# Mettre à jour les dépendances
npm update

# Mettre à jour Astro
npm install astro@latest
```

## 🚀 Workflow de Mise à Jour

1. **Créez une branche** (optionnel):
   ```bash
   git checkout -b update/new-projects
   ```

2. **Modifiez le contenu**:
   ```bash
   # Éditez src/data/portfolio.ts ou autres fichiers
   ```

3. **Testez localement**:
   ```bash
   npm run dev
   # Ouvrez http://localhost:3000
   ```

4. **Committez vos changements**:
   ```bash
   git add .
   git commit -m "Update portfolio: add new projects"
   ```

5. **Poussez sur GitHub**:
   ```bash
   git push origin main
   ```

6. **Vercel déploiera automatiquement!**

## 📊 Vérification Avant Publication

- [ ] Informations personnelles à jour
- [ ] Photos optimisées et affichées
- [ ] Tous les liens fonctionnent
- [ ] Pas de typos
- [ ] Format responsive testé
- [ ] Formulaire de contact fonctionne
- [ ] SEO meta tags complets
- [ ] Performance satisfaisante

## 🎯 Best Practices

### Code

- Gardez les composants simples et réutilisables
- Utilisez des noms explicites
- Commentez le code complexe
- Suivez la structure existante

### Contenu

- Gardez les textes concis et directs
- Utilisez des listes à puces pour la lisibilité
- Mettez à jour régulièrement
- Vérifiez l'orthographe et la grammaire

### Performance

- Optimisez les images
- Évitez les scripts inutiles
- Utilisez Astro au maximum
- Testez sur connexion lente

---

Pour plus d'aide, consultez:
- [Astro Docs](https://docs.astro.build)
- [README.md](README.md)
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

Contact: y.boualame@esisa.ac.ma
