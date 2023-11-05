import { useRecoilValue } from "recoil";
import { favoriteMoviesSelector } from "../recoil/atoms.recoil";
import { useEffect, useMemo, useState } from "react";
import { ResultType } from "../types/MovieDataType";
import toast, { Toaster } from 'react-hot-toast';
import {
  Card,
  CardBody,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { Users2, Calendar,Trash2 } from "lucide-react";
import { deleteItemFromLocalStorage } from "../functions/deleteFromLocalStorage";

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

  const notify = () => toast.success("Item deleted successfully!",{
    icon:"🗑️",
    style:{
      borderRadius:"10px",
      backgroundColor:"#333",
      color:"#fff"
    }
  });

  function onClickHandler(id:number){
    notify()
    deleteItemFromLocalStorage("favoriteMovies", id)
  }

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
        {movie_details.length === 0 ? (
          <div className="min-h-[50vh] flex justify-center items-center text-xl">You don't have any favorite movies</div>
        ):
        movie_details.map((movie) => (
          <div key={movie.id} className="flex mb-10 space-x-2">
            <Card  className=" p-1 w-[300px] md:w-[400px] flex flex-row">
              <CardHeader className="w-auto p-0">
                <Image
                  width={100}
                  src={
                    "https://image.tmdb.org/t/p/original" + movie?.poster_path
                  }
                  alt={movie.original_title}
                />
              </CardHeader>
              <CardBody className="flex flex-col items-start space-y-2">
                <h1 className="text-md text-black font-bold ">{movie.title}</h1>
                <div className="flex items-center">
                  <Users2 size={20} />:
                  <p className="ml-2">{movie.vote_average.toFixed(1)}</p>
                </div>
                <div className="flex items-center">
                  <Calendar size={20} />:
                  <p className="ml-2">{movie.release_date}</p>
                </div>
              </CardBody>
            </Card>
            <div onClick={()=>onClickHandler(movie.id)} className="min-h-full bg-white/25 hover:bg-danger-500 cursor-pointer transition ease-out duration-250 rounded-xl  p-3 w-auto flex flex-col justify-center">
                <Trash2 />
            </div>
          </div>
        ))}
        <Toaster
          position="top-center"
        />
      </section>
    </div>
  );
}

export default Favorites;
