import { createContext, useState, ReactNode } from "react";
import { MovieCardComponent } from "../components/MovieCardComponent";
import { useNavigate } from "react-router-dom";

import { GoogleGenerativeAI } from "@google/generative-ai";

interface MovieContextType {
  movie: string;
  setMovie: React.Dispatch<React.SetStateAction<string>>;
}

// Creating the context with an undefined default value initially
const MovieDataContext = createContext<MovieContextType | undefined>(undefined);

export const Home = () => {
  const [movie, setMovie] = useState<string>("");
  const navigate = useNavigate();

 
  
  
  const handleNavigate = () => {
    console.log(movie)
    navigate("/movie",{state:{movieTitle:movie}});
  };

  return (
    <MovieDataContext.Provider value={{ movie, setMovie }}>
      <div className="flex-col bg-gray-700">
        <div className="flex items-center justify-center h-96 bg-gray-700">
          <form className="flex items-center justify-center max-w-lg mx-auto">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 21 21"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="voice-search"
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-96 ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Search Movies, Facts, About Directors ,Nolan..."
                required
                onChange={(e) => {
                  setMovie(e.target.value);
                }}
              />
              <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                  />
                </svg>
              </button>
            </div>
            <button
              type="submit"
              onClick={handleNavigate}
              className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-red-600 rounded-lg border border-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              Search
            </button>
          </form>
        </div>
        <div className="grid grid-cols-5 gap-2 bg-gray-700 pl-8">
          <MovieCardComponent link="https://www.udiscovermusic.com/wp-content/uploads/2024/10/gladiator-ii.jpg" movieLabel="Gladiator II" />
          <MovieCardComponent link="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL1GtAaLwGveGQvI30Sxu6M6FfgnGWABTA1g&s" movieLabel="Top Gun:Maverick" />
          <MovieCardComponent link="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ80aactSABSY05iyCC8xzwo4e9047jrnKpdg&s" movieLabel="Laapata Ladies" />
          <MovieCardComponent link="https://cdn.cinematerial.com/p/297x/fhfecufs/the-batman-movie-poster-md.jpg?v=1645104442" movieLabel="The Batman" />
          <MovieCardComponent link="data:image/jpeg;base64,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" movieLabel="Interstellar" />
        </div>
      </div>

      
    </MovieDataContext.Provider>
  );
};

export {MovieDataContext}
