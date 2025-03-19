# Crypto Dashboard with Clean Architecture

A React TypeScript application that displays cryptocurrency data with a login system, built using clean architecture principles.

## Features

- User authentication with localStorage
- Cryptocurrency data display from CoinGecko API
- Responsive design with Tailwind CSS
- Clean architecture implementation

## Project Structure

The project follows clean architecture principles with the following layers:

### Core Layer

Contains business logic and domain models:
- `core/models/CryptoModel.ts` - Domain model for cryptocurrency data
- `core/models/UserModel.ts` - Domain model for user data

### Application Layer

Contains use cases and application-specific interfaces:
- `application/interfaces/ICryptoService.ts` - Interface for crypto service
- `application/interfaces/IAuthService.ts` - Interface for authentication service

### Infrastructure Layer

Contains external implementations:
- `infrastructure/services/CryptoService.ts` - Implementation of ICryptoService
- `infrastructure/services/AuthService.ts` - Implementation of IAuthService
- `infrastructure/utils/formatters.ts` - Utility functions for formatting data

### Presentation Layer

Contains UI components and state management:
- `presentation/pages/LoginPage.tsx` - Login page component
- `presentation/pages/DashboardPage.tsx` - Dashboard page component
- `presentation/components/CryptoCard.tsx` - Component for displaying crypto data
- `presentation/components/PriceChange.tsx` - Component for displaying price changes
- `presentation/hooks/useAuth.ts` - Custom hook for authentication

## Login Credentials

Edit it at the .env

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file based on `.env.example` and add your credentials:
   ```
   VITE_API_KEY=your_api_key_here
   VITE_VALID_USERNAME=your_username_here
   VITE_VALID_PASSWORD=your_password_here
   ```
4. Run the development server with `npm run dev`

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (for icons)

## Deployment to Vercel

This project is configured for easy deployment to Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in Vercel dashboard
3. Add the following environment variables in Vercel dashboard:
   - `VITE_API_KEY`
   - `VITE_VALID_USERNAME`
   - `VITE_VALID_PASSWORD`
4. Deploy the project

Vercel will automatically detect the Vite configuration and build the project correctly using the settings in `vercel.json`.
