# Troubleshooting Guide

Common issues and their solutions for Tech Photo Upload app.

## Authentication Issues

### "Error initializing authentication" or "MSAL is not defined"

**Symptoms**: Error message on app load, sign-in button doesn't work

**Causes**:
- MSAL library blocked by ad blocker or privacy extension
- Client ID not configured correctly
- Network connectivity issues

**Solutions**:
1. Check browser console for specific error message
2. Verify `app.js` has correct Client ID (not "YOUR_CLIENT_ID_HERE")
3. Disable ad blockers/privacy extensions temporarily
4. Try a different browser
5. Check internet connection
6. Verify MSAL CDN is accessible: `https://alcdn.msauth.net/browser/2.38.1/js/msal-browser.min.js`

### "AADSTS50011: Redirect URI mismatch"

**Symptoms**: Error after clicking sign-in, redirected to error page

**Cause**: The URL you're accessing the app from is not registered in Azure AD

**Solution**:
1. Note the exact URL you're using (e.g., `https://photos.contoso.com`)
2. Go to Azure Portal → Azure AD → App registrations → Your app
3. Click **Authentication**
4. Under **Single-page application**, click **Add URI**
5. Enter your exact URL (no trailing slash)
6. Click **Save**
7. Try signing in again

### "AADSTS65001: Consent required" or "AADSTS65005: Invalid scope"

**Symptoms**: Error during sign-in, mentions consent or permissions

**Cause**: API permissions not granted or admin consent not provided

**Solution**:
1. Go to Azure Portal → Azure AD → App registrations → Your app
2. Click **API permissions**
3. Verify these permissions are listed:
   - Microsoft Graph > User.Read
   - Microsoft Graph > Files.ReadWrite.All
   - Microsoft Graph > Sites.ReadWrite.All
4. Click **Grant admin consent for [Your Organization]**
5. Confirm the action
6. Wait a few minutes for changes to propagate
7. Try signing in again

### User signed in but name not showing

**Symptoms**: Authentication succeeds but UI doesn't update

**Cause**: JavaScript error preventing UI update

**Solution**:
1. Check browser console for errors
2. Refresh the page (Ctrl+R / Cmd+R)
3. Clear browser cache and cookies
4. Try signing out and signing in again

## SharePoint Configuration Issues

### "Please configure SharePoint site URL"

**Symptoms**: Cannot load folders, message to configure SharePoint

**Cause**: SharePoint configuration not saved

**Solution**:
1. Expand **SharePoint Configuration** section
2. Enter complete SharePoint site URL (e.g., `https://contoso.sharepoint.com/sites/FieldOps`)
3. Enter document library name (default: `Shared Documents`)
4. Click **Save Configuration**
5. Verify success message appears

### "Failed to access SharePoint site"

**Symptoms**: Folders fail to load, error message about site access

**Causes**:
- Incorrect SharePoint URL format
- User lacks permissions to the site
- Site doesn't exist or is private
- API permissions not granted

**Solutions**:
1. **Verify URL format**:
   - Correct: `https://contoso.sharepoint.com/sites/sitename`
   - Incorrect: `https://contoso.sharepoint.com/sites/sitename/`
   - Incorrect: `https://contoso-my.sharepoint.com/personal/user`
2. **Check permissions**:
   - Open SharePoint site in browser
   - Verify you can access it
   - Ensure you have at least "Contribute" permissions
3. **Verify API permissions** in Azure AD (see above)
4. **Try different site**: Test with a site you definitely have access to

### "Document library 'X' not found"

**Symptoms**: Specific error about library not being found

**Causes**:
- Library name is incorrect or misspelled
- Library doesn't exist
- Library name is case-sensitive

**Solutions**:
1. Open SharePoint site in browser
2. Go to **Site contents**
3. Find the document library you want to use
4. Note the exact name (including spaces and capitalization)
5. Common names: `Shared Documents`, `Documents`, `Field Photos`
6. Update library name in app configuration
7. Click **Save Configuration**
8. Click refresh button (🔄) next to folder dropdown

