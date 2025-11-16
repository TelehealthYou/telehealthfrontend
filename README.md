
# Tele Health Appointment System

A modern, fully-featured telehealth appointment booking system built with React, TypeScript, and Vite. This application provides a seamless experience for patients to book medical appointments, select healthcare providers, and manage their telehealth consultations.

## 🚀 Features

- **Interactive Landing Page** with animated sliders and service showcases
- **Multi-Step Booking Process**:
  - Location selection
  - Date and time scheduling
  - Service selection
  - Doctor selection
  - Booking confirmation
- **Responsive Design** optimized for mobile, tablet, and desktop
- **Modern UI Components** using Radix UI and Tailwind CSS
- **Type-Safe** with TypeScript
- **Fast Development** with Vite and SWC

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Telehealthfrontend
```

2. Install dependencies:
```bash
npm install
```

## 🏃‍♂️ Running the Application

### Development Mode
Start the development server with hot-reload:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Build
Build the application for production:
```bash
npm run build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

### Type Checking
Run TypeScript type checking:
```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── booking/         # Booking flow components
│   ├── figma/          # Figma-exported components
│   └── ui/             # Reusable UI components (Radix UI)
├── assets/             # Images and static assets
├── imports/            # SVG and other imports
├── styles/             # Global CSS styles
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles with Tailwind

```

## 🔧 Technology Stack

- **React 18.3+** - UI library
- **TypeScript 5.6+** - Type safety
- **Vite 6.4+** - Build tool
- **Tailwind CSS 4.1+** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library
- **Embla Carousel** - Carousel component
- **React Day Picker** - Date picker
- **Sonner** - Toast notifications

## 🎨 UI Components

The project uses a comprehensive set of UI components from Radix UI:

- Accordion, Alert Dialog, Avatar, Badge, Button
- Calendar, Card, Carousel, Chart, Checkbox
- Dialog, Dropdown Menu, Form, Input, Label
- Navigation Menu, Popover, Progress, Radio Group
- Select, Separator, Sheet, Sidebar, Slider
- Switch, Tabs, Textarea, Tooltip, and more

## ✅ Fixed Issues

### TypeScript Errors Fixed:
1. ✅ Added missing TypeScript configuration files (`tsconfig.json`, `tsconfig.node.json`)
2. ✅ Fixed all versioned imports (removed @version suffixes)
3. ✅ Added proper type annotations for implicit `any` types
4. ✅ Fixed unused variable warnings
5. ✅ Created type declarations for image imports (`vite-env.d.ts`)
6. ✅ Fixed JSX fragment closing tags
7. ✅ Resolved module import errors

### Package.json Updates:
1. ✅ Fixed invalid package name (removed spaces)
2. ✅ Added missing devDependencies:
   - `@types/react` and `@types/react-dom`
   - `typescript`
   - `tailwindcss`, `postcss`, `autoprefixer`
3. ✅ Added `type: "module"` for ES modules
4. ✅ Added `lint` and `preview` scripts

### Security:
1. ✅ Updated Vite to v6.4.1 (fixed security vulnerabilities)

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run TypeScript type checking |

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is based on the Figma design available at: https://www.figma.com/design/e8H23QJA9lbIcw7CbJNqo7/Tele-Health-Appointment-System

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Bug Reports

If you encounter any issues, please file a bug report on the GitHub repository.

## 📞 Support

For support and questions, please open an issue on the GitHub repository.
  