# Modern Multi-Page Portfolio

A premium, scalable, and SEO-ready portfolio built with React, TypeScript, TailwindCSS, React Router, and Framer Motion.

## 🎯 Features

- **11 Unique Pages**: Home, About, Journey, Skills, Projects, Experience, Education, Achievements, Tools, Vision, Contact
- **Dynamic Theming**: Each page has a distinct theme with smooth transitions
- **Auto Page Navigation**: Smart scroll detection that suggests navigating to the next page
- **SEO Optimized**: Dynamic meta tags, Open Graph, and Twitter cards
- **Analytics Ready**: Google Firebase Analytics integration
- **Fully Responsive**: Mobile-first design that works on all devices
- **Performance Optimized**: Lazy loading, code splitting, and smooth animations
- **JSON-Driven Content**: Easy to update content without touching code
- **TypeScript**: Type-safe development experience

## 📁 Project Structure

```
src/
├── app/
│   ├── components/         # Reusable components
│   │   ├── Layout.tsx      # Main layout with navbar and routing
│   │   ├── Navbar.tsx      # Navigation bar with active route indicator
│   │   ├── SEO.tsx         # SEO component with react-helmet
│   │   ├── PageTransitionHint.tsx  # Auto-navigation hint
│   │   ├── ScrollToTop.tsx # Scroll to top button
│   │   └── ui/             # UI components (shadcn)
│   ├── context/            # React contexts
│   │   └── ThemeContext.tsx # Theme management
│   ├── data/               # JSON data files
│   │   ├── home.json
│   │   ├── about.json
│   │   ├── journey.json
│   │   ├── skills.json
│   │   ├── projects.json
│   │   ├── experience.json
│   │   ├── education.json
│   │   ├── achievements.json
│   │   ├── tools.json
│   │   ├── vision.json
│   │   └── contact.json
│   ├── hooks/              # Custom React hooks
│   │   ├── useAutoPageTransition.ts  # Smart page navigation
│   │   └── useScrollToTop.ts         # Scroll to top on route change
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Journey.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   ├── Achievements.tsx
│   │   ├── Tools.tsx
│   │   ├── Vision.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── themes/             # Theme configurations
│   │   └── index.ts        # Theme definitions
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts        # Type definitions
│   ├── utils/              # Utility functions
│   │   └── analytics.ts    # Firebase Analytics
│   ├── routes.tsx          # React Router configuration
│   └── App.tsx             # Main App component
├── styles/                 # Global styles
│   ├── index.css
│   ├── tailwind.css
│   ├── theme.css           # Theme variables
│   └── fonts.css
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

All dependencies are already installed. The project is ready to use.

### Running the Development Server

The Vite dev server is already running. Just view the preview to see your portfolio!

## 🎨 Customization

### 1. Update Content

Edit the JSON files in `src/app/data/` to customize your portfolio content:

- **home.json**: Hero section content
- **about.json**: Your story and highlights
- **journey.json**: Timeline of your career milestones
- **skills.json**: Technical skills by category
- **projects.json**: Portfolio projects with links and previews
- **experience.json**: Work experience
- **education.json**: Academic background
- **achievements.json**: Awards and recognitions
- **tools.json**: Tools and technologies you use
- **vision.json**: Your vision, goals, and values
- **contact.json**: Contact information and social links

### 2. Customize Themes

Edit `src/app/themes/index.ts` to change the color schemes for each page:

```typescript
export const themes: Record<string, Theme> = {
  home: {
    name: 'Cosmic',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: '#0f172a',
      text: '#f8fafc',
    },
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  // ... more themes
};
```

### 3. Configure Auto Page Transition

In `src/app/components/Layout.tsx`, adjust the auto-navigation settings:

```typescript
const { showHint, nextPage, isLastPage } = useAutoPageTransition({
  enabled: true,        // Enable/disable auto-navigation
  threshold: 0.92,      // Scroll threshold (0-1)
  delayMs: 1500,        // Delay before navigation (ms)
});
```

### 4. Set Up Firebase Analytics

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Add a web app to your project
3. Copy your Firebase configuration
4. Update `src/app/utils/analytics.ts` with your config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

### 5. Update SEO Meta Tags

Edit the site title in `src/app/components/SEO.tsx`:

```typescript
const siteTitle = 'Your Name - Developer Portfolio';
```

## 🎯 Page Flow

The auto-navigation follows this flow:

```
Home → About → Journey → Skills → Projects → 
Experience → Education → Achievements → Tools → 
Vision → Contact
```

## 📊 Analytics Events

The portfolio tracks the following events:

- **page_view**: Every page visit
- **project_click**: When a user clicks on a project
- **contact_click**: When a user clicks on a social link or email

## 🎨 Theming System

Each page automatically applies its theme when loaded. The theme system uses CSS variables that are dynamically updated:

- `--theme-primary`: Primary color
- `--theme-secondary`: Secondary color
- `--theme-accent`: Accent color
- `--theme-background`: Background color
- `--theme-text`: Text color
- `--theme-gradient`: Gradient background

## 🚀 Performance

- **Lazy Loading**: All pages are lazy-loaded for optimal performance
- **Code Splitting**: Automatic code splitting with React Router
- **Smooth Animations**: Hardware-accelerated animations with Framer Motion
- **Optimized Images**: Use WebP format and lazy loading for images

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:

- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🛠️ Tech Stack

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **React Router 7**: Routing with data loading
- **TailwindCSS 4**: Styling
- **Framer Motion**: Animations
- **Firebase**: Analytics
- **React Helmet Async**: SEO

## 📝 Adding New Pages

1. Create a new page component in `src/app/pages/`
2. Create a corresponding JSON data file in `src/app/data/`
3. Add a theme in `src/app/themes/index.ts`
4. Add the route in `src/app/routes.tsx`
5. Add the link in `src/app/components/Navbar.tsx`
6. Update the page flow in `src/app/hooks/useAutoPageTransition.ts`

## 🎨 Customizing the Navbar

Edit `src/app/components/Navbar.tsx` to:

- Change the logo
- Modify navigation links
- Adjust mobile menu behavior
- Customize active route styling

## 🌐 Deployment

This portfolio can be deployed to:

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Configure base URL in Vite config
- **Any static hosting**: Build with `vite build`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 💬 Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ using React, TypeScript, and TailwindCSS
