# 🎵 Sonexa Utils

> **Connect your music. Extend your Sonexa experience.**

**Sonexa Utils** is a browser extension developed by **VEDRA LLC** for the **Sonexa** music ecosystem. It provides browser-side utilities that help users connect supported music services such as **YouTube Music** and **Spotify** with Sonexa.

🚀 **Fast • Simple • Secure • Open Source**

---

## ✨ Features

🎵 **YouTube Music Integration**
Connect supported YouTube Music functionality with Sonexa.

🟢 **Spotify Integration**
Connect supported Spotify functionality with Sonexa.

🔗 **Sonexa Connection**
Transfer supported account/session information to Sonexa through the appropriate integration flow.

⚡ **One-Click Workflow**
Designed to keep the connection process simple and quick.

🌐 **Browser Support**
Built using standard WebExtension technologies for modern browsers.

🦊 **Firefox Support**
Compatible with Firefox through the WebExtension architecture.

💻 **Chrome Support**
Designed to work with Chromium-based browsers.

---

# 🛠️ How It Works

The basic workflow is:

```text
🌐 Browser
     │
     ▼
🎵 Sonexa Utils
     │
     ├── YouTube Music
     │
     └── Spotify
     │
     ▼
🔐 Authorized Connection
     │
     ▼
🎧 Sonexa
```

### 1️⃣ Install Sonexa Utils

Download the latest release from the project's **Releases** section.

Extract the downloaded ZIP file.

---

### 2️⃣ Open Your Browser Extensions

For Chrome/Chromium:

```text
chrome://extensions
```

For Firefox:

```text
about:debugging
```

Enable the appropriate developer/temporary-extension option.

---

### 3️⃣ Load Sonexa Utils

For Chrome:

1. Enable **Developer mode**.
2. Select **Load unpacked**.
3. Select the extracted Sonexa Utils folder.
4. Pin the extension to your toolbar. 📌

For Firefox:

1. Open **about:debugging**.
2. Select **This Firefox**.
3. Choose **Load Temporary Add-on**.
4. Select the extension manifest. 🦊

---

### 4️⃣ Open Sonexa Utils

Click the **Sonexa Utils** extension icon.

You'll see the available music-service integrations:

```text
┌───────────────────────────┐
│       🎧 SONEXA UTILS     │
│                           │
│  🎵 YouTube Music         │
│  🟢 Spotify               │
│                           │
│  🔗 Connect to Sonexa     │
└───────────────────────────┘
```

---

### 5️⃣ Connect Your Music Service

Open the supported music service in your browser and sign in normally.

Then return to **Sonexa Utils** and select the appropriate integration.

🔐 Sonexa Utils should use supported authorization/integration mechanisms rather than asking users to manually expose or share their account passwords.

---

### 6️⃣ Connect With Sonexa

After the authorization process is completed:

```text
🎵 Music Service
       ↓
🔐 Authorized Connection
       ↓
🧩 Sonexa Utils
       ↓
🎧 Sonexa
```

Sonexa can then use the authorized connection for the functionality supported by the integration.

---

# 🔒 Security

Your music accounts are important.

Sonexa Utils should:

* 🔐 Never request your music-service password
* 🚫 Never display passwords
* 🛡️ Minimize access to browser data
* 📦 Request only the permissions required for its functionality
* 🔗 Use authorized connection methods where available
* 🧹 Avoid unnecessary storage of authentication information

**Never share authentication tokens, session credentials, or exported browser data with other people.**

---

# 🏗️ Technology

Sonexa Utils is built with modern WebExtension technologies.

* TypeScript
* JavaScript
* HTML
* CSS
* WebExtension APIs
* Webpack
* Chrome Extensions API
* Firefox WebExtensions API

---

# 🦊 Browser Compatibility

| Browser           | Support |
| ----------------- | ------- |
| 🌐 Google Chrome  | ✅       |
| 🔵 Chromium       | ✅       |
| 🦊 Firefox        | ✅       |
| 🟦 Microsoft Edge | ✅       |

Compatibility may vary depending on the integration and browser API support.

---

# 📁 Project Structure

```text
sonexa-utils/
│
├── src/
│   ├── background/
│   ├── content/
│   ├── popup/
│   └── utils/
│
├── public/
│   └── icons/
│
├── package.json
├── tsconfig.json
├── webpack.config.js
├── README.md
└── LICENSE
```

---

# 🚀 Development

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
cd sonexa-utils
```

Install dependencies:

```bash
npm install
```

Build the extension:

```bash
npm run build
```

The generated extension can then be loaded into a supported browser using its developer extension tools.

---

# 🏢 About VEDRA LLC

**Sonexa Utils** is part of the **Sonexa** ecosystem developed by **VEDRA LLC**.

🎧 **Sonexa**
*Listen Beyond Limits.*

🏢 **VEDRA LLC**
*Building the next generation of digital experiences.*

---

# 📜 License

This project is released under the **MIT License**.

See [`LICENSE`](LICENSE) for the complete license text.

---

## ❤️ Sonexa Ecosystem

```text
🎧 SONEXA
     │
     ├── 📱 Sonexa App
     ├── 🌐 Sonexa Web
     ├── 🧩 Sonexa Utils
     └── 🔌 Music Integrations
             │
             ├── 🎵 YouTube Music
             └── 🟢 Spotify
```

**Built with ❤️ by VEDRA LLC.**

> 🎶 **Your music. Your ecosystem. Sonexa.**
