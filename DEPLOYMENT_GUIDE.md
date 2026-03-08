# Guide de Déploiement sur Vercel

## ✅ Étapes de Déploiement Automatique

### 1. Préparer le Repository GitHub

Votre code est maintenant sur: **https://github.com/yboualame-tech/sm**

L'historique Git est propre:
- ✅ Repository initialisé
- ✅ Commit initial explicite
- ✅ Structure claire et organisée

### 2. Connecter Vercel à GitHub

**Option A: Via le Dashboard Vercel (Recommandé)**

1. Allez sur [https://vercel.com](https://vercel.com)
2. Connectez-vous ou créez un compte
3. Cliquez sur "Add New Project" ou "Import Project"
4. Sélectionnez "Continue with GitHub"
5. Autorisez Vercel à accéder à vos repositories GitHub
6. Cherchez et sélectionnez `yboualame-tech/sm`

**Configuration Vercel:**
- **Project Name:** Portfolio (ou ce que vous préférez)
- **Framework:** Astro (détecté automatiquement)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

Cliquez "Deploy" et Vercel construira et déploiera votre site!

### 3. Domaine Personnalisé

Une fois déployé:

1. Vous aurez une URL Vercel: `https://your-project-name.vercel.app`
2. Pour ajouter un domaine personnalisé:
   - Allez à Project Settings → Domains
   - Entrez votre domaine
   - Suivez les instructions pour configurer votre DNS

### 4. Déploiement Continu

À partir de maintenant:
- **Chaque push sur `main`** déploiera automatiquement votre site
- **Vercel générera une URL de preview** pour chaque Pull Request
- **Les logs de build** seront disponibles dans le dashboard

### 5. Vérifier le Déploiement

1. Allez sur votre dashboard Vercel
2. Vous verrez votre projet déployé
3. L'URL publique sera affichée

## 🔧 Configuration Avancée (Optionnel)

### Variables d'Environnement

Si vous avez besoin de secrets (API keys, etc.):

1. Project Settings → Environment Variables
2. Ajoutez vos variables
3. Elles seront disponibles pendant le build

### Redirection et Réécriture

Modifiez `vercel.json` pour ajouter des redirections:

```json
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

## 📱 Mettre à Jour le Portfolio Après Déploiement

### Modifier les Données

1. Éditez `src/data/portfolio.ts`
2. Committez et poussez:

```bash
git add src/data/portfolio.ts
git commit -m "Update portfolio data"
git push origin main
```

3. Vercel déploiera automatiquement!

### Ajouter une Image

1. Placez l'image dans `public/images/`
2. Référencez-la dans `src/data/portfolio.ts` ou vos composants
3. Committez et poussez

```bash
git add public/images/
git commit -m "Add portfolio images"
git push origin main
```

## 🚨 Troubleshooting

### Le build échoue?

Vérifiez:
1. Les logs dans le dashboard Vercel
2. Que tous les fichiers sont committés
3. Que `package.json` a les bonnes dépendances
4. Que il n'y a pas d'erreurs TypeScript

### Le site n'a pas l'air à jour?

1. Attendez que Vercel termine le déploiement
2. Videz le cache de votre navigateur (Ctrl+Shift+Delete)
3. Vérifiez l'URL dans votre barre d'adresse

### Images ne s'affichent pas?

- Assurez-vous qu'elles sont dans `public/images/`
- Utilisez les chemins avec `/` au début: `/images/photo.jpg`

## 📊 Analytics et Monitoring

Dans le dashboard Vercel, vous pouvez voir:
- **Web Vitals** - Performance metrics
- **Usage Analytics** - Visiteurs et requêtes
- **Deployments** - Historique des déploiements
- **Log Streaming** - Logs en temps réel

## ✨ Prochaines Étapes

1. **Ajouter au LinkedIn**
   - Allez sur votre profil LinkedIn
   - Ajoutez le lien de votre portfolio

2. **Ajouter un formulaire de contact fonctionnel**
   - Connectez-le à un service comme Formspree, Netlify Forms, ou un backend
   - Mettez à jour `src/components/ContactForm.astro`

3. **Ajouter des améliorations**
   - Dark mode
   - Blog section
   - Galerie de projet
   - Newsletter signup

## 🎯 Résumé

✅ Code sur GitHub: https://github.com/yboualame-tech/sm
✅ Configuration Astro complète
✅ Prêt pour Vercel
✅ Design responsive et professionnel
✅ Documentation complète

**Vous êtes maintenant prêt à déployer!**

---

Pour toute question, consultez:
- [Documentation Astro](https://docs.astro.build)
- [Documentation Vercel](https://vercel.com/docs)
- Contact: y.boualame@esisa.ac.ma
