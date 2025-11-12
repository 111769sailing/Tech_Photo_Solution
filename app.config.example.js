// =============================================================================
// CONFIGURATION INSTRUCTIONS
// =============================================================================
// 
// 1. Replace YOUR_CLIENT_ID_HERE with your Azure AD Application (client) ID
// 2. Save this file
// 3. Deploy to your web server
//
// Example:
// clientId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
//
// To get your Client ID:
// 1. Go to https://portal.azure.com
// 2. Navigate to Azure Active Directory > App registrations
// 3. Select your app (or create a new one)
// 4. Copy the "Application (client) ID"
//
// For detailed setup instructions, see DEPLOYMENT.md or QUICKSTART.md
// =============================================================================

// Configuration
const msalConfig = {
    auth: {
        clientId: "YOUR_CLIENT_ID_HERE", // ⬅️ REPLACE THIS
        authority: "https://login.microsoftonline.com/common",
        redirectUri: window.location.origin
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    }
};

// =============================================================================
// DO NOT MODIFY BELOW THIS LINE
// =============================================================================
