# Configuration Template

## Azure AD Configuration

### Application (Client) ID
Replace in `app.js` line 3:
```javascript
clientId: "YOUR_CLIENT_ID_HERE"
```

Example:
```javascript
clientId: "12345678-1234-1234-1234-123456789012"
```

### Redirect URI
Add to Azure AD app registration > Authentication:
- Production: `https://yourdomain.com`
- Development: `http://localhost:8000`

### API Permissions Required
In Azure AD app registration > API permissions:
- Microsoft Graph > Delegated permissions:
  - User.Read
  - Files.ReadWrite.All
  - Sites.ReadWrite.All

## SharePoint Configuration

### SharePoint Site URL
Example formats:
- `https://contoso.sharepoint.com/sites/FieldOps`
- `https://contoso.sharepoint.com/sites/TechSupport`

### Document Library Name
Default: `Shared Documents`

Common alternatives:
- `Documents`
- `Field Photos`
- `Tech Reports`

## Example Configuration

For a company called "Contoso" with a field operations site:

**Azure AD App:**
- Application ID: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
- Redirect URI: `https://fieldphotos.contoso.com`
- Tenant: `contoso.onmicrosoft.com`

**SharePoint:**
- Site URL: `https://contoso.sharepoint.com/sites/FieldOperations`
- Library: `Shared Documents`
- Folders: `TechA`, `TechB`, `TechC`, `Equipment`, `Installations`

## User Configuration Steps

1. Open the app in a browser
2. Sign in with Microsoft
3. Click "SharePoint Configuration" section
4. Enter SharePoint Site URL: `https://contoso.sharepoint.com/sites/FieldOperations`
5. Enter Document Library Name: `Shared Documents`
6. Click "Save Configuration"
7. The folder dropdown will populate with available folders

## Testing Configuration

### Verify Azure AD:
1. Can sign in successfully
2. See welcome message with your name
3. No authentication errors

### Verify SharePoint:
1. Folders load in dropdown
2. Can select a folder
3. Can upload a test photo
4. Photo appears in SharePoint

## Troubleshooting

### Azure AD Issues
- **Error**: "AADSTS50011: Redirect URI mismatch"
  - **Fix**: Add your exact URL to Azure AD redirect URIs

- **Error**: "AADSTS65001: Consent required"
  - **Fix**: Admin must grant consent to API permissions

### SharePoint Issues
- **Error**: "Failed to access SharePoint site"
  - **Fix**: Check URL format and spelling
  - **Fix**: Verify user has permissions to the site

- **Error**: "Document library not found"
  - **Fix**: Check library name (case-sensitive)
  - **Fix**: Verify library exists in SharePoint

## Security Best Practices

1. **Never commit the configured `app.js` with real client ID to public repositories**
2. **Use HTTPS in production** (required for PWA features)
3. **Limit Azure AD app permissions** to only what's needed
4. **Review SharePoint permissions** regularly
5. **Enable MFA** for user accounts
6. **Monitor sign-in logs** in Azure AD

## Production Deployment Checklist

- [ ] Azure AD app created and configured
- [ ] Client ID updated in `app.js`
- [ ] Redirect URIs added for all environments
- [ ] API permissions granted and consented
- [ ] SharePoint site accessible to users
- [ ] Document library created
- [ ] Folders created in SharePoint
- [ ] App files uploaded to web server
- [ ] HTTPS/SSL configured
- [ ] App tested from mobile device
- [ ] Documentation shared with users
- [ ] Support contact information provided
