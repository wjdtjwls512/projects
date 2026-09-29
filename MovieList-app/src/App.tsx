import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Movie from "./pages/Movie";
import MovieInfo from "./pages/MovieInfo";
import Heart from "./pages/Heart";
import MyPage from "./pages/MyPage";
import NotFoundPage from "./pages/NotFoundPage";

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
    path: "/mypage",
    element: <MyPage />,
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