### Folders not loading or dropdown empty

**Symptoms**: Folder dropdown shows "Loading folders..." or "Error loading folders"

**Causes**:
- No folders exist in the library
- User lacks permissions
- Network error

**Solutions**:
1. Open SharePoint in browser and verify folders exist
2. Create at least one test folder if none exist
3. Click the refresh button (🔄) next to folder dropdown
4. Check browser console for error details
5. Verify internet connection
6. Sign out and sign back in

## Photo Upload Issues

### Upload button disabled

**Symptoms**: Cannot click "Upload Photos" button

**Cause**: No photos selected or requirements not met

**Solution**:
1. Ensure you're signed in
2. Select at least one photo using "Select or Capture Photo"
3. Verify photos appear in preview grid
4. Button should enable automatically

### "Please select at least one photo to upload"

**Symptoms**: Warning message when clicking upload

**Cause**: File input was cleared or no files selected

**Solution**:
1. Click "Select or Capture Photo" again
2. Choose one or more photos
3. Verify they appear in preview
4. Try upload again

### Photos selected but not uploading

**Symptoms**: Click upload but nothing happens

**Causes**:
- JavaScript error
- Network disconnected
- File too large
- Permissions issue

**Solutions**:
1. Check browser console for errors
2. Verify internet connection
3. Try with smaller photo files first
4. Check SharePoint storage quota
5. Verify you selected a valid folder
6. Try refreshing the page and trying again

### Upload starts but fails partway through

**Symptoms**: Progress bar shows, then error message

**Causes**:
- Network interruption
- SharePoint throttling
- File size limit exceeded
- Permissions changed during upload

**Solutions**:
1. Check internet connection stability
2. Try uploading fewer photos at once
3. Verify file sizes aren't too large (SharePoint typically allows up to 250GB, but may be configured lower)
4. Wait a few minutes and try again (throttling)
5. Check browser console for specific error
6. Try different network/WiFi

### Photos upload but don't appear in SharePoint

**Symptoms**: Success message shown but files not visible

**Causes**:
- Uploaded to different folder than expected
- SharePoint view filters hiding files
- Need to refresh SharePoint

**Solutions**:
1. Refresh SharePoint page (F5)
2. Check you're viewing the correct folder
3. Check "Root folder" if no folder was selected
4. Clear SharePoint filters/sorting
5. Check file name matches what you uploaded
6. Try uploading a test file with unique name

## Mobile-Specific Issues

### Camera not working

**Symptoms**: Cannot access camera on mobile device

**Causes**:
- App not served over HTTPS
- Camera permissions denied
- Browser doesn't support camera API

**Solutions**:
1. Verify app is served over HTTPS (required for camera)
2. Check browser permissions: Settings → Site Settings → Camera
3. Grant camera permission when prompted
4. Try a different browser (Chrome on Android, Safari on iOS recommended)
5. Restart browser and try again

### App not responsive on mobile

**Symptoms**: Layout broken, hard to use on phone

**Causes**:
- Viewport meta tag issue
- Browser compatibility
- CSS loading failure

**Solutions**:
1. Try rotating device (portrait/landscape)
2. Refresh page
3. Clear browser cache
4. Try different mobile browser
5. Check browser console for CSS loading errors

### Cannot install app on home screen

**Symptoms**: No "Add to Home Screen" option

**Causes**:
- Not served over HTTPS
- Manifest.json not loading
- Browser doesn't support PWA

**Solutions**:
1. **iOS (Safari)**:
   - Tap Share button (box with arrow)
   - Scroll down to "Add to Home Screen"
   - Must use Safari (not Chrome)
2. **Android (Chrome)**:
   - Tap menu (⋮)
   - Tap "Add to Home screen"
   - Or wait for automatic install prompt
3. Verify app is served over HTTPS
4. Check manifest.json is loading (DevTools → Network)

## Performance Issues

### Slow folder loading

**Symptoms**: Takes long time to load folders

