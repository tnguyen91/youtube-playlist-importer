import { useEffect, useState } from 'react';
import { fetchPlaylist } from './fetchPlaylist';

function App() {
  const [url, setUrl] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [savedPlaylists, setSavedPlaylists] = useState({});

  // Load saved playlists from localStorage on first render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedPlaylists")) || {};
    setSavedPlaylists(saved);
  }, []);

  const extractPlaylistId = (url) => {
    const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const handleImport = async () => {
    const playlistId = extractPlaylistId(url);
    if (!playlistId) {
      alert('Invalid YouTube playlist URL');
      return;
    }

    setLoading(true);
    setVideos([]);

    try {
      const fetchedVideos = await fetchPlaylist(playlistId);
      setVideos(fetchedVideos);
      console.log(fetchedVideos); // Optional: log for debugging
    } catch (error) {
      console.error('Error fetching playlist:', error);
      alert('Failed to fetch playlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveToLocalStorage = (title, videos) => {
    console.log("Saving to localStorage:", title, videos);
    const existing = JSON.parse(localStorage.getItem("savedPlaylists")) || {};
    existing[title] = videos;
    localStorage.setItem("savedPlaylists", JSON.stringify(existing));
    console.log("Saved JSON:", localStorage.getItem("savedPlaylists"));
  };

  const handleSave = () => {
    console.log("Saving playlist:", playlistTitle, videos);
    saveToLocalStorage(playlistTitle, videos);
    setSavedPlaylists((prev) => ({ ...prev, [playlistTitle]: videos }));
    alert('Playlist saved!');
    setPlaylistTitle('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">YouTube Playlist Importer</h1>

      {/* Playlist URL input and Import button */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Paste YouTube playlist URL"
          className="flex-1 border rounded px-3 py-2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleImport}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Importing...' : 'Import'}
        </button>
      </div>

      {/* Save playlist name input and Save button */}
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Playlist Name"
          className="flex-1 border rounded px-3 py-2"
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(e.target.value)}
        />
        <button 
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={!playlistTitle || videos.length === 0}
        >
          Save Playlist
        </button>
      </div>

      {/* Display imported videos */}
      <div className="space-y-2">
        {videos.map((video, index) => (
          <div key={index} className="flex items-center space-x-4 border rounded p-2 bg-white shadow-sm">
            <img src={video.thumbnail} alt={video.title} className="w-20 h-12 object-cover rounded" />
            <div>
              <p className="font-semibold">{video.title}</p>
              <p className="text-sm text-gray-500">{video.channelTitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Display saved playlists */}
      {Object.keys(savedPlaylists).length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Saved Playlists</h2>
          <div className="space-y-4">
            {Object.entries(savedPlaylists).map(([title, vids], idx) => (
              <div key={idx} className="border rounded p-4 bg-gray-50 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{title}</span>
                  <button
                    onClick={() => {
                      setVideos(vids);
                      setPlaylistTitle(title);
                    }}
                    className="text-blue-600 underline text-sm"
                  >
                    Load
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;