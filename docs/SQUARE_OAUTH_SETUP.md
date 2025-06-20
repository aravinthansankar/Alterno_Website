# Square OAuth Integration Setup

This document explains how to set up Square OAuth integration for the VOICE-WEB application.

## Overview

The Square OAuth flow follows the standard OAuth 2.0 authorization code flow:

1. **Frontend**: User clicks "Connect" → Redirects to Square OAuth
2. **Square**: User authorizes → Redirects back with authorization code
3. **Backend**: Exchanges code for access/refresh tokens
4. **Frontend**: Stores tokens and marks integration as complete

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Square OAuth Configuration
NEXT_PUBLIC_SQUARE_CLIENT_ID=your_square_client_id_here
SQUARE_CLIENT_SECRET=your_square_client_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Square Developer Console Setup

1. Go to [Square Developer Console](https://developer.squareup.com/apps)
2. Create a new application or use an existing one
3. Navigate to "OAuth" in the left sidebar
4. Add your redirect URI: `http://localhost:3000/oauth/square/callback` (for development)
5. Copy your **Application ID** (this is your `NEXT_PUBLIC_SQUARE_CLIENT_ID`)
6. Copy your **Application Secret** (this is your `SQUARE_CLIENT_SECRET`)

## OAuth Scopes

The application requests these Square OAuth scopes:

- `APPOINTMENTS_READ` - Read appointment data
- `APPOINTMENTS_WRITE` - Create and update appointments
- `APPOINTMENTS_ALL_READ` - Read all appointment data
- `APPOINTMENTS_BUSINESS_SETTINGS_READ` - Read business settings
- `CUSTOMERS_READ` - Read customer information
- `CUSTOMERS_WRITE` - Create and update customers

## Implementation Details

### Frontend Components

1. **SquareLoginStep** (`components/onboarding/steps/SquareLoginStep.tsx`)
   - Initiates OAuth flow
   - Handles connection status
   - Manages disconnect functionality

2. **OAuth Callback** (`app/oauth/square/callback/page.tsx`)
   - Handles OAuth response
   - Exchanges code for tokens
   - Stores tokens securely

### Backend API Routes

1. **Token Exchange** (`app/api/square/exchange-token/route.ts`)
   - Exchanges authorization code for tokens
   - Returns access token, refresh token, and merchant ID

2. **Token Refresh** (`app/api/square/refresh-token/route.ts`)
   - Refreshes expired access tokens
   - Uses refresh token to get new access token

### Utility Classes

1. **SquareTokenManager** (`lib/square/tokenManager.ts`)
   - Manages token storage and retrieval
   - Handles token expiration checks
   - Provides connection status

2. **SquareApi** (`lib/square/api.ts`)
   - Makes authenticated API calls to Square
   - Automatically handles token refresh
   - Provides methods for common Square operations

## Security Considerations

1. **CSRF Protection**: Uses random state parameter to prevent CSRF attacks
2. **Token Storage**: Tokens are stored in localStorage (consider server-side storage for production)
3. **Token Refresh**: Automatic token refresh when expired
4. **Error Handling**: Comprehensive error handling throughout the flow

## Testing the Integration

### Sandbox Testing (Important!)

**⚠️ CRITICAL STEP FOR SANDBOX TESTING:**

Before testing the OAuth flow in Sandbox, you MUST:

1. Go to [Square Developer Console](https://developer.squareup.com/apps)
2. Navigate to your application → **Sandbox** section
3. Click **"Create Test Account"** or use an existing one
4. **Launch the test account** by clicking on it (opens Sandbox Square Dashboard)
5. **Keep the Sandbox Dashboard open** in a separate browser tab/window
6. **Then** test your OAuth flow

**Why this is required:** Square Sandbox doesn't allow direct sign-in to the authorization page. You must have an active Sandbox test account session.

### Testing Steps

1. Start your development server: `npm run dev`
2. **Launch a Sandbox test account** (see above)
3. Navigate to the onboarding flow
4. Click "Login with Square" on the Square integration step
5. Complete the Square OAuth flow
6. Verify tokens are stored and connection status is updated

### Alternative: Quick Token Generation

If you don't need to test the full OAuth flow:

1. Go to Square Developer Console → **Sandbox** → **Test Accounts**
2. Select a test account
3. Click **"Generate Access Token"**
4. Choose the permissions you need
5. Copy the generated token for testing

## Production Deployment

For production deployment:

1. Update `NEXT_PUBLIC_APP_URL` to your production domain
2. Update the redirect URI in Square Developer Console
3. Switch from `squareupsandbox.com` to `squareup.com` URLs
4. Consider implementing server-side token storage
5. Add proper error logging and monitoring
6. Implement token revocation on user logout

## Troubleshooting

### Common Issues

1. **"To start the OAuth flow for a sandbox account, first launch the seller test account"**
   - **Solution**: Launch a Sandbox test account from Developer Console first
   - Keep the Sandbox Dashboard open while testing OAuth

2. **"Invalid redirect URI"**
   - Ensure redirect URI in Square Developer Console matches exactly
   - Check `NEXT_PUBLIC_APP_URL` environment variable

3. **"Missing required OAuth parameters"**
   - Verify all environment variables are set
   - Check browser console for errors

4. **"Failed to exchange token"**
   - Verify `SQUARE_CLIENT_SECRET` is correct
   - Check Square Developer Console for application status

5. **"Invalid state parameter"**
   - Clear browser storage and try again
   - Check for multiple browser tabs with OAuth flow

### Debug Mode

Enable debug logging by adding to your environment:

```bash
DEBUG_SQUARE_OAUTH=true
```

This will log detailed information about the OAuth flow for debugging purposes.

## API Usage Examples

Once connected, you can use the Square API:

```typescript
import { SquareApi } from '@/lib/square/api';

// Get merchant information
const merchant = await SquareApi.getMerchant();

// Get locations
const locations = await SquareApi.getLocations();

// Get catalog items
const items = await SquareApi.getCatalogItems();

// Test connection
const isConnected = await SquareApi.testConnection();
```

## Next Steps

1. Implement server-side token storage
2. Add Square webhook handling
3. Implement Square-specific features (payments, orders, etc.)
4. Add comprehensive error handling and user feedback
5. Implement token revocation on user logout 