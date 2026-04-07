# 📝 GITHUB_SETUP.md

## Guide de configuration du dépôt GitHub

### 1️⃣ Créer le dépôt (1 étudiant)

```bash
# Un seul étudiant du groupe doit faire ça
cd /Users/boualameyoussef/Desktop/miniP

# Initialiser git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: Snake game in C"

# Aller sur GitHub.com, créer un repo "miniP" (public)
# Ensuite:
git remote add origin https://github.com/YOUR_USERNAME/miniP.git
git branch -M main
git push -u origin main
```

### 2️⃣ Ajouter les collaborateurs

Sur GitHub.com :
1. Aller dans Settings du repo
2. Collaborators
3. Inviter les autres membres du groupe par email

### 3️⃣ Les autres membres clonent

```bash
git clone https://github.com/CREATOR_USERNAME/miniP.git
cd miniP
```

### 4️⃣ Commits recommandés

Pour une bonne collaboration visible sur GitHub :

```bash
# Exemple: Amélioration des collisions
git checkout -b feature/better-collisions
git add src/snake.c
git commit -m "fix: improve collision detection precision"
git push origin feature/better-collisions

# Puis créer une Pull Request sur GitHub
```

### ✅ Checklist avant rendu

- [ ] Tous les commits pushés sur main
- [ ] README.md complet et détaillé
- [ ] Tous les .c et .h présents
- [ ] Makefile fonctionnel
- [ ] .gitignore configuré
- [ ] Au moins 5-10 commits visibles (montrant la collaboration)
- [ ] Tous les membres contribuent (visible dans les commits)

### 📊 Commits clés à documenter

```
Initial commit
  └─ feat: create project structure
  └─ feat: implement snake module
  └─ feat: implement food module
  └─ feat: implement game logic
  └─ feat: add terminal rendering
  └─ fix: resolve memory leaks
  └─ docs: add comprehensive README
  └─ test: add test suite
```

### 🎯 Pour la soutenance

1. **Vidéo démo** : Enregistrer 2-3 minutes du jeu en action
   - Démarrer le jeu
   - Jouer quelques secondes
   - Montrer les collisions
   - Game Over et restart

2. **Présentation orale** : 5 minutes max
   - Objectifs du projet
   - Architecture générale
   - Défis rencontrés et solutions
   - Résultats et améliorations futures

3. **Lien GitHub** : Partager le URL du repo

### 📌 Bonne pratique git

```bash
# Avant de modifier
git pull origin main

# Faire les modifications
# Ajouter les fichiers
git add .

# Commit avec message clair
git commit -m "type: description courte"

# Types recommandés:
# feat:  nouvelle fonctionnalité
# fix:   correction de bug
# docs:  documentation
# test:  ajout de tests
# refactor: restructuration de code

# Pousser
git push origin main
```

### 🔒 Protection des données

Assurez-vous de :
- Ne pas committer de credentials
- Utiliser `.gitignore` pour les fichiers temporaires
- Vérifier les fichiers avant commit avec `git diff`

---

**Good luck! 🚀**
