// Configuration
const msalConfig = {
    auth: {
        clientId: "YOUR_CLIENT_ID_HERE", // Replace with your Azure AD app client ID
        authority: "https://login.microsoftonline.com/common",
        redirectUri: window.location.origin
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    }
};

const loginRequest = {
    scopes: ["User.Read", "Files.ReadWrite.All", "Sites.ReadWrite.All"]
};

// Initialize MSAL
let msalInstance;
let currentAccount = null;
let selectedFiles = [];
let sharepointConfig = {
    siteUrl: "",
    libraryName: "Shared Documents"
};

// DOM elements
const authSection = document.getElementById('auth-section');
const uploadSection = document.getElementById('upload-section');
const signinBtn = document.getElementById('signin-btn');
const signoutBtn = document.getElementById('signout-btn');
const userInfo = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const folderSelect = document.getElementById('folder-select');
const refreshFoldersBtn = document.getElementById('refresh-folders-btn');
const photoInput = document.getElementById('photo-input');
const photoPreview = document.getElementById('photo-preview');
const uploadBtn = document.getElementById('upload-btn');
const progressSection = document.getElementById('progress-section');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const statusMessage = document.getElementById('status-message');
const siteUrlInput = document.getElementById('site-url');
const libraryNameInput = document.getElementById('library-name');
const saveConfigBtn = document.getElementById('save-config-btn');

// Initialize app
async function init() {
    // Load saved configuration
    loadConfig();
    
    // Initialize MSAL
    try {
        msalInstance = new msal.PublicClientApplication(msalConfig);
        await msalInstance.initialize();
        
        // Handle redirect promise
        const response = await msalInstance.handleRedirectPromise();
        if (response) {
            handleResponse(response);
        } else {
            const accounts = msalInstance.getAllAccounts();
            if (accounts.length > 0) {
                currentAccount = accounts[0];
                showUserInterface();
            }
        }
    } catch (error) {
        console.error('MSAL initialization error:', error);
        showStatus('Error initializing authentication. Please check configuration.', 'error');
    }
}

// Load configuration from localStorage
function loadConfig() {
    const savedConfig = localStorage.getItem('sharepointConfig');
    if (savedConfig) {
        sharepointConfig = JSON.parse(savedConfig);
        siteUrlInput.value = sharepointConfig.siteUrl || '';
        libraryNameInput.value = sharepointConfig.libraryName || 'Shared Documents';
    }
}

// Save configuration to localStorage
function saveConfig() {
    sharepointConfig.siteUrl = siteUrlInput.value.trim();
    sharepointConfig.libraryName = libraryNameInput.value.trim() || 'Shared Documents';
    localStorage.setItem('sharepointConfig', JSON.stringify(sharepointConfig));
    showStatus('Configuration saved successfully!', 'success');
    
    // Reload folders if signed in
    if (currentAccount && sharepointConfig.siteUrl) {
        loadFolders();
    }
}

// Sign in
async function signIn() {
    try {
        await msalInstance.loginRedirect(loginRequest);
    } catch (error) {
        console.error('Sign in error:', error);
        showStatus('Sign in failed. Please try again.', 'error');
    }
}

// Sign out
function signOut() {
    msalInstance.logoutRedirect();
}

// Handle authentication response
function handleResponse(response) {
    if (response !== null) {
        currentAccount = response.account;
        showUserInterface();
    }
}

// Show user interface after successful authentication
function showUserInterface() {
    signinBtn.classList.add('hidden');
    userInfo.classList.remove('hidden');
    userName.textContent = currentAccount.name || currentAccount.username;
    uploadSection.classList.remove('hidden');
    
    // Load folders if configuration is set
    if (sharepointConfig.siteUrl) {
        loadFolders();
    } else {
        showStatus('Please configure SharePoint site URL in the configuration section below.', 'warning');
    }
}

// Get access token
async function getAccessToken() {
    const tokenRequest = {
        scopes: loginRequest.scopes,
        account: currentAccount
    };
    
    try {
        const response = await msalInstance.acquireTokenSilent(tokenRequest);
        return response.accessToken;
    } catch (error) {
        if (error instanceof msal.InteractionRequiredAuthError) {
            return msalInstance.acquireTokenRedirect(tokenRequest);
        }
        throw error;
    }
}

// Load folders from SharePoint
async function loadFolders() {
    if (!sharepointConfig.siteUrl) {
        folderSelect.innerHTML = '<option value="">Please configure SharePoint site URL</option>';
        return;
    }
    
    try {
        folderSelect.innerHTML = '<option value="">Loading folders...</option>';
        const token = await getAccessToken();
        
        // Extract site path from URL
        const url = new URL(sharepointConfig.siteUrl);
        const sitePath = url.pathname;
        
        // Get site ID
        const siteResponse = await fetch(
            `https://graph.microsoft.com/v1.0${sitePath}`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );
        
        if (!siteResponse.ok) {
            throw new Error('Failed to access SharePoint site');
        }
        
        const siteData = await siteResponse.json();
        const siteId = siteData.id;
        
        // Get document library
        const driveResponse = await fetch(
            `https://graph.microsoft.com/v1.0/sites/${siteId}/drives`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );
        
        if (!driveResponse.ok) {
            throw new Error('Failed to access document libraries');
        }
        
        const drivesData = await driveResponse.json();
        const drive = drivesData.value.find(d => d.name === sharepointConfig.libraryName);
        
        if (!drive) {
            throw new Error(`Document library "${sharepointConfig.libraryName}" not found`);
        }
        
        // Get folders in the library
        const foldersResponse = await fetch(
            `https://graph.microsoft.com/v1.0/drives/${drive.id}/root/children?$filter=folder ne null`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );
        
        if (!foldersResponse.ok) {
            throw new Error('Failed to load folders');
        }
        
        const foldersData = await foldersResponse.json();
        
        // Populate folder dropdown
        folderSelect.innerHTML = '<option value="">Root folder</option>';
        foldersData.value.forEach(folder => {
            const option = document.createElement('option');
            option.value = folder.id;
            option.textContent = folder.name;
            option.dataset.driveId = drive.id;
            folderSelect.appendChild(option);
        });
        
        showStatus('Folders loaded successfully!', 'success');
        setTimeout(() => statusMessage.textContent = '', 3000);
        
    } catch (error) {
        console.error('Error loading folders:', error);
        folderSelect.innerHTML = '<option value="">Error loading folders</option>';
        showStatus(`Error loading folders: ${error.message}`, 'error');
    }
}

