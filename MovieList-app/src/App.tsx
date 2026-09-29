import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Movie from "./components/movie";
import MovieInfo from "./components/MovieInfo";
import Heart from "./components/Heart";
import MyPage from "./components/MyPage";
import NotFoundPage from "./components/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Movie />,
  },
  {
    path: "/movie/:id",
    element: <MovieInfo />,
  },
  {
    path: "/heart",
    element: <Heart />,
  },
  {
    path: '/mypage',
    element: <MyPage />
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
