import { useNavigate } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const nav = useNavigate();
  return (
    <header className="Menu">
      <button className="brand" onClick={() => nav("/")} aria-label="CINEFILE 홈">CINE<span>FILE</span></button>
      <ul className="menu-list">
        <li onClick={() => nav("/")}>
          영화
          <ul className="sub-list">
            <li onClick={() => nav("/?category=popular")}>인기작</li>
            <li onClick={() => nav("/")}>현재 상영중인 영화</li>
          </ul>
        </li>
        <li onClick={() => nav("/heart")}>찜 목록</li>
        <li onClick={() => nav("/mypage")}>마이페이지</li>
      </ul>
      <button className="profile-button" onClick={() => nav("/mypage")} aria-label="마이페이지">◌</button>
    </header>
  );
};

export default Menu;
