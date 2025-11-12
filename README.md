# Tech Photo Solution

A Progressive Web App (PWA) that enables field technicians to upload photos from their mobile devices directly to SharePoint folders.

## 📱 Features

- **Mobile-First Design**: Optimized for phones and tablets
- **Camera Integration**: Capture photos directly from mobile camera
- **SharePoint Integration**: Upload to specific folders in SharePoint document libraries
- **Secure Authentication**: Microsoft Azure AD authentication
- **Offline-Ready**: PWA capabilities for reliable mobile experience
- **Batch Upload**: Upload multiple photos at once
- **Progress Tracking**: Visual feedback during uploads

## 🚀 Quick Start

1. **Deploy the app** to a web server (HTTPS required)
2. **Register an Azure AD app** for authentication
3. **Configure** the client ID in `app.js`
4. **Access** from any mobile device browser
5. **Install** as a mobile app for quick access

## 📚 Documentation

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed setup instructions, including:
- Azure AD app registration steps
- SharePoint configuration
- Local testing guide
- User instructions
- Troubleshooting tips

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Authentication**: MSAL.js (Microsoft Authentication Library)
- **API**: Microsoft Graph API for SharePoint access
- **PWA**: Service Workers, Web App Manifest

## 📋 Requirements

- SharePoint Online site with document library
- Azure AD app registration
- Modern web browser (Chrome, Safari, Firefox, Edge)
- HTTPS hosting (for production)

## 🔐 Security

- OAuth 2.0 authentication via Azure AD
- Secure token storage
- HTTPS encryption
- Permission-based access control

## 📄 Files Included

- `index.html` - Main application interface
- `app.js` - Application logic and SharePoint integration
- `styles.css` - Mobile-responsive styling
- `manifest.json` - PWA manifest
- `service-worker.js` - Offline capabilities
- `icon-192.png`, `icon-512.png` - App icons
- `DEPLOYMENT.md` - Comprehensive setup guide

## 🎯 Use Case

Field technicians can:
1. Open the app on their mobile device
2. Sign in with their work credentials
3. Select the appropriate SharePoint folder
4. Capture or select photos
5. Upload directly to SharePoint
6. Continue working offline if needed

## 📞 Support

For setup assistance, see DEPLOYMENT.md or contact your IT administrator.
