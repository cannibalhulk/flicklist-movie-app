import App from "../App";
import Movie from "../pages/Movie";
import MovieDetail from "../pages/MovieDetail";
import { MovieDetailsLoader } from "../pages/MovieDetail";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movie",
    element: <Movie />,
    loader: ()=>MovieDetailsLoader,
    children: [
      {
        path:"/movie/:movieId",
        element: <MovieDetail/>,
      }
    ]
  },
  
]);