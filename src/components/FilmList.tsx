import { useContext, useState } from "react";
import { MovieApiData } from "../contexts/MovieApiData";
import { Image, Chip, Card, CardHeader } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { favoritesState } from "../recoil/atoms.recoil";
import { useRecoilState } from "recoil";

export default function FilmList() {
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  function handleClick(id: number) {
    navigate(id.toString());
  }

  function handleFavoriteClick(id: number) {
    setActive(true);
    if (favorites.includes(id)) {
      setFavorites((prevFavs) => prevFavs.filter((item) => item !== id));
      } else {
        setFavorites([...favorites, id]);
      }
    }
  

  const movie_data = useContext(MovieApiData);

  return (
    <div className="grid place-items-center grid-cols-1 space-y-3 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2  gap-4 h-5/6 w-4/5 mx-auto">
      {movie_data?.results.map((item) => {
        if (item?.poster_path !== null)
          return (
            <Card
              key={item?.id}
              className="shadow-black/50 shadow-2xl w-[300px] sm:w-[300px] md:w-[400px] h-max  hover:cursor-pointer"
            >
              <CardHeader className="flex flex-row justify-between absolute z-10 top-4 !items-start">
                <Chip
                  startContent={<FaStar className="text-black"  size={20} />}
                  className="bg-blue-300 drop-shadow-sm shadow-blue-400"
                  variant="shadow"
                >
                  {item?.vote_average.toFixed(1)}
                </Chip>
                <Chip
                  onClick={() => handleFavoriteClick(item?.id)}
                  className="bg-blue-300 drop-shadow-sm shadow-blue-400"
                  variant="shadow"
                  classNames={{
                    base: "flex justify-center items-center",
                    content: "flex justify-center items-center",
                  }}
                  startContent={active ? <MdFavorite className="text-red-600" size={20} /> : <MdFavoriteBorder size={20}/>}
                >
                  {active ? "Remove fav": "Add to favs"}
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
