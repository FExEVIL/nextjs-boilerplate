# ORION - Next.js Financial Dashboard Boilerplate

A modern, production-ready Next.js boilerplate featuring a comprehensive financial dashboard with real-time market data, authentication, polling system, and export capabilities.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

### 🎯 Core Features

- **Real-time Market Data** - Live stock quotes, indices, and sector performance via Alpha Vantage API
- **Authentication System** - Secure login with form validation and session management
- **Polling/Voting** - Built-in poll creation and voting system with local storage
- **PDF Export** - Generate professional market reports in PDF format
- **Responsive Design** - Mobile-first design that works on all devices
- **Dark Mode Ready** - CSS variables configured for easy theme switching

### 🛠️ Technical Features

- **Modular Architecture** - Well-organized component structure
- **TypeScript** - Full type safety with zero `any` types
- **Error Boundaries** - Graceful error handling with user-friendly fallbacks
- **Toast Notifications** - Beautiful toast system for user feedback
- **Testing Ready** - Jest and React Testing Library configured
- **Code Quality** - ESLint and Prettier configured for consistent code style
- **Production Optimized** - Webpack optimizations, code splitting, and compression

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nextjs-boilerplate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and add your Alpha Vantage API key:

   ```
   NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_api_key_here
   ```

   Get a free API key at [Alpha Vantage](https://www.alphavantage.co/support/#api-key)

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
nextjs-boilerplate/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main page component
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── Loading.tsx
│   ├── market/              # Market-specific components
│   │   ├── StatCard.tsx
│   │   ├── IndexCard.tsx
│   │   └── NewsCard.tsx
│   ├── Poll.tsx             # Polling component
│   ├── Navigation.tsx       # Navigation component
│   ├── Footer.tsx           # Footer component
│   └── ErrorBoundary.tsx    # Error boundary wrapper
├── contexts/                # React contexts
│   ├── AuthContext.tsx      # Authentication context
│   └── ToastContext.tsx     # Toast notifications context
├── services/                # API and business logic
│   ├── marketDataService.ts # Market data API calls
│   ├── pollService.ts       # Poll management
│   └── exportService.ts     # PDF export functionality
├── types/                   # TypeScript type definitions
│   └── index.ts            # All application types
├── lib/                     # Utility functions
│   ├── utils.ts            # General utilities
│   └── constants.ts        # Application constants
├── public/                  # Static assets
│   └── logo.png            # Application logo
├── .env.example            # Environment variables template
├── .env.local              # Your local environment variables (gitignored)
├── .eslintrc.json          # ESLint configuration
├── .prettierrc.json        # Prettier configuration
├── jest.config.js          # Jest configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Available Scripts

| Command                 | Description                             |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | Start development server with Turbopack |
| `npm run build`         | Build production application            |
| `npm start`             | Start production server                 |
| `npm run lint`          | Run ESLint                              |
| `npm run lint:fix`      | Fix ESLint errors automatically         |
| `npm run format`        | Format code with Prettier               |
| `npm run format:check`  | Check code formatting                   |
| `npm run type-check`    | Run TypeScript type checking            |
| `npm test`              | Run Jest tests                          |
| `npm run test:watch`    | Run tests in watch mode                 |
| `npm run test:coverage` | Generate test coverage report           |

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Alpha Vantage API Configuration
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_api_key_here

# Application Configuration
NEXT_PUBLIC_APP_NAME=ORION
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_POLLING=true
NEXT_PUBLIC_ENABLE_EXPORT=true
```

### API Rate Limits

The Alpha Vantage free tier allows:

- 25 API calls per day
- 5 API calls per minute

The application is configured to:

- Auto-refresh market data every 15 minutes
- Use fallback/cached data when rate limits are exceeded
- Display clear error messages to users

## Documentation

- **[API Documentation](docs/API.md)** - Complete API reference
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Deploy to Vercel, Netlify, Docker, etc.

## Components Guide

### UI Components

#### Button

```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="md" isLoading={false}>
  Click Me
</Button>;
```

#### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

<Card hover>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Card content goes here</CardContent>
</Card>;
```

#### Toast

```tsx
import { useToast } from '@/contexts/ToastContext';

const { success, error, warning, info } = useToast();

success('Operation successful!');
error('Something went wrong');
```

## Authentication

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = async () => {
    const result = await login({ email, password });
    if (result.success) {
      // Login successful
    }
  };
}
```

**Note:** This is a client-side only authentication system. For production, implement server-side authentication.

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

See the [Deployment Guide](docs/DEPLOYMENT.md) for detailed instructions on deploying to Vercel, Netlify, Docker, and more.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Style

This project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Run `npm run lint:fix` and `npm run format` before committing.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Alpha Vantage](https://www.alphavantage.co/) - Financial market data API
- [jsPDF](https://github.com/parallax/jsPDF) - PDF generation library

---

Built with ❤️ using Next.js 15 and React 19
