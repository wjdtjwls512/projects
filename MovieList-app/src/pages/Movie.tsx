import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import "./Movie.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=KR`;

interface MovieItem {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const Movie = () => {
  const nav = useNavigate();

  const [movie, setMovie] = useState<MovieItem[]>(() => {
    const savedData = localStorage.getItem("movies");
    return savedData ? JSON.parse(savedData) : [];
  });
  useEffect(() => {
    const savedData = localStorage.getItem("movies");

    if (savedData) {
      return;
    } else {
      const getMovieData = async () => {
        try {
          const res = await fetch(url);
          const movieData = await res.json();
          const results = movieData.results;
          setMovie(results);
          localStorage.setItem("movies", JSON.stringify(results));
        } catch (error) {
          console.log(error);
        }
      };
      getMovieData();
    }
  }, []);

  if (movie.length === 0) {
    return (
      <div>
        <p>로딩중...</p>
      </div>
    );
  }

  return (
    <>
      <Menu />
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {movie.map((movie) => (
            <div
              key={movie.id}
              onClick={() => nav(`/movie/${movie.id}`)}
              className="w-full cursor-pointer"
            >
              <img
                className="img"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : `https://placehold.co/500x750/222/fff?text=No+Poster`
                }
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>평점: {movie.vote_average} / 10</p>
              <p>개봉일: {movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Movie;
