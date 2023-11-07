import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MovieDetailsResponseType } from "../types/MovieDetailsResponseType";
import { Image, Button, Tooltip, Chip } from "@nextui-org/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { DollarSign, CalendarDays } from "lucide-react";
import SkeletonUi from "../components/SkeletonUi";
import axios from "axios";
import Reviews from "./Reviews";
export default function MovieDetail() {
  const [movieDetail, setMovieDetail] =  useState<MovieDetailsResponseType | null>(null);
  const [isLoading, setLoading] = useState<boolean | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    // button click function
    e.preventDefault();
    navigate("/movie");
  }

  const options = useMemo(() => { // catching previous results according to movie_id
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
      setLoading(true);
      const response = await axios.request(options);
      if (response.status !== 200) {
        throw Error("Could not find that movie");
      }
      setMovieDetail(response.data);
      setLoading(false);
    }

    fetchMovieData();
  }, [options]);

  return (
    <div className="md:p-20 flex min-h-screen bg-[#313131] md:bg-[#3f3f3f] flex-col space-y-6">
      <div className="hidden md:block">
        <Button
          radius="full"
          variant="flat"
          isIconOnly
          onClick={(e) => handleClick(e)}
          className="bg-blue-300"
        >
          <AiOutlineArrowLeft className="text-black" />
        </Button>
      </div>
      <section className="container min-w-full p-10 rounded-2xl bg-[#313131] max-w-[500px]">
        {isLoading ? (
          <SkeletonUi />
        ) : (
          <section className="min-[780px]:flex min-[780px]:flex-col md:min-[780px]:w-full md:max-[1300px]:w-2/4 min-[1300px]:grid min-[1000px]:grid-cols-2 gap-8  place-items-center  md:max-[1300px]:place-items-center px-6">
            <div className="grid-cols-1 place-items-start mb-11 md:mb-0  md:grid md:grid-cols-2 gap-2  md:flex-row">
              <div className="flex flex-col items-center space-y-5 mb-4 md:mb-0 min-w-full  mr-10">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/original" +
                    movieDetail?.poster_path
                  }
                  width={300}
                  loading="lazy"
                  alt={movieDetail?.tagline}
                />
                <Tooltip
                  className="bg-blue-300 text-black  min-w-1/4"
                  content={movieDetail?.vote_count}
                >
                  <Button className="text-white text-[13px] md:w-full md:text-[16px]  w-2/4" variant="bordered">
                    FlickList Vote Count
                  </Button>
                </Tooltip>
              </div>
              <div className=" flex flex-col justify-between">
                <div className="flex flex-col space-y-7 items-center md:items-start ">
                  <h1 className="font-lexendMd text-[28px]  ">
                    {movieDetail?.title}
                  </h1>

                  {movieDetail?.overview && (
                    <p className="font-lexend text-[15px] text-[#999] md:max-w-[400px] min-h-[40px]">
                      {movieDetail?.overview}
                    </p>
                  )}

                  <div className="flex">
                    {movieDetail?.genres.map((genre) => (
                      <Chip
                        key={genre.id}
                        variant="faded"
                        className="mr-5 text-white bg-transparent border-white shadow-blue-500"
                      >
                        {genre?.name}
                      </Chip>
                    ))}
                  </div>

                  <div className="flex  space-x-3">
                    <h3>Budget:</h3>
                    <Chip
                      className="bg-white/30 text-white"
                      startContent={
                        <DollarSign
                          className="rounded-full text-white"
                          size={17}
                        />
                      }
                    >
                      {movieDetail?.budget}
                    </Chip>
                  </div>

                  <div className="flex  space-x-3">
                    <h3>Release Date:</h3>
                    <Chip
                      className="bg-white/30 text-white"
                      startContent={
                        <CalendarDays
                          className="rounded-full text-white"
                          size={17}
                        />
                      }
                    >
                      {movieDetail?.release_date}
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="  rounded-xl bg-zinc-900 h-[600px] w-full">
                <Reviews/>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
