import Menu from "../components/Menu";
import { getFavorites } from "../lib/favorites";

const MyPage = () => {
  const count = getFavorites().length;
  return (
    <>
      <Menu />
      <main className="profile-page"><p className="eyebrow">MY CINEFILE</p><h1>나의 영화 기록</h1><p>보고 싶은 이야기와 취향을 차곡차곡 쌓아보세요.</p><strong className="stat">{count}</strong><span>찜한 영화</span></main>
    </>
  );
};

export default MyPage;
