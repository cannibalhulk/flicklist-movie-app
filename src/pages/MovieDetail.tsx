import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MovieDetailsResponseType } from "../types/MovieDetailsResponseType";
import { Image, Button, Tooltip, Chip } from "@nextui-org/react";
import {AiOutlineArrowLeft} from 'react-icons/ai'
import SkeletonUi from "../components/SkeletonUi";
import axios from "axios";
export default function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState<MovieDetailsResponseType | null>(null);
  const [isLoading, setLoading] = useState<boolean | null>(null)
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
      setLoading(true)
      const response = await axios.request(options);
      if (response.status !== 200) {
        throw Error("Could not find that movie");
      }
      setMovieDetail(response.data);
      setLoading(false)
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
            <AiOutlineArrowLeft className="text-black" />
        </Button>
      <section className="container min-w-full p-10 rounded-2xl bg-[#313131]">
        {isLoading ? (<SkeletonUi />) : (
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
                        FlickList Vote Count
                    </Button>
                </Tooltip>
            </div>
            <div className=" flex flex-col justify-between space-y-4">
              <div className="flex flex-col space-y-7">
                <h1 className="font-lexendMd text-[28px] mb-4 ">{movieDetail?.title}</h1>
                
                <p className="font-lexend text-[15px] text-[#999] w-[400px] min-h-[40px]">
                  {movieDetail?.overview}
                </p>
                <div className="flex">
                  {movieDetail?.genres.map(genre=>(
                      <Chip
                      variant="faded"
                      className="mr-5 text-white bg-transparent border-white shadow-blue-500" 
                      >{genre?.name}</Chip>
                  ))}
                                
                </div>
                
              </div>
              
            </div>
            
        </div>
        )}
        
      </section>
    </div>
  );
}
