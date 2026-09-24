import { useState, useEffect } from "react";

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
        const res = await fetch("https://jsonfakery.com/movies/paginated");
        const movieData = await res.json();
        setMovie(movieData.data);
        console.log(movieData);
      } catch (error) {
        console.log(error);
      }
    };

    getMovieData();
  }, []);

  if (movie.length === 0) return <div>로딩 중...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movie.map((movie) => (
        <div key={movie.id} className="w-full">
          <img src={movie.poster_path} alt={movie.original_title} />
          <h3>{movie.original_title}</h3>
          <p>평점: {movie.vote_average}</p>
          <p>개봉일: {movie.release_date}</p>
          
        </div>
      ))}
    </div>
  );
};

export default Movie;