// Handle photo selection
function handlePhotoSelection(event) {
    const files = Array.from(event.target.files);
    selectedFiles = files;
    
    // Clear previous preview
    photoPreview.innerHTML = '';
    
    if (files.length === 0) {
        uploadBtn.disabled = true;
        return;
    }
    
    // Show preview for each file
    files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'photo-preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview ${index + 1}">
                <button class="remove-btn" data-index="${index}">×</button>
            `;
            photoPreview.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    });
    
    uploadBtn.disabled = false;
}

// Remove photo from selection
function removePhoto(index) {
    selectedFiles.splice(index, 1);
    
    // Update file input
    const dataTransfer = new DataTransfer();
    selectedFiles.forEach(file => dataTransfer.items.add(file));
    photoInput.files = dataTransfer.files;
    
    // Trigger selection handler to update preview
    handlePhotoSelection({ target: photoInput });
}

// Upload photos to SharePoint
async function uploadPhotos() {
    if (selectedFiles.length === 0) {
        showStatus('Please select at least one photo to upload.', 'warning');
        return;
    }
    
    if (!sharepointConfig.siteUrl) {
        showStatus('Please configure SharePoint site URL first.', 'error');
        return;
    }
    
    try {
        uploadBtn.disabled = true;
        progressSection.classList.remove('hidden');
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
        
        const token = await getAccessToken();
        const selectedOption = folderSelect.options[folderSelect.selectedIndex];
        
        // Get drive info
        const url = new URL(sharepointConfig.siteUrl);
        const sitePath = url.pathname;
        
        const siteResponse = await fetch(
            `https://graph.microsoft.com/v1.0${sitePath}`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );
        
        const siteData = await siteResponse.json();
        const siteId = siteData.id;
        
        const driveResponse = await fetch(
            `https://graph.microsoft.com/v1.0/sites/${siteId}/drives`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );
        
        const drivesData = await driveResponse.json();
        const drive = drivesData.value.find(d => d.name === sharepointConfig.libraryName);
        
        if (!drive) {
            throw new Error(`Document library "${sharepointConfig.libraryName}" not found`);
        }
        
        // Upload each file
        let uploadedCount = 0;
        const totalFiles = selectedFiles.length;
        
        for (let i = 0; i < totalFiles; i++) {
            const file = selectedFiles[i];
            const fileName = file.name;
            
            // Determine upload path
            let uploadUrl;
            if (folderSelect.value === '') {
                // Upload to root
                uploadUrl = `https://graph.microsoft.com/v1.0/drives/${drive.id}/root:/${fileName}:/content`;
            } else {
                // Upload to selected folder
                const folderId = folderSelect.value;
                uploadUrl = `https://graph.microsoft.com/v1.0/drives/${drive.id}/items/${folderId}:/${fileName}:/content`;
            }
            
            // Upload file
            const uploadResponse = await fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': file.type
                },
                body: file
            });
            
            if (!uploadResponse.ok) {
                throw new Error(`Failed to upload ${fileName}`);
            }
            
            uploadedCount++;
            const progress = Math.round((uploadedCount / totalFiles) * 100);
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `Uploaded ${uploadedCount} of ${totalFiles} photos`;
        }
        
        // Success
        showStatus(`Successfully uploaded ${uploadedCount} photo(s) to SharePoint!`, 'success');
        
        // Reset form
        photoInput.value = '';
        selectedFiles = [];
        photoPreview.innerHTML = '';
        uploadBtn.disabled = true;
        
        // Hide progress after a delay
        setTimeout(() => {
            progressSection.classList.add('hidden');
            progressFill.style.width = '0%';
        }, 3000);
        
    } catch (error) {
        console.error('Upload error:', error);
        showStatus(`Upload failed: ${error.message}`, 'error');
        uploadBtn.disabled = false;
    }
}

// Show status message
function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
}

// Event listeners
signinBtn.addEventListener('click', signIn);
signoutBtn.addEventListener('click', signOut);
refreshFoldersBtn.addEventListener('click', loadFolders);
photoInput.addEventListener('change', handlePhotoSelection);
uploadBtn.addEventListener('click', uploadPhotos);
saveConfigBtn.addEventListener('click', saveConfig);

// Handle photo removal
photoPreview.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const index = parseInt(e.target.dataset.index);
        removePhoto(index);
    }
});

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
