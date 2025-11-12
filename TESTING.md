# Testing Guide

## Manual Testing Checklist

### Pre-requisites
- [ ] Azure AD app is configured
- [ ] Client ID is set in `app.js`
- [ ] SharePoint site is accessible
- [ ] App is deployed to HTTPS server (or localhost for dev)

### Authentication Tests
- [ ] Navigate to the app URL
- [ ] Click "Sign in with Microsoft" button
- [ ] Verify redirect to Microsoft login page
- [ ] Sign in with valid credentials
- [ ] Verify redirect back to app
- [ ] Verify user name is displayed
- [ ] Verify "Sign Out" button is visible
- [ ] Click "Sign Out" and verify return to sign-in state

### Configuration Tests
- [ ] Expand "SharePoint Configuration" section
- [ ] Enter valid SharePoint site URL
- [ ] Enter document library name
- [ ] Click "Save Configuration"
- [ ] Verify success message appears
- [ ] Refresh page and verify configuration is retained (localStorage)

### Folder Loading Tests
- [ ] After signing in and configuring SharePoint
- [ ] Verify folders load in dropdown automatically
- [ ] Verify "Root folder" option is present
- [ ] Verify all folders from SharePoint library are listed
- [ ] Click refresh button (🔄) next to folder dropdown
- [ ] Verify folders reload

### Photo Selection Tests
- [ ] Click "Select or Capture Photo" button
- [ ] On mobile: Verify camera option appears
- [ ] Select one photo
- [ ] Verify photo appears in preview grid
- [ ] Verify "Upload Photos" button is enabled
- [ ] Click "Select or Capture Photo" again
- [ ] Select multiple photos
- [ ] Verify all photos appear in preview
- [ ] Click "×" button on a photo preview
- [ ] Verify photo is removed from selection

### Upload Tests
- [ ] Select destination folder from dropdown
- [ ] Select one or more photos
- [ ] Click "Upload Photos" button
- [ ] Verify progress bar appears
- [ ] Verify progress updates during upload
- [ ] Verify success message appears
- [ ] Open SharePoint in browser
- [ ] Navigate to selected folder
- [ ] Verify photos were uploaded successfully
- [ ] Verify file names match original photos

### Error Handling Tests
- [ ] Try uploading without selecting photos - verify warning
- [ ] Try uploading without SharePoint configuration - verify error
- [ ] Try uploading without signing in - verify authentication prompt
- [ ] Enter invalid SharePoint URL - verify error message
- [ ] Select non-existent library name - verify error message
- [ ] Test with network disconnected - verify appropriate error

### Mobile-Specific Tests
- [ ] Open app on iOS device (iPhone/iPad)
- [ ] Verify responsive layout
- [ ] Tap "Select or Capture Photo"
- [ ] Verify camera opens
- [ ] Capture photo directly
- [ ] Verify photo appears in preview
- [ ] Test on Android device
- [ ] Test portrait and landscape orientations
- [ ] Install app to home screen (iOS: Share > Add to Home Screen)
- [ ] Launch from home screen
- [ ] Verify app opens in standalone mode

### PWA Tests
- [ ] Open app in supported browser
- [ ] Check browser console for service worker registration
- [ ] Refresh page - verify loads from cache
- [ ] Open DevTools > Application > Service Workers
- [ ] Verify service worker is active
- [ ] Test offline mode (DevTools > Network > Offline)
- [ ] Verify app UI still loads (cached)
- [ ] Note: Authentication and uploads require network

### Cross-Browser Tests
- [ ] Test in Chrome (Desktop & Mobile)
- [ ] Test in Safari (Desktop & Mobile)
- [ ] Test in Firefox
- [ ] Test in Edge
- [ ] Verify consistent behavior across all browsers

### Performance Tests
- [ ] Upload 1 photo - time the operation
- [ ] Upload 5 photos simultaneously
- [ ] Upload 10 photos simultaneously
- [ ] Upload large photo files (>5MB)
- [ ] Verify progress indication is accurate
- [ ] Check for memory leaks with multiple uploads

## Automated Testing (Optional)

For organizations that want automated testing, consider:

### Unit Tests (Jest + Testing Library)
```javascript
// Example test structure
describe('Photo Upload App', () => {
  test('shows sign in button initially', () => {
    // Test implementation
  });
  
  test('loads folders after authentication', () => {
    // Test implementation
  });
  
  test('enables upload button when photos selected', () => {
    // Test implementation
  });
});
```

### Integration Tests (Playwright/Cypress)
```javascript
// Example integration test
test('complete upload workflow', async () => {
  // Navigate to app
  // Sign in
  // Configure SharePoint
  // Select folder
  // Choose photos
  // Upload
  // Verify success
});
```

## Known Limitations

1. **Local Testing**: MSAL library may be blocked by ad blockers or privacy extensions
2. **File Size**: SharePoint has file size limits (typically 250GB, but configurable)
3. **Concurrent Uploads**: Large numbers of simultaneous uploads may be throttled by SharePoint
4. **Browser Compatibility**: Requires modern browsers with ES6+ support
5. **Network**: Requires internet connection for authentication and uploads

## Security Testing

- [ ] Verify HTTPS is enforced in production
- [ ] Check that tokens are not exposed in URL or console
- [ ] Verify authentication token expires appropriately
- [ ] Test with expired tokens - verify re-authentication
- [ ] Verify no sensitive data in localStorage (only tokens)
- [ ] Test access control - users can only access permitted folders
- [ ] Verify file uploads respect SharePoint permissions

## Troubleshooting Common Issues

### Issue: "MSAL is not defined"
**Solution**: Check that MSAL library loads correctly, not blocked by ad blocker

### Issue: "Failed to access SharePoint site"
**Solution**: Verify URL format, user permissions, and API consent

### Issue: Camera not working on mobile
**Solution**: Ensure app served over HTTPS, check browser permissions

### Issue: Service worker not registering
**Solution**: Must use HTTPS (except localhost), check browser compatibility

### Issue: Photos upload but not visible in SharePoint
**Solution**: Check folder selection, verify in correct library, refresh SharePoint

## Test Results Template

```
Test Date: ____________
Tester: ____________
Environment: [ ] Production [ ] Staging [ ] Development
Device: ____________
Browser: ____________
OS: ____________

Test Results:
- Authentication: [ ] Pass [ ] Fail - Notes: ____________
- Configuration: [ ] Pass [ ] Fail - Notes: ____________
- Folder Loading: [ ] Pass [ ] Fail - Notes: ____________
- Photo Selection: [ ] Pass [ ] Fail - Notes: ____________
- Upload: [ ] Pass [ ] Fail - Notes: ____________
- Mobile: [ ] Pass [ ] Fail - Notes: ____________
- PWA: [ ] Pass [ ] Fail - Notes: ____________

Issues Found: ____________
Overall Result: [ ] Pass [ ] Fail
```
