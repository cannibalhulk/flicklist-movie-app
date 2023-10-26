import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetailsResponseType } from "../types/MovieDetailsResponseType";
import { Image } from "@nextui-org/react";
import axios from "axios";

export default function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState<MovieDetailsResponseType | null>(null);
  const { id } = useParams();

  const options = useMemo(() => {
    return {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}`,
      params: {
        language: "en-US",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_KEY}`,
      },
    };
  }, [id]);

  useEffect(() => {
    async function fetchMovieData() {
      const response = await axios.request(options);
      if (response.status !== 200) {
        throw Error("Could not find that movie");
      }
      console.log(response.data);
      setMovieDetail(response.data);
    }

    fetchMovieData();
  }, [options]);

  return (
    <div className="p-20 flex min-h-screen bg-[#3f3f3f] flex-col items-center  text-xl">
      <section className="container">
        <div className="grid grid-rows-2 place-items-start items-baseline">
            <Image
                src={"https://image.tmdb.org/t/p/original" + movieDetail?.poster_path}
                width={300}
                loading="lazy"
                alt={movieDetail?.tagline}
            />
            <h1 className="">{movieDetail?.title}</h1>
        </div>
      </section>
    </div>
  );
}
