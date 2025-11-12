# Tech Photo Solution - Deployment Guide

## Overview
This is a Progressive Web App (PWA) that allows field technicians to upload photos from their mobile devices directly to SharePoint folders. The application works on phones, tablets, and desktop computers.

## Features
- 📸 Mobile camera integration for instant photo capture
- 📁 SharePoint folder selection for organized uploads
- 🔐 Secure Microsoft authentication (Azure AD)
- 📱 Progressive Web App - installable on mobile devices
- 🔄 Multiple photo upload support
- 📊 Upload progress tracking
- 💾 Offline-capable with service worker

## Prerequisites

### 1. Azure AD App Registration
You need to register an application in Azure Active Directory to enable authentication:

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Fill in the details:
   - **Name**: Tech Photo Upload App
   - **Supported account types**: Accounts in any organizational directory
   - **Redirect URI**: 
     - Type: Single-page application (SPA)
     - URL: Your app URL (e.g., `https://yourdomain.com` or `http://localhost:8000` for testing)
5. Click **Register**
6. Note the **Application (client) ID** - you'll need this
7. Go to **API permissions**:
   - Click **Add a permission**
   - Select **Microsoft Graph**
   - Select **Delegated permissions**
   - Add these permissions:
     - `User.Read`
     - `Files.ReadWrite.All`
     - `Sites.ReadWrite.All`
   - Click **Add permissions**
   - Click **Grant admin consent** (requires admin rights)
8. Go to **Authentication**:
   - Under **Implicit grant and hybrid flows**, check:
     - Access tokens
     - ID tokens
   - Save

### 2. SharePoint Site
- You need a SharePoint site where photos will be uploaded
- Note the full URL (e.g., `https://yourtenant.sharepoint.com/sites/yoursite`)
- You should have a document library (default is "Shared Documents")
- Users must have permission to upload files to this site

## Installation & Setup

### Option 1: Deploy to a Web Server

1. **Upload all files** to your web server:
   - `index.html`
   - `app.js`
   - `styles.css`
   - `manifest.json`
   - `service-worker.js`
   - `icon-192.png`
   - `icon-512.png`

2. **Configure the app**:
   - Open `app.js` in a text editor
   - Find the line: `clientId: "YOUR_CLIENT_ID_HERE"`
   - Replace `YOUR_CLIENT_ID_HERE` with your Azure AD Application (client) ID
   - Save the file

3. **Configure HTTPS** (required for PWA features):
   - The app must be served over HTTPS (except localhost)
   - Most web hosting providers offer free SSL certificates

4. **Update Azure AD redirect URI**:
   - Go back to your Azure AD app registration
   - Under **Authentication**, ensure your production URL is listed as a redirect URI

### Option 2: Local Testing

1. **Update app.js** with your Client ID (as described above)

2. **Serve the app locally**:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Node.js http-server (install with: npm install -g http-server)
   http-server -p 8000
   ```

3. **Access the app**:
   - Open browser to: `http://localhost:8000`
   - Note: Some PWA features may not work over HTTP

4. **Add localhost to Azure AD**:
   - Add `http://localhost:8000` as a redirect URI in Azure AD

## User Guide

### For End Users (Field Technicians)

1. **First Time Setup**:
   - Open the app URL in your mobile browser (Safari on iOS, Chrome on Android)
   - Tap "Sign in with Microsoft"
   - Enter your work email and password
   - Approve the requested permissions
   - Configure SharePoint settings:
     - Expand "SharePoint Configuration"
     - Enter your SharePoint site URL
     - Enter the document library name (default: "Shared Documents")
     - Tap "Save Configuration"

2. **Installing as a Mobile App** (recommended):
   - **iOS (Safari)**:
     - Tap the Share button
     - Select "Add to Home Screen"
     - Tap "Add"
   - **Android (Chrome)**:
     - Tap the menu (3 dots)
     - Select "Add to Home screen"
     - Tap "Add"

3. **Uploading Photos**:
   - Open the app
   - Select destination folder from dropdown
   - Tap "Select or Capture Photo"
   - Choose "Take Photo" or "Photo Library"
   - Take/select one or multiple photos
   - Review the photos in the preview
   - Tap "Upload Photos"
   - Wait for confirmation message

4. **Managing Folders**:
   - The folder dropdown shows all folders in your SharePoint library
   - Select "Root folder" to upload to the main library
   - Tap the refresh icon (🔄) to reload folders if new ones were created

## Troubleshooting

### "Error initializing authentication"
- Check that the client ID in `app.js` is correct
- Verify the Azure AD app is configured properly
- Check browser console for detailed errors

### "Please configure SharePoint site URL"
- Expand the "SharePoint Configuration" section
- Enter the full SharePoint site URL
- Tap "Save Configuration"

### "Failed to access SharePoint site"
- Verify the SharePoint URL is correct
- Ensure you have permission to access the site
- Check that API permissions were granted in Azure AD

### "Document library not found"
- Verify the library name is correct (case-sensitive)
- Default is "Shared Documents"
- Check the library exists in your SharePoint site

### Photos not uploading
- Check your internet connection
- Verify you're signed in
- Ensure you selected a valid folder
- Check browser console for errors
- Verify file size isn't too large (SharePoint limits)

### App not installing on mobile
- Ensure the app is served over HTTPS
- Try accessing from Safari (iOS) or Chrome (Android)
- Clear browser cache and try again

## Security Considerations

1. **Authentication**: Uses Microsoft Azure AD with industry-standard OAuth 2.0
2. **Permissions**: Follows principle of least privilege - only requests necessary permissions
3. **HTTPS**: Should be deployed with SSL/TLS encryption
4. **Client-side only**: No server-side component means no additional security vulnerabilities
5. **Token storage**: Uses secure localStorage for token caching

## Technical Details

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Authentication**: MSAL.js (Microsoft Authentication Library)
- **API**: Microsoft Graph API
- **PWA**: Service Workers, Web App Manifest

### Browser Compatibility
- **Modern browsers**: Chrome, Safari, Firefox, Edge (latest versions)
- **Mobile**: iOS 11.3+, Android 5.0+
- **Features**: Camera API, File API, Service Workers

### API Endpoints Used
- Microsoft Graph API v1.0
- SharePoint sites and files endpoints
- Authentication through Azure AD

## Support & Maintenance

### Updating the App
1. Update the files on your web server
2. Increment the cache version in `service-worker.js` (e.g., `tech-photo-upload-v2`)
3. Users will automatically get the update on next visit

### Monitoring
- Check browser console for errors
- Review Azure AD sign-in logs for authentication issues
- Monitor SharePoint storage usage

### Common Admin Tasks
- Adding/removing users: Manage in Azure AD
- Changing permissions: Update in SharePoint or Azure AD app
- Creating new folders: Use SharePoint interface

## License
This application is provided as-is for organizational use.

## Contact
For technical issues or questions, contact your IT administrator.
