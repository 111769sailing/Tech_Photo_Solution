# Quick Start Guide

Get your Tech Photo Upload app running in 5 steps!

## Step 1: Register Azure AD App (5 minutes)

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** → **App registrations** → **New registration**
3. Fill in:
   - Name: `Tech Photo Upload`
   - Supported accounts: `Accounts in any organizational directory`
   - Redirect URI: `Single-page application (SPA)` → Your app URL
4. Click **Register** and copy the **Application (client) ID**
5. Go to **API permissions** → **Add a permission** → **Microsoft Graph** → **Delegated**
6. Add: `User.Read`, `Files.ReadWrite.All`, `Sites.ReadWrite.All`
7. Click **Grant admin consent**

## Step 2: Configure the App (2 minutes)

1. Open `app.js` in a text editor
2. Find line 3: `clientId: "YOUR_CLIENT_ID_HERE"`
3. Replace with your Client ID: `clientId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"`
4. Save the file

## Step 3: Deploy to Web Server (3 minutes)

Upload all files to your HTTPS web server:
- `index.html`
- `app.js` (with your Client ID)
- `styles.css`
- `manifest.json`
- `service-worker.js`
- `icon-192.png`
- `icon-512.png`

**Testing locally?** Run: `python3 -m http.server 8000` and use `http://localhost:8000`

## Step 4: Configure SharePoint (1 minute)

1. Open the app in a browser
2. Click **Sign in with Microsoft**
3. Sign in with your work account
4. Expand **SharePoint Configuration**
5. Enter your SharePoint site URL (e.g., `https://contoso.sharepoint.com/sites/FieldOps`)
6. Enter library name (default: `Shared Documents`)
7. Click **Save Configuration**

## Step 5: Test Upload (1 minute)

1. Select a folder from the dropdown
2. Click **Select or Capture Photo**
3. Choose a test photo
4. Click **Upload Photos**
5. Check SharePoint to verify the upload

## Done! 🎉

Your field technicians can now:
- Open the app on their mobile device
- Sign in with their work account
- Capture photos with their camera
- Upload directly to SharePoint folders

## Mobile Installation (Optional)

**iPhone/iPad:**
1. Open in Safari
2. Tap Share button → **Add to Home Screen**

**Android:**
1. Open in Chrome
2. Tap menu (⋮) → **Add to Home screen**

## Need Help?

- **Full Setup Guide**: See `DEPLOYMENT.md`
- **Configuration Examples**: See `CONFIG_TEMPLATE.md`
- **Testing Checklist**: See `TESTING.md`
- **Issues?**: Check the Troubleshooting section in `DEPLOYMENT.md`

## Common First-Time Issues

### "Error initializing authentication"
→ Check that Client ID is correct in `app.js`

### "Failed to access SharePoint site"
→ Verify the SharePoint URL format and user permissions

### "AADSTS50011: Redirect URI mismatch"
→ Add your URL to Azure AD app redirect URIs

### Camera not working on mobile
→ App must be served over HTTPS (except localhost)
