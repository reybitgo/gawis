# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Laravel 12 E-Wallet System - a comprehensive digital wallet application for managing financial transactions with robust admin controls and intuitive user interfaces. The system features:

- **Authentication**: Laravel Fortify for secure user authentication
- **Authorization**: Spatie Laravel Permission for role-based access control
- **PWA Support**: Progressive Web App with offline capabilities and service worker
- **Modern UI**: CoreUI template with dark mode support and responsive design
- **Security**: .htaccess configuration for production deployment on shared hosting

## Recent Features Added
- ✅ PWA (Progressive Web App) implementation with service worker
- ✅ Favicon and app icon optimization for all platforms
- ✅ Dark mode compatibility across all admin and member interfaces
- ✅ Consistent UI spacing and padding across wallet operation forms
- ✅ Offline page with auto-retry functionality
- ✅ Production-ready .htaccess configuration for Hostinger deployment

## Development Commands

### Core Development
```bash
# Start development environment (runs server, queue, logs, and vite concurrently)
composer dev

# Run tests
composer test

# Development server only
php artisan serve

# Frontend development
npm run dev

# Build frontend assets
npm run build
```

### Laravel Commands
```bash
# Database operations
php artisan migrate
php artisan db:seed
php artisan migrate:refresh --seed

# Cache operations
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan config:clear

# Create storage symlink
php artisan storage:link

# Code formatting
./vendor/bin/pint
```

### Testing
```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/WalletTest.php

# Run with coverage
php artisan test --coverage
```

## Architecture Overview

### Core Models
- **User**: Manages user accounts with roles (admin/user)
- **Wallet**: Individual user wallets with balance tracking
- **Transaction**: All financial operations (deposits, withdrawals, transfers, fees)
- **SystemSetting**: Configurable system settings for fees and limits

### Key Features
- **Role-based Access**: Admin and user roles with different permissions
- **Transaction Types**: Deposits, withdrawals, transfers, and fee management
- **Admin Approval System**: Deposits and withdrawals require admin approval
- **Fee Management**: Configurable transfer and withdrawal fees
- **Real-time Processing**: Instant transfers with balance validation

### Directory Structure
- `app/Models/`: Core business models
- `app/Http/Controllers/`: Web controllers for user and admin interfaces
- `app/Actions/`: Business logic for wallet operations
- `app/Mail/`: Email notifications for transactions
- `database/migrations/`: Database schema definitions
- `routes/web.php`: All application routes

### Database Schema
- **users**: User accounts with Fortify authentication
- **wallets**: User wallet balances and status
- **transactions**: Complete transaction log with types and statuses
- **system_settings**: Configurable fee structures and limits
- **roles/permissions**: Spatie permission tables

### Transaction Flow
1. **Deposits**: User requests → Admin approval → Balance update
2. **Transfers**: Real-time processing with fee calculation
3. **Withdrawals**: Fee deduction → Admin approval → Processing
4. **Fees**: Automatically calculated and applied based on system settings

### Key Routes
- `/dashboard`: User dashboard with wallet overview
- `/wallet/*`: User wallet operations (deposit, transfer, withdraw, history)
- `/admin/*`: Admin interface for approvals and system management
- `/admin/transaction-approval`: Transaction approval interface
- `/admin/system-settings`: Fee and system configuration

### Security Features
- CSRF protection on all forms
- Role-based route protection
- Transaction validation and atomic operations
- Audit trail for all financial operations
- Session-based authentication with Fortify

### Frontend Stack
- Tailwind CSS for styling
- Vite for asset compilation
- Blade templates for server-side rendering
- Alpine.js for interactive components (if present)

## Common Tasks

### Adding New Transaction Types
1. Update Transaction model with new type constant
2. Add migration for any new fields
3. Update transaction validation rules
4. Add corresponding controller methods
5. Create Blade views for the transaction type

### Modifying Fee Structure
1. Update SystemSetting model if new fee types needed
2. Modify fee calculation logic in wallet actions
3. Update admin interface for fee configuration
4. Add database seeders for default settings

### Adding New User Roles
1. Create new role in database seeder
2. Define permissions for the role
3. Update middleware and route protection
4. Add role-specific views and navigation

### Testing Financial Operations
- Always test with small amounts first
- Verify balance calculations are correct
- Check transaction logs for completeness
- Test both success and failure scenarios
- Ensure atomic operations maintain data integrity

## PWA & Modern Features

### Progressive Web App (PWA)
The application is now a full PWA with:
- **Service Worker** (`/public/sw.js`): Handles caching, offline support, and background sync
- **App Manifest** (`/public/manifest.json`): Defines app metadata and installation behavior
- **Offline Page** (`/public/offline.html`): Custom offline experience with auto-retry
- **Install Prompt**: Users can install the app on their devices

### PWA Files Structure
```
/public/
├── manifest.json          # PWA manifest file
├── sw.js                 # Service worker for caching and offline support
├── offline.html          # Custom offline page
└── coreui-template/assets/favicon/  # App icons for all platforms
```

### Dark Mode Implementation
- All admin and member interfaces support dark mode
- Uses CSS variables for theme consistency
- Automatic theme persistence in localStorage
- Smooth transitions between light/dark themes

### Key UI Improvements
- **Consistent Spacing**: All wallet forms have proper padding (`mb-5` class)
- **Responsive Design**: Mobile-optimized interfaces
- **CoreUI Integration**: Modern component library with theme support
- **Icon Updates**: Updated maintenance icons and consistent iconography

## Deployment Configuration

### Hostinger Shared Hosting
- **Root .htaccess**: Redirects to `/public` folder with security headers
- **Security Headers**: HTTPS enforcement, file protection, directory browsing disabled
- **Asset Management**: Vite build process for production assets

### Production Checklist
1. Run `npm run build` for production assets
2. Ensure `.htaccess` is in root directory
3. Upload entire project maintaining folder structure
4. Configure database credentials in `.env`
5. Run `php artisan config:cache` and `php artisan route:cache`
6. Test PWA functionality on HTTPS

## Common UI Patterns

### Adding Dark Mode Support to New Pages
```css
/* Use CSS variables for theme compatibility */
[data-coreui-theme="dark"] .your-element {
    background-color: var(--cui-card-bg);
    color: var(--cui-body-color);
    border-color: var(--cui-border-color);
}
```

### Consistent Form Spacing
```html
<!-- Always add mb-5 to main form containers -->
<div class="card shadow-sm mb-5">
    <!-- Form content -->
</div>
```

### PWA Service Worker Updates
When adding new routes to cache, update the `CACHE_URLS` array in `/public/sw.js`:
```javascript
const CACHE_URLS = [
    '/',
    '/dashboard',
    '/your-new-route',  // Add new routes here
    // ... existing routes
];
```