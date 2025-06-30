const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export async function fetchPlaylist(playlistId) {
  const maxResults = 25;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  const videos = (data.items || [])
    .filter((item) => item.snippet && item.snippet.title !== 'Deleted video' && item.snippet.title !== 'Private video')
    .map((item) => ({
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.videoOwnerChannelTitle || item.snippet.channelTitle,
      videoId: item.snippet.resourceId.videoId,
    }));

  return videos;
}