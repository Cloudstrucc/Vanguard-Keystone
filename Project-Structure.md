
# DID Wallet System Project Structure

Below is the recommended project structure for the DID Wallet system. This structure organizes the codebase into logical components, making it easier to develop, test, and maintain.

```
did-wallet-system/
│
├── wallet-app/                       # Web-based DID wallet application
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── wallet/               # Wallet-specific components
│   │   │   ├── credentials/          # Credential display components
│   │   │   ├── verification/         # ID verification components
│   │   │   └── shared/               # Shared UI elements
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── services/                 # API and service integrations
│   │   │   ├── auth.js               # Authentication service
│   │   │   ├── verification.js       # ID verification service 
│   │   │   ├── credentials.js        # Credential management
│   │   │   └── entra.js              # Microsoft Entra ID integration
│   │   ├── contexts/                 # React context providers
│   │   ├── utils/                    # Utility functions
│   │   ├── pages/                    # Application pages/routes
│   │   └── App.js                    # Main application component
│   ├── package.json
│   └── README.md
│
├── admin-portal/                     # Administrator interface
│   ├── public/
│   ├── src/
│   │   ├── components/               # Admin UI components
│   │   │   ├── users/                # User management components
│   │   │   ├── access/               # Access control components
│   │   │   ├── activity/             # Activity log components
│   │   │   └── settings/             # Settings components
│   │   ├── services/                 # Admin API services
│   │   ├── hooks/                    # Admin-specific hooks
│   │   ├── contexts/                 # Admin context providers
│   │   ├── utils/                    # Utility functions
│   │   ├── pages/                    # Admin portal pages
│   │   └── App.js                    # Main admin application
│   ├── package.json
│   └── README.md
│
├── mobile-app/                       # React Native mobile application
│   ├── android/                      # Android-specific files
│   ├── ios/                          # iOS-specific files
│   ├── src/
│   │   ├── components/               # Mobile UI components
│   │   ├── services/                 # Mobile services and APIs
│   │   ├── screens/                  # Mobile app screens
│   │   ├── navigation/               # React Navigation setup
│   │   └── App.js                    # Mobile app entry point
│   ├── package.json
│   └── README.md
│
├── backend/                          # Backend services and APIs
│   ├── src/
│   │   ├── controllers/              # API controllers
│   │   │   ├── auth.js               # Authentication controller
│   │   │   ├── users.js              # User management
│   │   │   ├── credentials.js        # Credential issuance
│   │   │   └── verification.js       # ID verification handling
│   │   ├── models/                   # Data models
│   │   ├── routes/                   # API routes
│   │   ├── services/                 # Business logic services
│   │   │   ├── entra-service.js      # Microsoft Entra ID service
│   │   │   ├── verified-id.js        # Microsoft Verified ID service
│   │   │   ├── did-service.js        # DID creation and management
│   │   │   └── face-verification.js  # Facial recognition service
│   │   ├── utils/                    # Utility functions
│   │   ├── middleware/               # Express middleware
│   │   ├── config/                   # Configuration files
│   │   └── app.js                    # Express application setup
│   ├── tests/                        # Backend tests
│   ├── package.json
│   └── README.md
│
├── shared/                           # Shared code and utilities
│   ├── did-utils/                    # DID-related utilities
│   ├── crypto/                       # Cryptographic functions
│   ├── types/                        # TypeScript types/interfaces
│   └── constants/                    # Shared constants
│
├── docs/                             # Documentation
│   ├── architecture.md               # System architecture
│   ├── api.md                        # API documentation
│   ├── deployment.md                 # Deployment guide
│   └── verification-process.md       # ID verification process
│
├── test-assets/                      # Assets for testing
│   ├── sample-ids/                   # Sample ID documents for testing
│   └── sample-faces/                 # Sample face images for testing
│
├── scripts/                          # Development and deployment scripts
│   ├── setup.sh                      # Setup script
│   ├── mock-data.js                  # Generate mock data
│   └── deploy.sh                     # Deployment script
│
├── docker-compose.yml                # Docker Compose configuration
├── .env.example                      # Example environment variables
├── .gitignore
├── package.json                      # Root package.json for dev dependencies
└── README.md                         # Main project README
```

## Key Components and Their Responsibilities

### Wallet App

The wallet app is the primary user interface for employees to manage their digital identity, credentials, and authentication.

- **components/wallet/** - Components for DID management and display
- **components/credentials/** - Components for managing and displaying verifiable credentials
- **components/verification/** - Components for the ID verification process
- **services/auth.js** - Handles authentication and session management
- **services/verification.js** - Manages the ID verification process
- **services/credentials.js** - Manages credential storage and presentation
- **services/entra.js** - Integrates with Microsoft Entra ID for authentication

### Admin Portal

The admin portal allows organization administrators to manage users, issue credentials, control access, and monitor system activity.

- **components/users/** - User management interface components
- **components/access/** - Building access control components
- **components/activity/** - Activity monitoring and logging components
- **components/settings/** - System configuration components
- **services/admin-api.js** - Communicates with backend admin APIs

### Mobile App

The mobile app provides the same functionality as the web wallet but optimized for mobile devices and with additional features like NFC for building access.

- **screens/verification/** - Mobile ID verification process
- **screens/wallet/** - Mobile wallet interface
- **screens/credentials/** - Credential management and display
- **screens/scanner/** - QR code scanner for authentication

### Backend

The backend provides APIs for all frontend applications and integrates with Microsoft services.

- **controllers/** - API endpoints and request handling
- **services/entra-service.js** - Integration with Microsoft Entra ID
- **services/verified-id.js** - Integration with Microsoft Verified ID
- **services/did-service.js** - DID creation and management
- **services/face-verification.js** - Facial recognition and ID document verification

### Shared

The shared directory contains code that is used across multiple components of the system.

- **did-utils/** - Utilities for working with DIDs and credentials
- **crypto/** - Cryptographic functions for signing and verification
- **types/** - TypeScript type definitions shared across projects

## Testing Structure

Each component includes its own tests:

- **wallet-app/src/\_\_tests\_\_/** - Tests for the wallet application
- **admin-portal/src/\_\_tests\_\_/** - Tests for the admin portal
- **mobile-app/src/\_\_tests\_\_/** - Tests for the mobile application
- **backend/tests/** - Tests for the backend services

## Development Workflow

1. Make changes in the relevant component
2. Run local tests to verify functionality
3. Start the entire system locally with Docker Compose
4. Test integration between components
5. Commit changes with descriptive messages
6. Create pull requests for code review

## Deployment Structure

The system is designed to be deployed as separate services:

- Wallet App: Deployed as a static web application
- Admin Portal: Deployed as a static web application
- Backend: Deployed as containerized microservices
- Mobile App: Published to app stores (iOS App Store and Google Play)