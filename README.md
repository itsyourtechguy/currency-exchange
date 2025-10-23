## Currency Exchange Rate Viewer

A React application that displays 7-day historical exchange rates for a selected base currency against user-chosen target currencies (3–7 allowed), with date selection up to 90 days in the past.

[**Live Demo**]
(https://itsyourtechguy.github.io/currency-exchange/)

## ✅ Features
- View 7-day historical exchange rates
- Select any date within the last 90 days
- Choose a base currency (default: GBP)
- Add/remove target currencies from 160+ supported options
- Real-time validation (3–7 target currencies required)
- Client-side caching for optimal performance
- Responsive, accessible UI built with MUI

## 🛠 Tech Stack
- **Framework**: React + TypeScript
- **Bundler**: Vite
- **Styling**: Material UI (MUI)
- **State Management**: React Hooks (`useState`, `useEffect`, custom hooks)
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint + Prettier
- **Deployment**: GitHub Pages

## 🚀 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/itsyourtechguy/currency-exchange.git

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test