**Causes**:
- Many folders in library
- Slow network connection
- SharePoint throttling

**Solutions**:
1. Be patient - large libraries take time
2. Check internet connection speed
3. Consider organizing SharePoint with fewer folders
4. Use wired connection if available

### Upload taking too long

**Symptoms**: Photos uploading very slowly

**Causes**:
- Large file sizes
- Slow network connection
- Multiple photos at once

**Solutions**:
1. Upload fewer photos at a time
2. Check internet connection speed
3. Consider compressing photos before upload
4. Use better network/WiFi if available
5. Be patient with large files

## Configuration Issues

### Settings not saving

**Symptoms**: Configuration resets on page refresh

**Causes**:
- Browser localStorage disabled
- Private browsing mode
- Browser settings

**Solutions**:
1. Check if using private/incognito mode
2. Enable localStorage in browser settings
3. Try different browser
4. Clear browser data and try again

### Lost configuration after browser update

**Symptoms**: Need to reconfigure after browser update

**Cause**: Browser cache/storage cleared during update

**Solution**:
1. Re-enter SharePoint configuration
2. Click Save Configuration
3. Keep configuration details in a safe place for reference

## General Troubleshooting Steps

### Step 1: Check Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for red error messages
4. Note the error details

### Step 2: Verify Prerequisites
- [ ] Azure AD app registered and configured
- [ ] Client ID updated in app.js
- [ ] API permissions granted
- [ ] SharePoint site accessible
- [ ] User has appropriate permissions
- [ ] App served over HTTPS (production)

### Step 3: Test Basic Functionality
1. Can you access the app URL?
2. Does the page load?
3. Can you click sign-in?
4. Does authentication work?
5. Can you access SharePoint in browser?

### Step 4: Try Clean Slate
1. Sign out of the app
2. Clear browser cache and cookies
3. Close browser completely
4. Open browser and try again
5. Sign in fresh

### Step 5: Test Different Environment
1. Try different browser
2. Try different device
3. Try different network
4. Try incognito/private mode

## Getting More Help

If issues persist:

1. **Check browser console** for detailed error messages
2. **Review documentation**:
   - DEPLOYMENT.md for setup details
   - CONFIG_TEMPLATE.md for configuration examples
   - TESTING.md for validation steps
3. **Verify configuration**:
   - Azure AD app settings
   - SharePoint permissions
   - Client ID correctness
4. **Contact IT administrator** with:
   - Exact error message
   - Browser console output
   - Steps to reproduce
   - Screenshots if applicable

## Known Limitations

1. **File size**: Limited by SharePoint (typically 250GB max)
2. **Concurrent uploads**: Many simultaneous uploads may be throttled
3. **Browser support**: Requires modern browser with ES6+ support
4. **Offline**: Can't upload without internet connection
5. **Camera API**: HTTPS required except on localhost
6. **Private browsing**: Settings won't persist
7. **Ad blockers**: May block MSAL library

## Error Code Reference

| Error Code | Meaning | Solution |
|------------|---------|----------|
| AADSTS50011 | Redirect URI mismatch | Add URL to Azure AD |
| AADSTS65001 | Consent required | Grant admin consent |
| AADSTS65005 | Invalid scope | Check API permissions |
| 401 | Unauthorized | Check permissions |
| 403 | Forbidden | User lacks access |
| 404 | Not found | Check URL/library name |
| 429 | Too many requests | Wait and retry |
| 500 | Server error | SharePoint issue, retry |

## Quick Diagnostic Checklist

- [ ] App loads without errors
- [ ] Sign-in button appears
- [ ] Can sign in successfully
- [ ] User name displays after sign-in
- [ ] Configuration section accessible
- [ ] SharePoint URL saved successfully
- [ ] Folders load in dropdown
- [ ] Can select photos
- [ ] Photos appear in preview
- [ ] Upload button enables
- [ ] Progress shows during upload
- [ ] Success message appears
- [ ] Photos visible in SharePoint

If all items check, system is working correctly!
