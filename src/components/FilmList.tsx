import { useContext } from "react";
import { MovieApiData } from "../contexts/MovieApiData";
import { Image, Chip, Card, CardHeader } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

export default function FilmList() {
  const navigate = useNavigate();

  function handleClick(id: number) {
    navigate(id.toString());
  }

  const movie_data = useContext(MovieApiData);

  return (
    <div className="grid grid-cols-1 space-y-3 md:grid-cols-3 grid-rows-3 md:grid-rows-2 first-of-type:grid-flow-row-dense gap-4 h-5/6 w-4/5 mx-auto">
      {movie_data.map((item) => {
        if (item?.poster_path !== null)
          return (
            <Card className="w-[400px] h-max  hover:cursor-pointer">
              <CardHeader className="absolute z-10 top-4 flex-col !items-start">
                <Chip
                  startContent={<FaStar />}
                  className="bg-blue-300 drop-shadow-sm shadow-blue-400"
                  variant="shadow"
                >
                  {item?.vote_average.toFixed(1)}
                </Chip>
              </CardHeader>
              <Image
                removeWrapper
                onClick={() => handleClick(item?.id)}
                className="z-0 object-contain"
                src={"https://image.tmdb.org/t/p/original" + item?.poster_path}
                width={400}
                isZoomed={true}
                loading="lazy"
                alt={item?.overview}
              />
            </Card>
          );
      })}
    </div>
  );
}
