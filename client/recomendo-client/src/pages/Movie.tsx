import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Apitest } from "./Apitest";

// Define an interface for movie data
interface Rating {
  Source: string;
  Value: string;
}

interface MovieData {
  Title: string;
  Director: string;
  Year: string;
  Plot: string;
  imdbRating: string;
  Actors: string;
  Poster: string;
  Ratings: Rating[];
}

export const Movie = () => {
  const location = useLocation();
  const movieTitle = location.state?.movieTitle || "";
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [poster, setPosterUrl] = useState<string | null>(null);
  const omdbApiKey =  "c10096d"; // Consider using an environment variable for production
  const url = `https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(movieTitle)}`;

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get<MovieData>(url);
        console.log("Movie Data:", response.data);
        setMovieData(response.data);
        setPosterUrl(response.data.Poster);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [url]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-700">
        {movieData ? (
          <div className="max-w-4xl w-full bg-orange-500 rounded-lg shadow-lg p-4 border-2 border-red-500">
            <div className="grid grid-cols-2 gap-4">
              {poster && (
                <img
                  className="rounded-lg shadow-lg w-80"
                  src={poster}
                  alt={`${movieData.Title} Poster`}
                />
              )}
              <div>
                <h2 className="text-4xl font-bold mb-8">{movieData.Title}</h2>
                <p className="text-xl italic text-black"><strong>Director:</strong> {movieData.Director}</p>
                <p className="text-xl italic text-black"><strong>Year:</strong> {movieData.Year}</p>
                <p className="text-xl italic text-black"><strong>Plot:</strong> {movieData.Plot}</p>
                <p className="text-xl italic text-black"><strong>IMDb Rating:</strong> {movieData.imdbRating}</p>
                <p className="text-xl italic text-black"><strong>Actors:</strong> {movieData.Actors}</p>
                
                {/* Accessing Rotten Tomatoes rating */}
                <p className="text-xl italic text-black">
                  <strong>Rotten Tomatoes:</strong>{" "}
                  {movieData.Ratings.find(rating => rating.Source === "Rotten Tomatoes")?.Value || "N/A"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading movie details...</p>
        )}
      </div>
      <Apitest movieTitle={movieTitle} />
    </>
  );
};
