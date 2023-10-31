import App from "../App";
import Favorites from "../pages/Favorites";
import Movie from "../pages/Movie";
import MovieDetail from "../pages/MovieDetail";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movie",
    element: <Movie />
  },
  {
    path: "/movie/:id",
    element: <MovieDetail />,
  },
  {
    path: "/favorites",
    element: <Favorites/>
  }
]);
