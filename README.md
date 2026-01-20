# MyAlarmApp - Smart Interval Reminders ⏰

Une application web de rappels intelligents à intervalles réguliers, conçue pour les tâches récurrentes comme la prise de médicaments, l'alimentation, ou tout autre événement nécessitant un suivi régulier.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.3-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Fonctionnalités

- 🔔 **Rappels à intervalles personnalisables** : Configurez des intervalles en jours, heures et minutes
- 🎨 **Interface visuelle intuitive** : Bordure de progression circulaire avec code couleur
- 🚨 **Alertes en temps réel** : Animation visuelle pour les rappels en retard
- 📊 **Historique complet** : Suivez toutes vos actions passées
- 🌍 **Multilingue** : Support de 3 langues (Français, English, 简体中文)
- 🎯 **Personnalisation** : Choisissez des icônes et des couleurs pour chaque rappel
- ⏸️ **Pause et reprise** : Désactivez temporairement un rappel sans le supprimer
- 💾 **Sauvegarde locale** : Vos données restent sur votre appareil
- 📱 **Responsive** : Optimisé pour mobile et desktop

## 🚀 Installation

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation locale

1. **Cloner le repository**
```bash
git clone https://github.com/codafine-dev/app-reminder.git
cd app-reminder
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer l'application en mode développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Avec Docker 🐳

```bash
# Lancer avec Docker Compose
docker-compose up

# L'application sera accessible sur http://localhost:3000
```

## 🛠️ Technologies utilisées

- **Frontend** : React 19.2.3 avec TypeScript
- **Build Tool** : Vite 6.2.0
- **Styling** : Tailwind CSS
- **State Management** : React Hooks (useState, useEffect, useCallback)
- **Storage** : LocalStorage pour la persistance des données
- **Containerization** : Docker

## 📁 Structure du projet

```
myalarmapp/
├── components/
│   ├── ReminderCard.tsx        # Carte d'affichage d'un rappel
│   ├── ReminderFormModal.tsx   # Formulaire de création/édition
│   ├── HistoryModal.tsx        # Affichage de l'historique
│   ├── SettingsView.tsx        # Vue des paramètres
│   └── WheelPicker.tsx         # Sélecteur à roulette
├── App.tsx                     # Composant principal
├── types.ts                    # Définitions TypeScript
├── translations.ts             # Traductions multilingues
├── index.tsx                   # Point d'entrée
├── index.html                  # Template HTML
├── vite.config.ts              # Configuration Vite
├── package.json                # Dépendances
├── tsconfig.json               # Configuration TypeScript
├── docker-compose.yml          # Configuration Docker
└── Dockerfile.dev              # Dockerfile pour développement
```

## 🎮 Utilisation

### Créer un rappel
1. Cliquez sur le bouton `+` en haut à droite
2. Renseignez le nom de l'événement
3. Choisissez une icône (optionnel)
4. Définissez l'intervalle de temps
5. Sélectionnez une couleur
6. Cliquez sur "Créer"

### Marquer comme terminé
- Cliquez sur le bouton "FAIT" sur une carte de rappel
- Le chronomètre redémarre automatiquement

### Modifier un rappel
- Cliquez sur l'icône crayon (✏️) sur une carte
- Modifiez les paramètres souhaités
- Enregistrez les modifications

### Voir l'historique
- Cliquez sur l'icône horloge (🕐) sur une carte
- Consultez toutes les fois où vous avez marqué cette tâche comme terminée

### Mettre en pause
- Utilisez le bouton toggle sur une carte pour désactiver temporairement un rappel

### Changer la langue
1. Cliquez sur l'icône paramètres (⚙️)
2. Sélectionnez votre langue préférée

## 🎨 Captures d'écran

### Vue principale
Liste de tous vos rappels actifs avec progression visuelle en temps réel.

### Mode alerte
Quand un rappel est en retard, la bordure clignote en rouge pour attirer votre attention.

### Historique
Visualisez toutes vos actions passées pour chaque rappel.

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## 🌐 Langues supportées

-  **Français**
-  **English**
-  **简体中文** (Chinois simplifié)

## 📝 License

MIT License - Vous êtes libre d'utiliser, modifier et distribuer ce projet.

## 👨‍💻 Auteur

**codafine-dev**
- GitHub: [@codafine-dev](https://github.com/codafine-dev)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 🐛 Signaler un bug

Si vous trouvez un bug, veuillez ouvrir une [issue](https://github.com/codafine-dev/app-reminder/issues) avec :
- Une description claire du problème
- Les étapes pour reproduire le bug
- Le comportement attendu vs le comportement observé
- Des captures d'écran si applicable

## 💡 Idées d'améliorations futures

- [ ] Notifications push du navigateur
- [ ] Export/import des données
- [ ] Thèmes personnalisés (mode sombre)
- [ ] Statistiques détaillées
- [ ] Synchronisation cloud
- [ ] Application mobile native

---

⭐ Si ce projet vous plaît, n'oubliez pas de lui donner une étoile sur GitHub !
