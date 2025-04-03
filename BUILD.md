# Vanguard Keystone - Build and Development Guide

## Introduction

Vanguard Keystone is a comprehensive DID (Decentralized Identifier) wallet system that enables passwordless authentication with Microsoft Entra ID, building access via digital badges, and identity verification with facial recognition.

This document will guide you through setting up a development environment, building the application, and deploying it for testing or production use.

## System Architecture

Vanguard Keystone consists of the following components:

1. **DID Wallet App** - Web-based wallet application for managing digital identities
2. **Admin Portal** - Administrative interface for managing users and credentials
3. **Backend Services** - API services for authentication, verification, and credential issuance
4. **Mobile Applications** - iOS and Android apps for on-the-go identity management

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js (v18 or later)
- npm (v8 or later)
- Git
- Docker and Docker Compose (for containerized development)
- Microsoft Azure account with Entra ID and Verified ID access
- Visual Studio Code (recommended for development)

## Getting the Source Code

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/Cloudstrucc/Vanguard-Keystone.git
cd Vanguard-Keystone
```

## Project Structure

The repository follows a monorepo structure with the following directories:

```
Vanguard-Keystone/
│
├── wallet-app/                  # Web-based DID wallet application
├── admin-portal/                # Administrator interface
├── backend/                     # Backend services and APIs
├── mobile-app/                  # React Native mobile application
├── shared/                      # Shared code and utilities
├── docs/                        # Documentation
├── scripts/                     # Build and deployment scripts
├── docker-compose.yml           # Docker Compose configuration
└── package.json                 # Root package.json for managing workspaces
```

## Environment Setup

### 1. Setting up Environment Variables

Each component requires specific environment variables. Create `.env` files in each directory:

```bash
# Create .env files
cp wallet-app/.env.example wallet-app/.env
cp admin-portal/.env.example admin-portal/.env
cp backend/.env.example backend/.env
cp mobile-app/.env.example mobile-app/.env
```

Edit each `.env` file to include your specific configuration values:

```
# Example backend/.env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vanguard-keystone
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
JWT_SECRET=your-jwt-secret
```

### 2. Installing Dependencies

Install dependencies for all components:

```bash
# Install dependencies for all workspaces
npm install
```

Or install dependencies for specific components:

```bash
# Install dependencies for just the wallet app
cd wallet-app
npm install
```

## Building the Application

### 1. Building Shared Libraries

First, build the shared libraries that other components depend on:

```bash
# From the root directory
npm run build:shared
```

### 2. Building Frontend Applications

Build the wallet app and admin portal:

```bash
# Build all frontend applications
npm run build:wallet
npm run build:admin
```

### 3. Building Backend Services

Build the backend services:

```bash
npm run build:backend
```

### 4. Building Mobile Applications

For iOS:

```bash
cd mobile-app
npm run pod-install  # Only needed for iOS
npm run ios
```

For Android:

```bash
cd mobile-app
npm run android
```

## Running the Development Environment

### 1. Using Docker Compose

The easiest way to run the entire system is using Docker Compose:

```bash
# From the root directory
docker-compose up
```

This will start all services and make them available at their default ports.

### 2. Running Components Individually

To run components individually for development:

```bash
# Run the wallet app
cd wallet-app
npm start  # Available at http://localhost:3000

# Run the admin portal
cd admin-portal
npm start  # Available at http://localhost:3002

