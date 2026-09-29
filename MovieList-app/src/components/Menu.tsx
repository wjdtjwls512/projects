import { useNavigate } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const nav = useNavigate();
  return (
    <div className="Menu">
      <ol className="menu-list">
        <li onClick={() => nav("/")}>영화</li>
        <li onClick={() => nav("/heart")}>찜 목록</li>
        <li onClick={() => nav("/mypage")}>마이페이지</li>
      </ol>
    </div>
  );
};

export default Menu;
