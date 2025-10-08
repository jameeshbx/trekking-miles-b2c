# Database Migration Guide

## Reset Prisma Migrations and Setup Authentication

Follow these steps to reset your database and apply the new authentication schema:

### 1. Backup your current data (if needed)

If you have important data in your database, export it first.

### 2. Delete existing migrations

```bash
rm -rf prisma/migrations
```

### 3. Reset the database

```bash
yarn prisma migrate reset --force
```

### 4. Create new migration

```bash
yarn prisma migrate dev --name init_auth
```

### 5. Generate Prisma Client

```bash
yarn prisma generate
```

### 6. (Optional) Seed the database

Create an admin user by running:

```bash
yarn prisma db seed
```

## Environment Variables

Create a `.env` file in your project root with these variables:

```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/trekkingmiles?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Configuration (for password reset)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="noreply@trekkingmiles.com"
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google
   - https://yourdomain.com/api/auth/callback/google

## Testing

After setup, you can:

1. Register a new user at `/auth/signup`
2. Sign in at `/auth/signin`
3. Test forgot password at `/auth/forgot-password`
4. Access role-specific routes based on your user role

## Test Credentials (if you run the seed script)

- **Admin**: admin@trekkingmiles.com / Admin@123456
- **Service Provider**: provider@trekkingmiles.com / ServiceProvider@123
- **User**: user@trekkingmiles.com / User@123456
