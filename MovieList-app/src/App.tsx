import "./App.css";
import Movie from "./components/movie";
import MovieInfo from "./components/MovieInfo";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Movie />,
  },
  {
    path: "/info",
    element: <MovieInfo />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
