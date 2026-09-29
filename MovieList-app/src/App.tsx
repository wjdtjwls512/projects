import "./App.css";
import Movie from "./components/movie";
import MovieInfo from "./components/MovieInfo";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    path: '*',
    element: <NotFoundPage />
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
