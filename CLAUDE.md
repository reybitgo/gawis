# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Laravel 12 E-Wallet System - a digital wallet application for managing financial transactions with admin controls and user interfaces. The system uses Laravel Fortify for authentication and Spatie Laravel Permission for role-based access control.

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