# Run the backend
cd backend
npm run dev  # Available at http://localhost:3001
```

## Microsoft Entra ID and Verified ID Configuration

### 1. Setting up Entra ID Application

1. Log into the [Azure Portal](https://portal.azure.com)
2. Navigate to "Microsoft Entra ID" (formerly Azure Active Directory)
3. Go to "App registrations" and create a new application
4. Configure the application with the following settings:
   - Name: Vanguard Keystone
   - Supported account types: Accounts in this organizational directory only
   - Redirect URI: Web - http://localhost:3000/auth/callback
5. Note the Application (client) ID and Directory (tenant) ID
6. Under "Certificates & secrets", create a new client secret
7. Grant API permissions:
   - Microsoft Graph: User.Read, User.ReadBasic.All
   - Microsoft Verified ID Service: (if available)

### 2. Setting up Microsoft Verified ID

1. Navigate to "Verified ID" in the Azure Portal
2. Set up a Verified ID tenant if you don't have one
3. Create a credential type for "Employee Badge"
4. Configure the rules and display properties
5. Note the Verified ID tenant URL and API credentials

## Package.json Configuration

### Root Package.json

```json
{
  "name": "vanguard-keystone",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "wallet-app",
    "admin-portal",
    "backend",
    "shared"
  ],
  "scripts": {
    "start": "docker-compose up",
    "start:dev": "concurrently \"npm run start:wallet\" \"npm run start:admin\" \"npm run start:backend\"",
    "start:wallet": "cd wallet-app && npm start",
    "start:admin": "cd admin-portal && npm start",
    "start:backend": "cd backend && npm run dev",
    "build": "npm run build:shared && npm run build:wallet && npm run build:admin && npm run build:backend",
    "build:wallet": "cd wallet-app && npm run build",
    "build:admin": "cd admin-portal && npm run build",
    "build:backend": "cd backend && npm run build",
    "build:shared": "cd shared && npm run build",
    "test": "npm run test:wallet && npm run test:admin && npm run test:backend",
    "test:wallet": "cd wallet-app && npm test",
    "test:admin": "cd admin-portal && npm test",
    "test:backend": "cd backend && npm test",
    "lint": "npm run lint:wallet && npm run lint:admin && npm run lint:backend",
    "lint:wallet": "cd wallet-app && npm run lint",
    "lint:admin": "cd admin-portal && npm run lint",
    "lint:backend": "cd backend && npm run lint",
    "mock-data": "cd backend && npm run mock-data",
    "clean": "rimraf node_modules */node_modules */build */dist"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "cross-env": "^7.0.3",
    "husky": "^9.0.11",
    "lerna": "^8.1.2",
    "lint-staged": "^15.2.2",
    "prettier": "^3.2.5",
    "rimraf": "^5.0.5"
  },
  "engines": {
    "node": ">=18",
    "npm": ">=8"
  }
}
```

### Wallet App Package.json

```json
{
  "name": "did-wallet-app",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@azure/identity": "^4.0.1",
    "@azure/msal-browser": "^3.7.1",
    "@azure/msal-react": "^2.0.10",
    "@microsoft/verifiablecredentials-crypto-sdk-typescript": "^1.1.14",
    "axios": "^1.6.7",
    "buffer": "^6.0.3",
    "did-jwt": "^8.0.0",
    "did-resolver": "^4.1.0",
    "jose": "^5.2.2",
    "lucide-react": "^0.330.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.1",
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.4.1",
    "uuid": "^9.0.1",
    "zustand": "^4.5.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.2",
    "@testing-library/react": "^14.2.1",
    "@testing-library/user-event": "^14.5.2",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.11.19",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@types/uuid": "^9.0.8",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "postcss": "^8.4.35",
    "prettier": "^3.2.5",
    "typescript": "^5.3.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### Backend Package.json

```json
{
  "name": "did-wallet-backend",
  "version": "1.0.0",
  "private": true,
  "main": "dist/app.js",
  "dependencies": {
    "@azure/identity": "^4.0.1",
    "@azure/msal-node": "^2.6.0",
    "@decentralized-identity/ion-tools": "^1.1.4",
    "@microsoft/microsoft-graph-client": "^3.0.7",
    "axios": "^1.6.7",
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^16.4.4",
    "express": "^4.18.2",
    "express-jwt": "^8.4.1",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.1.3",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "node-cache": "^5.1.2",
    "passport": "^0.7.0",
    "passport-azure-ad": "^4.3.5",
    "winston": "^3.11.0"
  },
  "devDependencies": {
    "@types/compression": "^1.7.5",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.12",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/morgan": "^1.9.9",
    "@types/multer": "^1.4.11",
    "@types/node": "^20.11.19",
    "@types/passport": "^1.0.16",
    "@types/supertest": "^6.0.2",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "jest": "^29.7.0",
    "nodemon": "^3.0.3",
    "prettier": "^3.2.5",
    "supertest": "^6.3.4",
    "ts-jest": "^29.1.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  },
  "scripts": {
    "start": "node dist/app.js",
    "dev": "nodemon --exec ts-node src/app.ts",
    "build": "tsc -p .",
    "test": "jest --coverage",
    "lint": "eslint . --ext .js,.ts",
    "lint:fix": "eslint . --ext .js,.ts --fix",
    "mock-data": "ts-node scripts/mock-data.ts"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "/dist/"
    ]
  }
}
```

## Testing

### 1. Unit Testing

Run unit tests for all components:

```bash
# Run all tests
npm test

# Run tests for specific components
npm run test:wallet
npm run test:admin
npm run test:backend
```

### 2. Testing with Mock Data

For development and testing, you can generate mock data:

```bash
npm run mock-data
```

This populates the system with:

- Sample users
- Test credentials
- Mock authentication events
- Test building access points

### 3. E2E Testing

End-to-end tests use Cypress:

```bash
# In the e2e directory
cd e2e
npm install
npm test
```

## Deployment

### 1. Building for Production

```bash
# Build all components for production
npm run build
```

### 2. Docker-based Deployment

A Docker Compose file is provided for containerized deployment:

```bash
# Build and run containers
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Cloud Deployment

For deploying to Azure:

1. Set up Azure App Services for each component
2. Configure environment variables in the Azure portal
3. Set up CI/CD pipelines using GitHub Actions or Azure DevOps

Example GitHub Actions workflow for deployment:

```yaml
name: Deploy to Azure

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
    - name: npm install and build
      run: |
        npm install
        npm run build
    - name: 'Deploy to Azure'
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'vanguard-keystone-backend'
        publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE_BACKEND }}
        package: ./backend
