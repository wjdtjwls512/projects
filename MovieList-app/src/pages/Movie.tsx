import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Menu from "../components/Menu";
import "./Movie.css";

const API_KEY = import.meta.env.VITE_API_KEY;

interface MovieItem {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const Movie = () => {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const category =
    params.get("category") === "popular" ? "popular" : "now_playing";
  const [movie, setMovie] = useState<MovieItem[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const [error, setError] = useState(false);
  useEffect(() => {
    const getMovieData = async () => {
      try {
        setError(false);
        const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR&region=KR`;
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const movieData = await res.json();
        const results = movieData.results;
        setMovie(results);
      } catch {
        setError(true);
      }
    };
    getMovieData();
  }, [category]);
  const visibleMovies = movie
    .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) =>
      sort === "rating"
        ? b.vote_average - a.vote_average
        : sort === "latest"
          ? b.release_date.localeCompare(a.release_date)
          : 0,
    );

  if (error)
    return (
      <>
        <Menu />
        <main className="feedback-page">
          <p className="eyebrow">CONNECTION ERROR</p>
          <h1>영화를 불러오지 못했어요.</h1>
          <button onClick={() => window.location.reload()}>다시 시도</button>
        </main>
      </>
    );

  if (movie.length === 0) {
    return (
      <div className="app-shell">
        <Menu />
        <div className="loading-state" aria-live="polite">
          <span className="loading-orb" />
          <p>오늘의 영화를 불러오는 중입니다</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Menu />
      <main className="movie-page">
        <section className="movie-intro">
          <p className="eyebrow">
            {category === "popular"
              ? "POPULAR NOW · KOREA"
              : "NOW SHOWING · KOREA"}
          </p>
          <h1>
            오늘, 어떤 장면을
            <br />
            <em>기억하고 싶나요?</em>
          </h1>
          <p className="intro-copy">
            지금 극장에서 만날 수 있는 이야기를 골라보세요.
          </p>
        </section>
        <section
          className="movie-collection"
          aria-labelledby="now-showing-title"
        >
          <div className="collection-heading">
            <h2 id="now-showing-title">
              {category === "popular" ? "인기작" : "현재 상영 중"}
            </h2>
            <span>{visibleMovies.length}편의 영화</span>
          </div>
          <div className="movie-tools">
            <input
              aria-label="영화 검색"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="제목으로 검색"
            />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="정렬"
            >
              <option value="default">기본 정렬</option>
              <option value="rating">평점 높은 순</option>
              <option value="latest">최신 개봉순</option>
            </select>
          </div>
          <div className="movie-grid">
            {visibleMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => nav(`/movie/${movie.id}`)}
                className="movie-card"
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ")
                    nav(`/movie/${movie.id}`);
                }}
              >
                <div className="poster-frame">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : `https://placehold.co/500x750/222/fff?text=No+Poster`
                    }
                    alt={movie.title}
                  />
                  <span className="score">
                    ★ {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <div className="card-copy">
                  <h3>{movie.title}</h3>
                  <p>
                    {movie.release_date
                      ? movie.release_date.slice(0, 4)
                      : "개봉일 미정"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {!visibleMovies.length && (
            <p className="no-results">검색 결과가 없습니다.</p>
          )}
        </section>
      </main>
    </>
  );
};

export default Movie;
