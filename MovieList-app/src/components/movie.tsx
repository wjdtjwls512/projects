import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./movie.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=KR`;

interface MovieItem {
  id: number;
  title: string;
  poster_path?: string;
  vote_average: number;
  release_date: string;
}

const Movie = () => {
  const nav = useNavigate();

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

  if (movie === null) {
    return (
      <div>
        <p>로딩중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1>현재 상영중인 영화</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {movie.map((movie) => (
          <div key={movie.id} className="w-full">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : `https://placehold.co/500x750/222/fff?text=No+Poster`
              }
              alt={movie.title}
              onClick={() => nav("/info")}
            />
            <h3>{movie.title}</h3>
            <p>평점: {movie.vote_average}</p>
            <p>개봉일: {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
