import { useRecoilValue } from "recoil";
import { favoriteMoviesSelector } from "../recoil/atoms.recoil";
import { useEffect, useMemo, useState } from "react";
import { ResultType } from "../types/MovieDataType";
import { Card, CardBody, CardHeader, Image, Link } from "@nextui-org/react";

function Favorites() {
  const favoriteMovies = useRecoilValue(favoriteMoviesSelector);
  const movie_ids: number[] = useMemo(() => [], []);
  const [movie_details, setMovieDetails] = useState<ResultType[]>([]);

  for (let i = 0; i < favoriteMovies.length; i++) {
    movie_ids.push(favoriteMovies[i].id);
  }

  const options = useMemo(() => {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_KEY}`,
      },
    };
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const promises = movie_ids.map(async (movieId) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );
        const data = await response.json();
        return data; // Details of the movie
      });

      const details = await Promise.all(promises);
      setMovieDetails(details);
    };

    fetchMovieDetails();
  }, [movie_ids, options]);

  return (
    <div className="flex min-h-screen pt-3 bg-[#3f3f3f] flex-col items-center  text-xl">
      <h1 className="py-3 font-lexendMd mb-20 font-bold text-[35px]  flex items-end space-x-1">
        <p className="drop-shadow-[0_3px_3px_rgba(225,225,225,1)]">Favorites</p>
        <div className="rounded-full w-[10px]  h-[10px] bg-[#68a8e9]"></div>
        <div className="rounded-full w-[10px]  h-[10px] bg-[#e9686e]"></div>
        <div className="rounded-full w-[10px]  h-[10px] bg-[#68e9a2]"></div>
      </h1>
      <section className="flex flex-col justify-center">
        {movie_details.map((movie) => (
          <Link href={`movie/${movie.id.toString()}`} key={movie.id}>
            <Card  className="mb-10 p-1 w-[400px] flex flex-1 justify-items-center ">
              <CardHeader className="">
                <Image
                  width={200}
                  src={
                    "https://image.tmdb.org/t/p/original" + movie?.poster_path
                  }
                />
              </CardHeader>
              <CardBody className="flex flex-col">
                <h1 className="text-2xl text-black">{movie.title}</h1>
              </CardBody>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default Favorites;
