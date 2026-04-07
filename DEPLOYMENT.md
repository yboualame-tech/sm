# 📌 Déploiement et Exécution

## 🚀 Exécution locale (recommandé)

```bash
# Cloner le repo
git clone https://github.com/yboualame-tech/sm.git
cd sm

# Compiler et jouer
make run

# Ou séparément
make          # Compiler
./build/snake # Exécuter
```

## ⚠️ À propos du déploiement sur le cloud

### Pourquoi PAS Vercel ?

**Vercel ne peut pas exécuter une app C interactive en terminal.**

Raisons :
- Vercel = Plateforme serverless (pas de serveur persistant)
- Snake = App CLI interactive (besoin d'input utilisateur en temps réel)
- Incompatibilité complète ❌

### Pourquoi PAS Render/Railway pour une app CLI ?

Même raison : une app terminal interactive n'a pas de sens sur une plateforme cloud.

## ✅ Meilleure approche

### Pour la soutenance académique :
1. **Laisser le code sur GitHub** ✅
2. **Les utilisateurs clonent et compilent localement** ✅
3. **Enregistrer une vidéo de démo** ✅
4. **Présenter le code source** ✅

C'est l'approche standard pour les projets C/CLI.

### Si vous voulez vraiment héberger une version :

Créer une **version web** avec WebSocket :
- Frontend HTML/JS affiche le jeu
- Backend C gère la logique
- Utilisateurs jouent dans le navigateur

Mais ce n'est **PAS** ce qu'on vous demande pour le mini-projet.

## 📋 Checklist pour le rendu

- ✅ Code sur GitHub : https://github.com/yboualame-tech/sm
- ✅ README complet
- ✅ Makefile fonctionnel
- ✅ Compile sans errors/warnings
- ✅ Vidéo démo (enregistrement local)
- ✅ Présentation orale
- ✅ Gestion mémoire correcte

**C'est tout ce qui est nécessaire pour la soutenance !** 🎯

---

**Le déploiement "cloud" n'est pas pertinent pour une app C CLI.**
