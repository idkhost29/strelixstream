import { useEffect } from "react";
import { getMovieEmbedUrl, getTVEmbedUrl, setupProgressListener } from "@/lib/vidlink";

interface VideoPlayerProps {
  type: "movie" | "tv";
  tmdbId: number;
  season?: number;
  episode?: number;
}

const VideoPlayer = ({ type, tmdbId, season, episode }: VideoPlayerProps) => {
  useEffect(() => {
    setupProgressListener();
  }, []);

  const embedUrl = type === "movie"
    ? getMovieEmbedUrl(tmdbId)
    : getTVEmbedUrl(tmdbId, season || 1, episode || 1);

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-card">
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

export default VideoPlayer;
