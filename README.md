# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# Galactus AI Chatbot Frontend

A modern, interactive React frontend for a RAG (Retrieval-Augmented Generation) chatbot with a stunning 3D solar system background animation built with **React + Vite**.

## 🌟 Features

- **Interactive 3D Solar System**: Beautiful Three.js animation with orbiting planets and asteroid belts
- **Redux State Management**: Centralized state management for chat messages and UI state
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Chat**: Smooth chat interface with typing indicators and message animations
- **Source Citations**: Display document sources and images from RAG responses
- **Auto-scroll**: Automatic scrolling to new messages
- **Error Handling**: Comprehensive error handling with user-friendly notifications
- **🪐 Realistic Solar System**: 8 planets with accurate colors and orbital mechanics
- **☄️ Asteroid Belt**: Procedurally generated rotating asteroids
- **⭐ Dynamic Stars**: Thousands of twinkling stars that adapt to theme
- **🎮 Interactive Controls**: Mouse/touch controls for zoom, rotate, and pan
- **🌙 Theme Support**: Light and dark mode with adaptive lighting
- **⚡ Performance Optimized**: Efficient rendering with React Three Fiber
- **🎨 Highly Customizable**: Extensive props for customization

## 🚀 Quick Start

### Prerequisites

- Node.js 22 and npm
- RAG chatbot backend running (default: http://localhost:5173)

### Installation

1. **Clone and install dependencies:**
\`\`\`bash
git clone <repository-url>
cd rag-chatbot-frontend
npm install
npm install three @react-three/fiber @react-three/drei
\`\`\`

2. **Configure environment:**
\`\`\`bash
cp .env.example .env
# Edit .env and set your backend URL:
# VITE_API_URL=http://localhost:3000
\`\`\`

3. **Start development server:**
\`\`\`bash
npm run dev
\`\`\`

4. **Open your browser:**
Navigate to \`http://localhost:5173\`

## 🏗️ Project Structure

\`\`\`
src/
├── api/                    # API service layer
│   ├── apiService.js      # Axios configuration
│   └── queryService.js    # Chat API functions
├── app/                   # Redux store & slices
│   ├── store.js          # Store configuration
│   ├── chatSlice.js      # Chat state management
│   └── themeSlice.js     # Theme state management
├── components/            # React components
│   ├── ChatWindow.jsx    # Main chat interface
│   ├── MessageInput.jsx  # Message input form
│   ├── LoadingIndicator.jsx # Loading animations
│   ├── ThemeToggle.jsx   # Dark/light mode toggle
│   └── SpaceScene.jsx    # 3D solar system scene
├── hooks/                # Custom React hooks
│   └── useChatHooks.js   # Chat-related hooks
├── styles/               # CSS styles
│   └── globals.css       # Tailwind base styles
├── App.jsx               # Main app component
└── main.jsx              # React entry point
\`\`\`

## 🛠️ Development

### Available Scripts

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
\`\`\`

## 🚀 Deployment

### Build for Production

\`\`\`bash
npm run build
\`\`\`

### Deploy to Vercel

\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### Environment Variables for Production

Set these in your deployment platform:

- \`VITE_API_URL\`: Your production backend URL

## 📱 Responsive Design

The app is fully responsive with breakpoints:

- **Mobile**: < 640px - Stacked layout, full-width inputs
- **Tablet**: 640px - 1024px - Optimized spacing
- **Desktop**: > 1024px - Full feature set

## 📖 Basic Usage

\`\`\`jsx
import SpaceBackground from './SpaceBackground'

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Space Background */}
      <SpaceBackground />
      
      {/* Your content goes here */}
      <div className="relative z-10 p-8">
        <h1 className="text-white text-4xl">Welcome to Space!</h1>
      </div>
    </div>
  )
}
\`\`\`

## 🎛️ Props

### Theme & Appearance
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isDark` | `boolean` | `false` | Enable dark theme with warmer colors |
| `backgroundColor` | `string` | `auto` | Custom background color (auto-calculated if not provided) |

### Camera Settings
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cameraPosition` | `[x, y, z]` | `[0, 10, 30]` | Initial camera position |
| `cameraFov` | `number` | `60` | Camera field of view |

### Stars Configuration
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showStars` | `boolean` | `true` | Show/hide background stars |
| `starsRadius` | `number` | `300` | Stars field radius |
| `starsDepth` | `number` | `60` | Stars field depth |
| `starsCount` | `number` | `auto` | Number of stars (auto: 5000/8000) |
| `starsFactor` | `number` | `auto` | Stars brightness factor (auto: 4/6) |

### Controls
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableControls` | `boolean` | `true` | Enable mouse/touch controls |
| `enablePan` | `boolean` | `false` | Allow panning |
| `enableZoom` | `boolean` | `true` | Allow zooming |
| `enableRotate` | `boolean` | `true` | Allow rotation |
| `autoRotate` | `boolean` | `true` | Auto-rotate the scene |
| `autoRotateSpeed` | `number` | `0.5` | Auto-rotation speed |
| `minDistance` | `number` | `10` | Minimum zoom distance |
| `maxDistance` | `number` | `100` | Maximum zoom distance |

### Solar System
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `planetsConfig` | `Array` | `null` | Custom planets configuration |
| `showAsteroidBelt` | `boolean` | `true` | Show/hide asteroid belt |
| `systemRotationSpeed` | `number` | `0.001` | Overall system rotation speed |

### Container
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `""` | Additional CSS classes |
| `style` | `object` | `{}` | Inline styles |

## 🎨 Custom Planets

You can define your own planets configuration:

\`\`\`jsx
const customPlanets = [
  {
    name: "MyPlanet",
    size: 0.5,
    color: "#ff6b6b",
    orbitRadius: 8,
    orbitSpeed: 0.01,
    rotationSpeed: 0.02,
    emissive: "#330000", // Optional: glow color
    roughness: 0.8,      // Optional: surface roughness
    metalness: 0.1       // Optional: metallic appearance
  },
  // ... more planets
]

<SpaceBackground planetsConfig={customPlanets} />
\`\`\`

## 🌟 Advanced Examples

### Dark Theme with Custom Settings
\`\`\`jsx
<SpaceBackground
  isDark={true}
  autoRotateSpeed={1.0}
  starsCount={10000}
  systemRotationSpeed={0.002}
/>
\`\`\`

### Minimal Setup (No Controls)
\`\`\`jsx
<SpaceBackground
  enableControls={false}
  showAsteroidBelt={false}
  autoRotate={true}
  autoRotateSpeed={0.2}
/>
\`\`\`

### Custom Styled Container
\`\`\`jsx
<SpaceBackground
  className="opacity-80"
  style={{ filter: 'blur(1px)' }}
  backgroundColor="#1a0033"
/>
\`\`\`

## 🎮 User Interactions

- **Mouse Drag**: Rotate the view around the solar system
- **Mouse Wheel**: Zoom in and out
- **Touch**: Full touch support for mobile devices
- **Auto-rotation**: Gentle automatic rotation when idle

## ⚡ Performance Tips

1. **Reduce Stars**: Lower `starsCount` for better performance on mobile
2. **Disable Features**: Turn off `showAsteroidBelt` or `enableControls` if not needed
3. **Custom Planets**: Use fewer planets in `planetsConfig` for simpler scenes
4. **DPR Control**: The component automatically handles device pixel ratio

## 🔧 Troubleshooting

### Common Issues

1. **Black Screen**: Make sure Three.js dependencies are installed
2. **Performance Issues**: Reduce `starsCount` or disable asteroid belt
3. **Controls Not Working**: Ensure `enableControls={true}`
4. **Styling Issues**: Remember the component uses `position: fixed` by default

### Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ IE: Not supported (requires WebGL 2.0)

## 📄 License

MIT License - feel free to use in your projects!

## 🤝 Contributing

Contributions welcome! Feel free to submit issues and pull requests.

---

**Built with React + Vite for the future of AI-powered document interaction**

**Made with ❤️ and Three.js**

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
