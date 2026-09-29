import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./MovieInfo.css";

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

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`;
    const getMovieInfoData = async () => {
      try {
        const movieInfo = await axios.get(url);
        setMovieInfo(movieInfo.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieInfoData();
  }, []);
  if (!movieInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div>
        <h1>영화정보</h1>
        <img
          src={
            movieInfo?.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`
              : `https://placehold.co/500x750/222/fff?text=No+Poster`
          }
          alt=""
        />
        <p>{movieInfo.title}</p>
        <p>평점: {movieInfo.vote_average}</p>
        <p>개봉일: {movieInfo.release_date}</p>
        <p>{movieInfo.overview}</p>
        <button onClick={() => nav(-1)}>뒤로 가기</button>
      </div>
    </>
  );
};

export default MovieInfo;
