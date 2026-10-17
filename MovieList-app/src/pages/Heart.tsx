import Menu from "../components/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavorites, toggleFavorite, type SavedMovie } from "../lib/favorites";

const Heart = () => {
  const nav = useNavigate(); const [favorites, setFavorites] = useState<SavedMovie[]>(getFavorites);
  return (
    <>
      <Menu />
      <main className="collection-page"><p className="eyebrow">YOUR COLLECTION</p><h1>찜한 영화</h1><p>{favorites.length}편을 모아두었어요.</p>{favorites.length ? <div className="favorite-grid">{favorites.map((movie) => <article key={movie.id} className="favorite-card"><img onClick={() => nav(`/movie/${movie.id}`)} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://placehold.co/500x750/222/fff?text=No+Poster"} alt={`${movie.title} 포스터`} /><h2>{movie.title}</h2><button onClick={() => { toggleFavorite(movie); setFavorites(getFavorites()); }}>찜 삭제</button></article>)}</div> : <button onClick={() => nav("/")}>영화 둘러보기</button>}</main>
    </>
  );
};

export default Heart;
