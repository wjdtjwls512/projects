import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import "./MovieInfo.css";
import { isFavorite, toggleFavorite } from "../lib/favorites";

const API_KEY = import.meta.env.VITE_API_KEY;

interface MovieItem {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

const MovieInfo = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState<MovieItem | null>(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`;
    const getMovieInfoData = async () => {
      try {
        const movieInfo = await axios.get(url);
        setMovieInfo(movieInfo.data);
        setFavorite(isFavorite(movieInfo.data.id));
      } catch (error) {
        console.log(error);
      }
    };
    getMovieInfoData();
  }, [id]);
  if (!movieInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <Menu />
      <main className="Info">
        <div className="info-section">
          <div className="detail-poster">
            <img
              src={
                movieInfo.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`
                  : `https://placehold.co/500x750/222/fff?text=No+Poster`
              }
              alt={`${movieInfo.title} 포스터`}
            />
          </div>
          <div className="detail-copy">
            <p className="eyebrow">FILM DETAIL</p>
            <h1>{movieInfo.title}</h1>
            <div className="film-meta">
              <span>★ {movieInfo.vote_average.toFixed(1)}</span>
              <span>{movieInfo.release_date || "개봉일 미정"}</span>
            </div>
            <p className="overview">{movieInfo.overview || "아직 등록된 줄거리가 없습니다."}</p>
            <div className="detail-actions"><button onClick={() => setFavorite(toggleFavorite(movieInfo))}>{favorite ? "♥ 찜한 영화" : "♡ 찜하기"}</button><button onClick={() => nav(-1)}>← 목록으로 돌아가기</button></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MovieInfo;
