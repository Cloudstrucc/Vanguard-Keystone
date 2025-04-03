# DID Wallet System - Local Development Guide

This repository contains the DID Wallet system, which enables passwordless authentication with Microsoft Entra ID, building access via digital badges, and identity verification with facial recognition.

## System Components

The system consists of the following components:

1. **DID Wallet App** - React-based web application and mobile apps (iOS/Android)
2. **Admin Portal** - React-based administration interface
3. **Backend Services** - Node.js APIs for authentication, verification, and credential issuance
4. **Microsoft Integrations** - Entra ID and Verified ID connectors

## Prerequisites

Before getting started, ensure you have the following installed:

* Node.js (v18 or later)
* npm (v8 or later)
* Git
* Docker and Docker Compose (for running services locally)
* A Microsoft Azure account with Entra ID and Verified ID access
* Visual Studio Code (recommended for development)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/did-wallet-system.git
cd did-wallet-system
```

### 2. Backend Services Setup

The backend services handle authentication, credential issuance, and integration with Microsoft services.

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Edit the .env file with your configuration
# You'll need to add your Microsoft Entra ID credentials
nano .env
```

### 3. Run the Backend Services

```bash
# Start the backend services
npm run dev
```

This will start the backend services on http://localhost:3001 by default.

### 4. DID Wallet App Setup

```bash
# Navigate to the wallet app directory
cd ../wallet-app

# Install dependencies
npm install

# Create your local environment file
cp .env.example .env

# Edit the .env file with your configuration
nano .env

# Start the development server
npm start
```

This will start the DID Wallet app on http://localhost:3000.

### 5. Admin Portal Setup

```bash
# Navigate to the admin portal directory
cd ../admin-portal

# Install dependencies
npm install

# Create your local environment file
cp .env.example .env

# Edit the .env file with your configuration
nano .env

# Start the development server
npm start
```

This will start the Admin Portal on http://localhost:3002.

### 6. Docker Compose (Optional)

To run all services together, you can use Docker Compose:

```bash
# From the root directory
docker-compose up
```

## Microsoft Entra ID and Verified ID Configuration

### Setting up Entra ID Application

1. Log into the [Azure Portal](https://portal.azure.com)
2. Navigate to "Microsoft Entra ID" (formerly Azure Active Directory)
3. Go to "App registrations" and create a new application
4. Configure the following:
   * Redirect URIs: http://localhost:3000/auth/callback
   * Required permissions: Microsoft Graph API (User.Read, User.ReadBasic.All)
   * Enable "Allow public client flows"
5. Note the Application (client) ID and Directory (tenant) ID
6. Update these values in your .env files

### Setting up Microsoft Verified ID

1. Navigate to "Verified ID" in the Azure Portal
2. Create a new credential type for "Employee Badge"
3. Configure the rules and display properties
4. Note the Verified ID tenant URL and API credentials
5. Update these values in your .env files

## Using the Local System

### Testing the DID Wallet App

1. Open the DID Wallet App at http://localhost:3000
2. Create a new wallet with the "+" button
3. For testing, you can use the simulated verification process
4. Connect to your test Entra ID tenant with the "Connect" button

### Testing the Admin Portal

1. Open the Admin Portal at http://localhost:3002
2. Log in with your test administrator credentials
3. Create new test users and issue credentials
4. Test the access control and verification processes

## Mock Data for Testing

The system includes mock data for testing without real Microsoft integration:

* Sample users with predefined credentials
* Mock building access points
* Simulated verification responses

To use the mock data:

```bash
# In the backend directory
npm run mock-data
```

## Testing ID Verification

For testing the ID verification workflow locally:

1. Use the test images in the `test-assets` folder for document verification
2. The system includes a simulated facial verification service for testing
3. Access the verification testing page at http://localhost:3000/test-verification

## Mobile App Development

### Setting up React Native Environment

```bash
# Install React Native CLI
npm install -g react-native-cli

# Navigate to the mobile app directory
cd mobile-app

# Install dependencies
npm install

# For iOS
cd ios && pod install && cd ..

# Start the Metro bundler
npm start

# In a separate terminal, run the app
npm run ios
# or
npm run android
```

## Troubleshooting

### Common Issues

1. **Connection refused errors** : Ensure all services are running and ports are correctly configured
2. **Authentication failures** : Check your Entra ID credentials and redirect URIs
3. **Missing environment variables** : Verify all required variables are set in your .env files

### Logs

Each component writes logs to the `logs` directory. Check these for detailed error information:

* Backend: `backend/logs`
* Wallet App: `wallet-app/logs`
* Admin Portal: `admin-portal/logs`

## Additional Resources

* [Microsoft Entra ID Documentation](https://learn.microsoft.com/en-us/entra/identity/)
* [Microsoft Verified ID Documentation](https://learn.microsoft.com/en-us/entra/verified-id/)
* [Decentralized Identity Foundation](https://identity.foundation/)
* [W3C DID Specification](https://www.w3.org/TR/did-core/)

## Next Steps

After testing locally, you can deploy the system to your production environment:

1. Set up Azure App Services for hosting
2. Configure your production Entra ID tenant
3. Set up CI/CD pipelines for automated deployment
4. Create production credentials in Microsoft Verified ID
