/// <reference types="chrome"/>

// Type definitions
interface CookieResult {
  youtubeMusic?: Record<string, string>;
  spotify?: {
    sp_dc?: string;
  };
}

interface NetscapeResponse {
  netscapeFormat: string;
}

interface MessageResponse {
  success: boolean;
  data?: CookieResult | NetscapeResponse;
  error?: string;
}

interface GistFile {
  content: string;
}

interface GistRequest {
  description: string;
  public: boolean;
  files: Record<string, GistFile>;
}

interface GistResponse {
  html_url: string;
  id: string;
}

// DOM Elements
const extractYTMusicBtn = document.getElementById('extract-youtube-music') as HTMLButtonElement;
const copyYTMusicBtn = document.getElementById('copy-youtube-music') as HTMLButtonElement;
const pushYTMusicBtn = document.getElementById('push-youtube-music') as HTMLButtonElement;
const ytMusicResult = document.getElementById('youtube-music-result') as HTMLTextAreaElement;
const formatSelect = document.getElementById('format-select') as HTMLSelectElement;

const extractSpotifyBtn = document.getElementById('extract-spotify') as HTMLButtonElement;
const copySpotifyBtn = document.getElementById('copy-spotify') as HTMLButtonElement;
const pushSpotifyBtn = document.getElementById('push-spotify') as HTMLButtonElement;
const spotifyResult = document.getElementById('spotify-result') as HTMLTextAreaElement;

const saveGistTokenBtn = document.getElementById('save-gist-token') as HTMLButtonElement;
const gistTokenInput = document.getElementById('gist-token') as HTMLInputElement;

const statusEl = document.getElementById('status') as HTMLDivElement;

// Helper function to display status messages
const showStatus = (message: string, isError = false) => {
  statusEl.textContent = message;
  statusEl.className = isError ? 'status error' : 'status success';
  
  setTimeout(() => {
    statusEl.textContent = '';
    statusEl.className = 'status';
  }, 3000);
};

// Convert cookies object to string format
const formatCookiesAsString = (cookies: Record<string, string>): string => {
  return Object.entries(cookies)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');
};

// Get GitHub token from storage
const getGistToken = (): Promise<string | null> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['github_token'], (result) => {
      resolve(result.github_token || null);
    });
  });
};

// Save GitHub token to storage
const saveGistToken = (token: string): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ github_token: token }, () => {
      resolve();
    });
  });
};

// Create a GitHub Gist
const createGist = async (token: string, description: string, files: Record<string, GistFile>): Promise<GistResponse> => {
  const response = await fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description,
      public: false,
      files,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create gist');
  }

  return response.json();
};

// Function to extract YouTube Music cookies
const extractYouTubeMusicCookies = () => {
  ytMusicResult.value = 'Loading...';
  const selectedFormat = formatSelect.value;
  
  const action = selectedFormat === 'netscape' ? 'getYouTubeMusicCookiesNetscape' : 'getYouTubeMusicCookies';
  
  chrome.runtime.sendMessage({ action }, (response: MessageResponse) => {
    if (chrome.runtime.lastError) {
      showStatus(`Error: ${chrome.runtime.lastError.message}`, true);
      return;
    }

    if (response.success && response.data) {
      if (selectedFormat === 'netscape') {
        // Type guard for NetscapeResponse
        if ('netscapeFormat' in response.data) {
          const netscapeData = response.data as NetscapeResponse;
          if (netscapeData.netscapeFormat) {
            ytMusicResult.value = netscapeData.netscapeFormat;
            copyYTMusicBtn.disabled = false;
            pushYTMusicBtn.disabled = false;
            showStatus('YouTube Music cookies extracted in Netscape format!');
          } else {
            ytMusicResult.value = 'No YouTube Music cookies found';
          }
        } else {
          ytMusicResult.value = 'Invalid response format';
        }
      } else {
        // Type guard for CookieResult
        if ('youtubeMusic' in response.data) {
          const cookieData = response.data as CookieResult;
          if (cookieData.youtubeMusic && Object.keys(cookieData.youtubeMusic).length > 0) {
            ytMusicResult.value = formatCookiesAsString(cookieData.youtubeMusic);
            copyYTMusicBtn.disabled = false;
            pushYTMusicBtn.disabled = false;
            showStatus('YouTube Music cookies extracted successfully!');
          } else {
            ytMusicResult.value = 'No YouTube Music cookies found';
          }
        } else {
          ytMusicResult.value = 'Invalid response format';
        }
      }
    } else {
      ytMusicResult.value = '';
      showStatus(`Failed to extract YouTube Music cookies: ${response.error}`, true);
    }
  });
};

