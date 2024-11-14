// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const MovieDetail = () => {
//      // Access movieTitle from state
//     console.log("Movie Title:", movieTitle); // Ensure you're logging the correct value

//     const [movieDetails, setMovieDetails] = useState<string | null>(null);
//     const [actors, setActors] = useState<string | null>(null);
//     const [imdb, setImdb] = useState<string | null>(null);
//     // const [bo, setBo] = useState<string | null>(null);
//     const [awards, setAwards] = useState<string | null>(null);
//     const [facts, setFacts] = useState<string | null>(null);

//     const api_Key = "AIzaSyCKy_juDqOQLvgSzC3rEguSQO0_Pq8DPQ4";
//     const genAI = new GoogleGenerativeAI(api_Key);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const handleApiRequest = async (request: string) => {
//         const result = await model.generateContent(request);
//         console.log("Movie Details Response:", result.response.text());
//         return result.response.text();
//     };

//     const fetchMovieDetails = async () => {
//         if (!movieTitle) {
//             console.error("No movie title provided.");
//             return;
//         }

//         try {
//             const movieDetail = await handleApiRequest(`give two line brief about the plot of movie ${movieTitle}`);
//             const movieActors = await handleApiRequest(`give me names of the main cast of movie ${movieTitle}`);
//             const movieImdb = await handleApiRequest(`tell the IMDb rating of movie ${movieTitle} in one word`);
//             const movieBoxOffice = await handleApiRequest(`tell me about the budget and box office of the movie ${movieTitle} and was it hit or flop in one line`);
//             const movieAwards = await handleApiRequest(`tell me about the nominations and awards won by the movie ${movieTitle}`);
//             const movieFacts = await handleApiRequest(`tell me two facts about the movie ${movieTitle}`);

//             setMovieDetails(movieDetail);
//             setActors(movieActors);
//             setImdb(movieImdb);
//             setBo(movieBoxOffice);
//             setAwards(movieAwards);
//             setFacts(movieFacts);
//         } catch (error) {
//             console.error("Failed to fetch movie details:", error);
//         }
//     };

//     useEffect(() => {
//         if (movieTitle) {
//             fetchMovieDetails();
//         } else {
//             console.error("No movie title provided to fetch details.");
//         }
//     }, [movieTitle]);

//     return (
//         <div className="movie-details">
//             {movieDetails ? <p>{movieDetails}</p> : <p>Loading movie details...</p>}
//             {actors && <p>Actors: {actors}</p>}
//             {imdb && <p>IMDb: {imdb}</p>}
//             {bo && <p>Box Office: {bo}</p>}
//             {awards && <p>Awards: {awards}</p>}
//             {facts && <p>Facts: {facts}</p>}
//         </div>
//     );
// };
