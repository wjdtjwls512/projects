import { useNavigate } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const nav = useNavigate();
  return (
    <div className="Menu">
      <ul className="menu-list">
        <li onClick={() => nav("/")}>
          영화
          <ul className="sub-list">
            <li>인기작</li>
            <li>현재 상영중인 영화</li>
          </ul>
        </li>
        <li onClick={() => nav("/heart")}>찜 목록</li>
        <li onClick={() => nav("/mypage")}>마이페이지</li>
      </ul>
    </div>
  );
};

export default Menu;
