# YouTube Playlist Importer

A simple React + Tailwind web app that allows to import a public YouTube playlist, view its videos, and save them locally in browser.

---

## Features

- Paste a YouTube playlist URL and view its contents
- See thumbnails, titles, and channels for each video
- Save named playlists to localStorage
- Load saved playlists

---

## Built With

- React (with Vite)
- TailwindCSS
- YouTube Data API v3

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tnguyen91/youtube-playlist-importer.git
cd youtube-playlist-importer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app locally

```bash
npm run dev
```

Visit: http://localhost:5173

---

## Setup API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable the **YouTube Data API v3**
3. Generate an API key
4. Create a `.env` file and add:

```
VITE_YOUTUBE_API_KEY=your_api_key_here
```

---

## Folder Structure

```
src/
├── App.jsx
├── fetchPlaylist.js
├── index.css
└── main.jsx
```