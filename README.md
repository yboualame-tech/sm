# Portfolio - Yousef Boualame

Un portfolio professionnel moderne créé avec **Astro**, déployé sur **Vercel**.

## 🌟 Caractéristiques

- ✨ **Design professionnel et minimaliste** - Interface claire et élégante
- 📱 **Entièrement responsive** - Fonctionne parfaitement sur tous les appareils
- ⚡ **Performance optimisée** - Astro pour une vitesse maximale
- ♿ **Accessible** - Respect des standards WCAG
- 🎨 **Thème personalisable** - CSS avec variables réutilisables
- 📊 **SEO-friendly** - Meta tags et structure sémantique
- 🚀 **Prêt pour Vercel** - Configuration incluse
- 💻 **Code commenté** - Facile à maintenir et modifier

## 📁 Structure du Projet

```
Portfolio/
├── src/
│   ├── pages/              # Pages Astro (routing automatique)
│   │   ├── index.astro     # Page d'accueil
│   │   ├── projects.astro  # Page projets
│   │   └── contact.astro   # Page contact
│   ├── components/         # Composants réutilisables
│   │   ├── Header.astro    # Navigation
│   │   ├── Footer.astro    # Pied de page
│   │   ├── AboutSection.astro
│   │   ├── EducationSection.astro
│   │   ├── ExperienceSection.astro
│   │   ├── ProjectsSection.astro
│   │   └── ContactForm.astro
│   ├── layouts/            # Layouts Astro
│   │   └── Layout.astro    # Layout principal
│   ├── styles/             # Styles globaux
│   │   └── global.css
│   └── data/               # Données
│       └── portfolio.ts    # Données du portfolio (MODIFIEZ ICI!)
├── public/                 # Fichiers statiques
│   ├── robots.txt
│   └── sitemap.xml
├── astro.config.mjs        # Config Astro
├── vercel.json             # Config Vercel
├── package.json
└── README.md
```

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** 18.x ou supérieur
- **npm** ou **yarn**

### Installation

```bash
# Cloner le repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le site sera accessible à `http://localhost:3000`

### Build pour la production

```bash
npm run build
npm run preview
```

## 📝 Personnalisation

### Modifier les données du portfolio

Tous les contenus du portfolio sont centralisés dans **`src/data/portfolio.ts`**.

Modifiez ce fichier pour mettre à jour:
- **Informations personnelles** - Nom, email, localisation, photo
- **Section À propos** - Bio, compétences
- **Formation** - Études et diplômes
- **Expérience professionnelle** - Emplois précédents et réalisations
- **Projets** - Vos projets avec descriptions et liens
- **Contact** - Liens réseaux sociaux

### Exemple de modification:

```typescript
// src/data/portfolio.ts
export const portfolioData = {
  personal: {
    name: "Votre Nom",
    email: "votre@email.com",
    // ... autres champs
  },
  // ... autres sections
};
```

### Ajouter une photo de profil

1. Créez un dossier `public/images/`
2. Placez votre photo en `public/images/profile.jpg`
3. Mettez à jour le chemin dans `src/data/portfolio.ts`:

```typescript
personal: {
  image: "/images/profile.jpg"
}
```

### Modifier les couleurs

Les couleurs sont définies comme variables CSS dans `src/styles/global.css`:

```css
:root {
  --primary: #1a1a1a;
  --accent: #0066cc;
  --background: #ffffff;
  /* ... autres couleurs */
}
```

### Ajouter des sections supplémentaires

Créez un nouveau composant dans `src/components/` et importez-le dans vos pages:

```astro
---
import MyNewSection from '../components/MyNewSection.astro';
---

<Layout>
  <MyNewSection />
</Layout>
```

## 🌐 Déploiement sur Vercel

### Option 1: Déploiement automatique depuis GitHub

1. **Pousser votre code sur GitHub**

```bash
git add .
git commit -m "Initial portfolio commit"
git push origin main
```

2. **Connecter Vercel à GitHub**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez "New Project"
   - Importez votre repository GitHub
   - Vercel détectera automatiquement la configuration Astro

3. **Configuration Vercel**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Cliquez "Deploy"

4. **Déploiement continu**
   - Chaque push sur `main` déploiera automatiquement votre site

### Option 2: Déploiement manuel

```bash
# Installation CLI Vercel
npm install -g vercel

# Déployer
vercel

# Déployer en production
vercel --prod
```

### Configuration du domaine personnalisé

1. Dans Vercel, allez dans "Settings" → "Domains"
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions pour configurer votre DNS

## 📱 Sections principales

### Accueil (`/`)
- Hero section avec présentation
- Section À propos
- Formation
- Expérience
- Projets (3 en vedette)
- CTA pour démarrer un projet

### Projets (`/projects`)
- Grille de tous les projets
- Cartes avec technologies et liens
- Responsive grid

### Contact (`/contact`)
- Formulaire de contact fonctionnel
- Informations de contact
- Liens réseaux sociaux

## ♿ Accessibilité

Le site respecte les standards WCAG 2.1:
- Navigation au clavier
- Contraste de couleurs adéquat
- Labels explicites pour les formulaires
- Images avec alt text
- Structure sémantique HTML

## 🔍 SEO

- Meta tags dynamiques
- Sitemap XML
- Robots.txt
- Structure heading hiérarchique
- Open Graph tags (à implémenter)

## 📞 Support

Pour toute question ou problème:
- Email: y.boualame@esisa.ac.ma
- GitHub: [yboualame-tech](https://github.com/yboualame-tech)

## 📄 Licence

Ce projet est sous licence MIT. Libre d'utilisation et modification.

## 🎯 Checklist de mise à jour

Avant de publier, assurez-vous de:

- [ ] Mettre à jour `src/data/portfolio.ts` avec vos informations
- [ ] Ajouter votre photo de profil
- [ ] Mettre à jour les liens GitHub, LinkedIn, Twitter
- [ ] Modifier le titre et description du site
- [ ] Tester sur mobile et desktop
- [ ] Tester le formulaire de contact
- [ ] Vérifier tous les liens externes
- [ ] Actualiser `public/sitemap.xml` avec votre URL finale
- [ ] Déployer sur Vercel
- [ ] Ajouter le lien au profil LinkedIn

## 🚀 Bonnes pratiques

### Commit messages

Utilisez des messages clairs et descriptifs:

```bash
git commit -m "feat: add new project section"
git commit -m "fix: correct typo in about section"
git commit -m "style: update color scheme"
```

### Code organization

- Gardez les composants petits et réutilisables
- Mettez les données dans `src/data/`
- Utilisez des noms explicites pour les variables et composants
- Commentez le code complexe

## 🔮 Améliorations futures possibles

- Ajouter un système de blog
- Implémenter dark mode complet
- Ajouter des animations CSS avancées
- Intégrer Google Analytics
- Ajouter un système de notifications email
- Support multi-langue

---

**Créé avec ❤️ en 2024**
