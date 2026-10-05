import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const nav = useNavigate();
  return (
    <>
      <p>잘못된 페이지입니다.</p>
      <button onClick={() => nav('/')}>돌아가기</button>
    </>
  );
};

export default NotFoundPage;