```

## .gitignore Configuration

A comprehensive `.gitignore` file is included to prevent committing sensitive information:

```gitignore
# Environment variables and secrets
.env
.env.local
.env.development
.env.test
.env.production
.env.local
.env.development.local
.env.test.local
.env.production.local
*.env

# dependencies
node_modules/
/.pnp
.pnp.js
package-lock.json
yarn.lock

# testing
/coverage
.nyc_output
*.lcov

# builds and distributions
/build/
/dist/
/out/
/.next/
/.nuxt/
/.cache/
/public/dist/

# Mobile app specific
/mobile-app/ios/Pods/
/mobile-app/ios/build/
/mobile-app/android/app/build/
/mobile-app/android/.gradle/
/mobile-app/android/build/
/mobile-app/android/local.properties
/mobile-app/android/captures/
/mobile-app/android/app/release/
*.apk
*.aab
*.ipa
*.xcarchive

# IDE and editors
.idea/
.vscode/
*.swp
*.swo
.DS_Store
.project
.classpath
.settings/
.vs/
*.sublime-workspace
*.sublime-project
.atom/
.editorconfig
.history/
*.code-workspace

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS files
.DS_Store
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/
._*
*~
*.sw[a-p]

# SSL Certificates for local development
*.pem
*.key
*.crt
*.csr
*.srl

# DID key files (should be stored securely, not in repo)
*.jwk
*private-key*
*secret*
```

## Troubleshooting

### Common Issues

1. **Connection refused errors**

   - Ensure all services are running and ports are correctly configured
   - Check that environment variables are properly set
2. **Authentication failures**

   - Verify your Azure Entra ID credentials
   - Ensure redirect URIs are correctly configured
   - Check for correct scopes in the authentication request
3. **Mobile app build errors**

   - For iOS issues: `cd ios && pod install`
   - For Android issues: Check SDK location in `local.properties`

### Logs

Each component writes logs to the `logs` directory:

- Backend: `backend/logs/`
- Wallet App: `wallet-app/logs/`
- Admin Portal: `admin-portal/logs/`

## Additional Resources

- [Microsoft Entra ID Documentation](https://learn.microsoft.com/en-us/entra/identity/)
- [Microsoft Verified ID Documentation](https://learn.microsoft.com/en-us/entra/verified-id/)
- [Decentralized Identity Foundation](https://identity.foundation/)
- [W3C DID Specification](https://www.w3.org/TR/did-core/)

## Support

For additional support:

- GitHub Issues: https://github.com/Cloudstrucc/Vanguard-Keystone/issues
- Email Support: support@vanguardcloudservices.com
