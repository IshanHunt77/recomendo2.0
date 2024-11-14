import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieCardComponent } from '../components/MovieCardComponent';

interface Movie {
  name: string;
}

interface Props {
  movieTitle: string;
}

interface MovieData {
  Poster: string;
}

export const Apitest: React.FC<Props> = ({ movieTitle }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [posters, setPosters] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const fetchMovieNames = async () => {
      const apiKey = 'AIzaSyCKy_juDqOQLvgSzC3rEguSQO0_Pq8DPQ4';
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Provide a list of 5 movie names that are similar to "${movieTitle}" and match the following list format exactly:
1. 
2. 
3. 
4. 
5. 

Only provide the movie names in this list format, without any additional descriptions or details. Maintain the exact order.
`;

      try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        // Process response to get movie names
        const lines = responseText.split('\n').filter(line => line.trim() !== '');
const movieNames = lines.map(line => ({ name: line.trim().replace(/^\d+\.\s*/, '') }));

// Correct way to modify each movie name in the array
const moviesnames = movieNames.map(movie => ({
  name: movie.name, // Ensure you're modifying the 'name' property
}));

setMovies(moviesnames);

      } catch (error) {
        console.error('Error fetching movie names:', error);
      }
    };

    fetchMovieNames();
  }, [movieTitle]);

  // Fetch poster links from OMDb API after movie names are loaded
  useEffect(() => {
    const fetchPosters = async () => {
      const posterMap = new Map<string, string>();
      for (const movie of movies) {
        try {
          const response = await axios.get<MovieData>(`https://www.omdbapi.com/?apikey=c10096d&t=${encodeURIComponent(movie.name)}`);
          if (response.data.Poster) {
            posterMap.set(movie.name, response.data.Poster);
          }
        } catch (error) {
          console.error(`Error fetching poster for ${movie.name}:`, error);
        }
      }
      setPosters(posterMap);
    };

    if (movies.length > 0) {
      fetchPosters();
    }
  }, [movies]);

  return (
    <>
    <p className="text-4xl italic text-orange-600 underline bg-gray-700 pl-8 pb-4">Recommended Movies</p>
      <div className="grid grid-cols-5 gap-2 bg-gray-700 pl-8 ">
      
        {movies.map((movie, index) => (
          <MovieCardComponent 
            key={index} 
            movieLabel={movie.name} 
            link={posters.get(movie.name) || 'https://via.placeholder.com/150'} 
          />
        ))}
      </div>
    </>
  );
};
