import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MediaRow from "@/components/MediaRow";
import ContinueWatching from "@/components/ContinueWatching";
import { 
  getTrending, 
  getPopularMovies, 
  getPopularTVShows, 
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies
} from "@/lib/tmdb";

const Index = () => {
  const { data: trending, isLoading: trendingLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: () => getTrending("all", "week"),
  });

  const { data: popularMovies, isLoading: moviesLoading } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () => getPopularMovies(),
  });

  const { data: popularTV, isLoading: tvLoading } = useQuery({
    queryKey: ["popularTV"],
    queryFn: () => getPopularTVShows(),
  });

  const { data: topRated, isLoading: topRatedLoading } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: () => getTopRatedMovies(),
  });

  const { data: nowPlaying, isLoading: nowPlayingLoading } = useQuery({
    queryKey: ["nowPlaying"],
    queryFn: () => getNowPlayingMovies(),
  });

  const { data: upcoming, isLoading: upcomingLoading } = useQuery({
    queryKey: ["upcoming"],
    queryFn: () => getUpcomingMovies(),
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <HeroSection items={trending || []} isLoading={trendingLoading} />
        
        <div className="container mx-auto -mt-20 relative z-10">
          <ContinueWatching />
          
          <MediaRow
            title="Trending Now"
            items={trending?.slice(5) || []}
            isLoading={trendingLoading}
          />
          
          <MediaRow
            title="Now Playing"
            items={nowPlaying?.results || []}
            mediaType="movie"
            isLoading={nowPlayingLoading}
          />
          
          <MediaRow
            title="Popular Movies"
            items={popularMovies?.results || []}
            mediaType="movie"
            isLoading={moviesLoading}
          />
          
          <MediaRow
            title="Popular TV Shows"
            items={popularTV?.results || []}
            mediaType="tv"
            isLoading={tvLoading}
          />
          
          <MediaRow
            title="Top Rated"
            items={topRated?.results || []}
            mediaType="movie"
            isLoading={topRatedLoading}
          />
          
          <MediaRow
            title="Coming Soon"
            items={upcoming?.results || []}
            mediaType="movie"
            isLoading={upcomingLoading}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Strelix. All rights reserved. Powered by VidLink & TMDB.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
