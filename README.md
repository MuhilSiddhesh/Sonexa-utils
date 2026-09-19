# Sonexa and Vedra Utils

A Chrome extension that extracts cookies from YouTube Music and specifically the `sp_dc` parameter from Spotify for Sonexa and Vedra client

## Features

- Extract all cookies from YouTube Music (String or Netscape format)
- Extract only the `sp_dc` cookie from Spotify
- Copy extracted cookies to clipboard with a single click
- **NEW:** Push cookies to GitHub Gist for easy backup/sharing
- **NEW:** Built-in setup guide for Sonexa Desktop login

## Installation

1. Download zip file from Release and extract it
2. Open Chrome and go to `chrome://extensions`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extracted folder from this project

## Usage

1. Click on the extension icon in your Chrome toolbar
2. Click "Extract Cookies" for YouTube Music or Spotify
3. Once cookies are displayed, use the "Copy to Clipboard" button to copy them
4. **Optional:** Enter your GitHub Personal Access Token and click "Save Token", then use "Push to Gist" to create a private GitHub Gist with your cookies
5. Click "📖 View Setup Guide" for detailed instructions on logging into Sonexa Desktop

## Setup Guide

For detailed instructions on how to log in to YouTube and Spotify on Sonexa Desktop using the Sonexa Utils Extension, see the [Setup Guide](https://github.com/MuhilSiddhesh/Sonexa-utils/blob/dev/src/guide.html) or click the "📖 View Setup Guide" link in the extension.

### Quick Steps:
1. **Install Sonexa Utils extension** from [GitHub Releases](https://github.com/MuhilSiddhesh/Sonexa-utils/releases)
2. **Log in to YouTube Music** (music.youtube.com) and **Spotify** (open.spotify.com) in your browser
3. **Open Sonexa Desktop App** → Settings → Log in to YouTube/Spotify
4. **Extract cookies** using the extension and paste them into the app

## License

```md
MIT License

Copyright (c) 2025 Nguyễn Đức Tuấn Minh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

