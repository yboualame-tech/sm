# 🐍 Snake Game - Mini-Projet C

Un jeu Snake classique développé en **C pur** exécuté dans le **terminal**.

## 📋 Description

Ce projet est une implémentation fonctionnelle du jeu Snake en mode terminal avec :
- ✅ Mouvements fluides du serpent
- ✅ Génération aléatoire de nourriture
- ✅ Détection de collisions (murs, auto-collision)
- ✅ Système de score
- ✅ Difficulté progressive (vitesse augmente avec le score)
- ✅ Gestion complète de la mémoire (pas de fuite)
- ✅ Code modulé et structuré
- ✅ Pas de dépendances externes (100% portable)

## 🎮 Commandes

- **W / ↑** : Haut
- **S / ↓** : Bas
- **A / ←** : Gauche
- **D / →** : Droite
- **R** : Redémarrer après Game Over
- **Q** : Quitter

## 🏗️ Structure du Projet

```
miniP/
├── src/
│   ├── main.c       # Point d'entrée, boucle principale, affichage terminal
│   ├── snake.c      # Implémentation du serpent
│   ├── food.c       # Implémentation de la nourriture
│   └── game.c       # Logique du jeu
├── include/
│   ├── snake.h      # Interface du module snake
│   ├── food.h       # Interface du module food
│   └── game.h       # Interface du module game
├── Makefile         # Script de compilation
├── build/           # Répertoire des fichiers objets et exécutable
└── README.md        # Ce fichier
```

## 🔧 Prérequis

- **macOS** : Aucun (GCC/Clang inclus)
- **Linux** : `gcc` ou `clang` (généralement pré-installés)
- Terminal Unix/Linux compatible (macOS Terminal, Linux bash, etc.)

Aucune dépendance externe requise ! Le projet utilise uniquement les APIs POSIX standard.

## 📦 Compilation

```bash
# Compiler le projet
make

# Compiler et exécuter
make run

# Nettoyer les fichiers de build
make clean

# Afficher l'aide
make help
```

### Flags de Compilation

Le projet utilise des flags de sécurité :
- `-Wall -Wextra` : Activer tous les avertissements
- `-std=c99` : Norme C99
- `-fsanitize=address` : Détection des fuites mémoire et erreurs d'accès
- `-O2` : Optimisations

## ▶️ Exécution

```bash
./build/snake
```

Ou directement avec :

```bash
make run
```

## 🎯 Règles du Jeu

1. Le serpent se déplace automatiquement en grille
2. Manger de la nourriture `*` pour grandir et gagner des points
3. Éviter de cogner les murs (limites `║` et `═`)
4. Éviter de se mordre la queue (auto-collision)
5. La vitesse augmente progressivement (tous les 10 points)
6. Le niveau de vitesse s'affiche en bas de l'écran

### Légende d'affichage

```
@ - Tête du serpent
o - Corps du serpent
* - Nourriture
║ - Murs verticaux
═ - Murs horizontaux
╔╗╚╝ - Coins
```

## 🧠 Architecture du Code

### Modules

#### `snake.c / snake.h`
Gère le serpent :
- Création et libération
- Mouvement et direction
- Détection de collisions (murs, auto-collision)
- Croissance (quand la nourriture est mangée)
- Constantes : `GRID_WIDTH=30`, `GRID_HEIGHT=15`

#### `food.c / food.h`
Gère la nourriture :
- Génération aléatoire
- Détection de consommation

#### `game.c / game.h`
Logique globale :
- Boucle de jeu (update)
- État du jeu (score, game over, niveau de difficulté)
- Difficulté progressive
- Réinitialisation du jeu

#### `main.c`
Point d'entrée et affichage terminal :
- Initialisation du mode terminal brut (raw mode)
- Boucle principale avec gestion d'input non-bloquante
- Affichage en temps réel
- Gestion des escapes de touche

## 🛡️ Gestion Mémoire

Tous les `malloc` ont leurs correspondants `free` :
- `snake_create()` → `snake_free()`
- `food_create()` → `food_free()`
- `game_create()` → `game_free()`

**Pas de fuites mémoire** testées avec ASAN (AddressSanitizer).

Vérifiable manuellement avec :

```bash
make
valgrind --leak-check=full ./build/snake
```

## 🎨 Gameplay

- **Grille** : 30x15 cellules
- **Serpent initial** : 3 segments au centre
- **Score** : +10 points par nourriture mangée
- **Vitesse** : Augmente tous les 10 points (niveau max ~7)
- **Rendu** : Environ 20 FPS en terminal

## 🚀 Améliorations Possibles

- [ ] Obstacles dans le jeu
- [ ] Modes de jeu (classique, arcade, temps limité)
- [ ] Sauvegarde du meilleur score
- [ ] Niveaux avec labyrinthes
- [ ] Effets visuels (couleurs ANSI)
- [ ] Multijoueur local (deux serpents)

## 📝 Notes de Développement

- **Compilateur testé** : Apple Clang (macOS), GCC (Linux)
- **Norme C** : C99
- **Système d'exploitation** : macOS, Linux
- **Dépendances** : Aucune (POSIX standard)
- **Portabilité** : Excellente

### Compilation alternative (sans ASAN)

Pour compiler sans AddressSanitizer (utile sur certains systèmes) :

```bash
gcc -Wall -Wextra -std=c99 -O2 -I include -o build/snake \
    src/main.c src/snake.c src/food.c src/game.c
```

## 📄 Licence

Projet académique - Mini-projet C 2026

---

**Auteur(s)** : À compléter  
**Date de rendu** : 06/04/2026  
**Dépôt GitHub** : À lier

