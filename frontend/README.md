# Financial AI Coach - Dashboard Premium

## 🎨 Design Features

### ✨ Caractéristiques principales
- **Background animé** avec particules dorées flottantes
- **Cartes bancaires 3D** avec effet de rotation au survol
- **Thème luxueux** : textures or sur gradient gris foncé
- **Header réutilisable** optimisé pour toutes les features
- **Animations fluides** avec Moti et gradients

## 📦 Dépendances requises

Installez les dépendances suivantes dans votre projet Expo :

```bash
npx expo install expo-linear-gradient
npm install moti
npm install lucide-react-native
```

## 🚀 Installation

1. Copiez les fichiers suivants dans votre projet :
   - `Dashboard.tsx` - Le dashboard principal
   - `Header.tsx` - Header réutilisable
   - `AnimatedBackground.tsx` - Background avec particules
   - `BankCard3D.tsx` - Composant de carte 3D

2. Structure recommandée :
```
src/
├── components/
│   ├── Header.tsx
│   ├── AnimatedBackground.tsx
│   └── BankCard3D.tsx
└── screens/
    └── Dashboard.tsx
```

## 🎯 Utilisation du Header

Le Header est un composant réutilisable que vous pouvez utiliser dans toutes vos screens :

```tsx
import { Header } from './components/Header';

<Header
  userName="John Doe"
  notificationCount={3}
  onNotificationPress={() => {
    // Votre logique de navigation
    navigation.navigate('Notifications');
  }}
/>
```

### Props du Header
- `greeting?: string` - Message de bienvenue (auto-détecté selon l'heure)
- `userName: string` - Nom de l'utilisateur
- `notificationCount?: number` - Nombre de notifications
- `onNotificationPress?: () => void` - Callback au clic sur les notifications

## 🎨 Palette de couleurs

### Or / Gold
- Primary: `#FFD700`
- Secondary: `#FFA500`
- Accent: `#FF8C00`

### Gris foncé
- Background: `#1A1A1A`
- Secondary: `#2D2D2D`
- Overlay: `#0A0A0A`

### Accents
- Success: `#00C853`
- Error: `#FF3B30`
- Info: `#2196F3`

## 🔧 Personnalisation

### Modifier les particules
Dans `AnimatedBackground.tsx`, ajustez :
- `length: 20` - Nombre de particules
- `duration: 8000` - Vitesse d'animation
- `width: 3, height: 3` - Taille des particules

### Modifier les cartes 3D
Dans `BankCard3D.tsx`, personnalisez :
- `rotateY: '10deg'` - Angle de rotation au hover
- `translateY: -10` - Élévation au hover
- `scale: 1.05` - Zoom au hover

## 📱 Responsive

Le dashboard s'adapte automatiquement à la taille de l'écran grâce à :
- `Dimensions.get('window')` pour les largeurs dynamiques
- Layout flexible avec `flex` et `gap`
- Tailles de police proportionnelles

## 🎭 Animations

### Types d'animations utilisées
1. **Moti** - Animations de composants React Native
2. **LinearGradient** - Dégradés premium
3. **Spring animations** - Mouvements naturels
4. **Loop animations** - Effets de pulsation

## 💡 Bonnes pratiques

1. **Performance** : Les particules utilisent `loop: true` pour éviter de recréer les animations
2. **Accessibility** : Tous les boutons ont des zones de touch appropriées (min 48x48)
3. **Réutilisabilité** : Header et composants séparés pour faciliter la maintenance
4. **TypeScript** : Interfaces définies pour type safety

## 🐛 Troubleshooting

### Les animations ne fonctionnent pas
- Vérifiez que `moti` est bien installé
- Redémarrez Metro bundler avec `npx expo start -c`

### Les gradients n'apparaissent pas
- Assurez-vous que `expo-linear-gradient` est installé
- Sur iOS, rebuild avec `npx expo run:ios`

### Erreur "Chip is not defined"
- Importez `lucide-react-native` correctement
- Vérifiez la version : `npm list lucide-react-native`

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Contribution

N'hésitez pas à créer des issues ou des pull requests pour améliorer le projet !