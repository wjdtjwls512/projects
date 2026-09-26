import { useState, useEffect } from "react";
import "./movie.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=KR`;

interface MovieItem {
  id: number;
  original_title: string;
  poster_path?: string;
  vote_average: number;
  release_date: string;
}

const Movie = () => {
  const [movie, setMovie] = useState<MovieItem[]>([]);
  useEffect(() => {
    const getMovieData = async () => {
      try {
        const res = await fetch(url);
        const movieData = await res.json();
        setMovie(movieData.results);
        console.log(movieData);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1>현재 상영중인 영화</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {movie.map((movie) => (
          <div key={movie.id} className="w-full">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
            <h3>{movie.original_title}</h3>
            <p>평점: {movie.vote_average}</p>
            <p>개봉일: {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
