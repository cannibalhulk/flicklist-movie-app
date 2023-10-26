import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MovieDetailsResponseType } from "../types/MovieDetailsResponseType";
import { Image, Button, Tooltip } from "@nextui-org/react";
import {AiOutlineArrowLeft} from 'react-icons/ai'
import axios from "axios";

export default function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState<MovieDetailsResponseType | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();


  // button click function

  function handleClick(e:React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate('/movie')
  }

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
    <div className="p-20 flex min-h-screen bg-[#3f3f3f] flex-col space-y-6">
        <Button
            radius="full"
            variant="flat"
            isIconOnly
            onClick={(e)=>handleClick(e)}
            className="bg-blue-300"
        >
            <AiOutlineArrowLeft className="text-blue-600" />
        </Button>
      <section className="container min-w-full p-10 rounded-2xl bg-[#313131]">
        <div className="flex ">
            <div className="flex flex-col items-center space-y-5 mr-10">
                <Image
                    src={"https://image.tmdb.org/t/p/original" + movieDetail?.poster_path}
                    width={300}
                    loading="lazy"
                    alt={movieDetail?.tagline}
                />
                <Tooltip  className="bg-blue-300 text-black  min-w-1/4" content={movieDetail?.vote_count}>
                    <Button className="text-white w-2/4" variant="bordered">
                        Vote Count
                    </Button>
                </Tooltip>
            </div>
            <div className="flex flex-col space-y-4">
                <h1 className="font-lexendMd text-[28px] ">{movieDetail?.title}</h1>
                <p className="font-lexend text-[15px] text-[#999] w-[400px]">{movieDetail?.overview}</p>

            </div>
            
        </div>
      </section>
    </div>
  );
}
