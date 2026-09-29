import { useNavigate } from "react-router-dom";
import "./MovieInfo.css";

const MovieInfo = () => {
  const nav = useNavigate();
  return (
    <>
      <div>영화 정보</div>
      <button onClick={() => nav(-1)}>뒤로 가기</button>
    </>
  );
};

export default MovieInfo;
