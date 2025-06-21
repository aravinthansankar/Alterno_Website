# Firebase Admin SDK Setup Guide

This guide explains how to set up Firebase Admin SDK for secure server-side authentication and token management.

## Why Firebase Admin SDK?

Firebase Admin SDK provides server-side authentication capabilities that are essential for:
- Secure token storage and management
- Server-side user verification
- Database access with elevated privileges
- OAuth token security

## Setup Steps

### 1. Generate Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** (gear icon)
4. Click on **Service accounts** tab
5. Click **Generate new private key**
6. Download the JSON file
7. Save it as `serviceAccountKey.json` in your project root

### 2. Environment Variables

Add these environment variables to your `.env.local`:

```bash
# Firebase Admin SDK (Production)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"

# Development (optional - uses serviceAccountKey.json)
NODE_ENV=development
```

### 3. Service Account Key File (Development)

For development, place the downloaded `serviceAccountKey.json` in your project root:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com"
}
```

### 4. Security Rules

Update your Firestore security rules to allow service account access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow service account full access
    match /{document=**} {
      allow read, write: if request.auth != null && 
        (request.auth.token.firebase.sign_in_provider == 'google.com' || 
         request.auth.token.iss == 'https://securetoken.google.com/your-project-id');
    }
  }
}
```

## Production Deployment

### Vercel

1. Add environment variables in Vercel dashboard:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`

2. Make sure to escape newlines in `FIREBASE_PRIVATE_KEY`:
   ```
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
   ```

### Railway

1. Add environment variables in Railway dashboard
2. Same format as Vercel

### Other Platforms

Follow the same pattern for other deployment platforms.

## Security Best Practices

### 1. Never Commit Service Account Keys

Add to `.gitignore`:
```gitignore
# Firebase Admin SDK
serviceAccountKey.json
```

### 2. Use Environment Variables in Production

Never use service account key files in production. Always use environment variables.

### 3. Restrict Service Account Permissions

In Google Cloud Console:
1. Go to IAM & Admin > IAM
2. Find your service account
3. Grant only necessary permissions:
   - Firebase Admin SDK Administrator Service Agent
   - Cloud Datastore User

### 4. Rotate Keys Regularly

- Generate new service account keys periodically
- Update environment variables
- Delete old keys

## Testing the Setup

### 1. Test Authentication

```typescript
import { adminAuth } from '@/lib/firebaseAdmin';

// Test user verification
const decodedToken = await adminAuth.verifyIdToken(userIdToken);
console.log('User verified:', decodedToken.uid);
```

### 2. Test Database Access

```typescript
import { adminDb } from '@/lib/firebaseAdmin';

// Test database write
await adminDb.collection('test').doc('test').set({
  test: 'data',
  timestamp: FieldValue.serverTimestamp(),
});
```

### 3. Test Token Management

```typescript
import { ServerTokenManager } from '@/lib/square/serverTokenManager';

// Test token storage
await ServerTokenManager.storeTokens(userId, {
  access_token: 'test',
  refresh_token: 'test',
  merchant_id: 'test',
  expires_at: new Date().toISOString(),
});
```

## Troubleshooting

### Common Issues

1. **"Invalid private key"**
   - Check that newlines are properly escaped in environment variables
   - Verify the private key format

2. **"Permission denied"**
   - Check Firestore security rules
   - Verify service account permissions

3. **"Service account not found"**
   - Verify the service account email is correct
   - Check that the service account exists in your project

### Debug Mode

Enable debug logging:

```typescript
// In firebaseAdmin.ts
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase Admin SDK initialized with service account');
}
```

## Migration from Client-Side

If you're migrating from client-side token storage:

1. **Backup existing tokens** (if needed)
2. **Update API routes** to use server-side authentication
3. **Remove client-side token storage**
4. **Test thoroughly** before deploying

## Next Steps

1. Implement token encryption for database storage
2. Add token rotation policies
3. Set up monitoring and alerting
4. Implement token revocation on user logout 