// Function to extract Spotify cookies only
const extractSpotifyCookies = () => {
  spotifyResult.value = 'Loading...';
  chrome.runtime.sendMessage({ action: 'getSpotifyCookies' }, (response: MessageResponse) => {
    if (chrome.runtime.lastError) {
      showStatus(`Error: ${chrome.runtime.lastError.message}`, true);
      return;
    }

    if (response.success && response.data) {
      // Type guard for CookieResult with spotify
      if ('spotify' in response.data) {
        const cookieData = response.data as CookieResult;
        const spotifySpDc = cookieData.spotify?.sp_dc;
        if (spotifySpDc) {
          spotifyResult.value = spotifySpDc;
          copySpotifyBtn.disabled = false;
          pushSpotifyBtn.disabled = false;
          showStatus('Spotify cookies extracted successfully!');
        } else {
          spotifyResult.value = 'sp_dc cookie not found';
        }
      } else {
        spotifyResult.value = 'Invalid response format';
      }
    } else {
      spotifyResult.value = '';
      showStatus(`Failed to extract Spotify cookies: ${response.error}`, true);
    }
  });
};

// Push YouTube Music cookies to GitHub Gist
const pushYTMusicToGist = async () => {
  const token = await getGistToken();
  if (!token) {
    showStatus('Please save your GitHub token first', true);
    return;
  }

  const content = ytMusicResult.value;
  if (!content || content === 'No YouTube Music cookies found') {
    showStatus('No cookies to push', true);
    return;
  }

  pushYTMusicBtn.disabled = true;
  pushYTMusicBtn.textContent = 'Pushing...';

  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const files = {
      [`youtube-music-cookies-${timestamp}.txt`]: { content },
    };
    
    const gist = await createGist(token, `YouTube Music Cookies - ${new Date().toLocaleString()}`, files);
    showStatus(`Gist created: ${gist.html_url}`);
    
    // Copy gist URL to clipboard
    await navigator.clipboard.writeText(gist.html_url);
    showStatus('Gist URL copied to clipboard!');
  } catch (error) {
    showStatus(`Failed to push to Gist: ${(error as Error).message}`, true);
  } finally {
    pushYTMusicBtn.disabled = false;
    pushYTMusicBtn.textContent = 'Push to Gist';
  }
};

// Push Spotify cookies to GitHub Gist
const pushSpotifyToGist = async () => {
  const token = await getGistToken();
  if (!token) {
    showStatus('Please save your GitHub token first', true);
    return;
  }

  const content = spotifyResult.value;
  if (!content || content === 'sp_dc cookie not found') {
    showStatus('No Spotify cookie to push', true);
    return;
  }

  pushSpotifyBtn.disabled = true;
  pushSpotifyBtn.textContent = 'Pushing...';

  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const files = {
      [`spotify-sp_dc-${timestamp}.txt`]: { content },
    };
    
    const gist = await createGist(token, `Spotify sp_dc - ${new Date().toLocaleString()}`, files);
    showStatus(`Gist created: ${gist.html_url}`);
    
    // Copy gist URL to clipboard
    await navigator.clipboard.writeText(gist.html_url);
    showStatus('Gist URL copied to clipboard!');
  } catch (error) {
    showStatus(`Failed to push to Gist: ${(error as Error).message}`, true);
  } finally {
    pushSpotifyBtn.disabled = false;
    pushSpotifyBtn.textContent = 'Push to Gist';
  }
};

// Copy text to clipboard function
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};

// Event listeners
extractYTMusicBtn.addEventListener('click', extractYouTubeMusicCookies);
extractSpotifyBtn.addEventListener('click', extractSpotifyCookies);
pushYTMusicBtn.addEventListener('click', pushYTMusicToGist);
pushSpotifyBtn.addEventListener('click', pushSpotifyToGist);

// Clear result when format changes
formatSelect.addEventListener('change', () => {
  ytMusicResult.value = '';
  copyYTMusicBtn.disabled = true;
  pushYTMusicBtn.disabled = true;
});

// Save GitHub token
saveGistTokenBtn.addEventListener('click', async () => {
  const token = gistTokenInput.value.trim();
  if (!token) {
    showStatus('Please enter a GitHub token', true);
    return;
  }
  
  await saveGistToken(token);
  showStatus('GitHub token saved!');
  gistTokenInput.value = '';
});

// Load saved token on startup
getGistToken().then((token) => {
  if (token) {
    gistTokenInput.placeholder = 'Token saved (hidden)';
  }
});

// Copy text to clipboard
copyYTMusicBtn.addEventListener('click', async () => {
  const success = await copyToClipboard(ytMusicResult.value);
  showStatus(success ? 'YouTube Music cookies copied!' : 'Failed to copy', !success);
});

copySpotifyBtn.addEventListener('click', async () => {
  const success = await copyToClipboard(spotifyResult.value);
  showStatus(success ? 'Spotify cookie copied!' : 'Failed to copy', !success);
});

// Initialize the popup
document.addEventListener('DOMContentLoaded', () => {
  // Reset UI
  ytMusicResult.value = '';
  spotifyResult.value = '';
  copyYTMusicBtn.disabled = true;
  copySpotifyBtn.disabled = true;
  pushYTMusicBtn.disabled = true;
  pushSpotifyBtn.disabled = true;
});