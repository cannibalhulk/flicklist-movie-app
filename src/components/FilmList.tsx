import { useContext, useEffect } from "react";
import { MovieApiData } from "../contexts/MovieApiData";
import { Image, Chip, Card, CardHeader, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { favoritesState, toggleFavoriteSelector } from "../recoil/atoms.recoil";
import { useRecoilState, useRecoilValue} from "recoil";

export default function FilmList() {
  const [favoritesMap, setFavorites] = useRecoilState(favoritesState);
  const toggleFavorite = useRecoilValue(toggleFavoriteSelector);
  const navigate = useNavigate();

  function handleClick(id: number) {
    navigate(id.toString());
  }

  function handleFavoriteClick(id: number) {
    const updatedFavorites = toggleFavorite(id);

      const index = updatedFavorites.findIndex((fav) => fav.id === id);
      const isFavorite = updatedFavorites[index]?.isFavorite;
      setFavorites(updatedFavorites);
      console.log(`Movie ${id} is now a favorite: ${isFavorite}`);
  }

    useEffect(() => {
      console.log(favoritesMap); // Log the updated favorites whenever it changes
    }, [favoritesMap]);

    const movie_data = useContext(MovieApiData);

    return (
      <div className="grid place-items-center grid-cols-1 space-y-3 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2  gap-4 h-5/6 w-4/5 mx-auto">
        {movie_data?.data.results.map((item) => {
          const idx = favoritesMap.findIndex((f)=> f.id === item.id);
          const isFavorite = favoritesMap[idx]?.isFavorite || false
          if (item?.poster_path !== null)
            return (
              <Card
                key={item?.id}
                className="shadow-black/50 shadow-2xl w-[300px] sm:w-[300px] md:w-[400px] h-max  hover:cursor-pointer"
              >
                <CardHeader className="flex flex-row justify-between absolute z-10 top-4 !items-start">
                  <Chip
                    startContent={<FaStar className="text-[#DCDBD8]" size={26} />}
                    className="bg-[#1B487A] text-[#DCDBD8] text-[18px] py-5 drop-shadow-sm shadow-[#1B487A]"
                    variant="shadow"
                  >
                    {item?.vote_average.toFixed(1)}
                  </Chip>
                  <Button
                    isIconOnly
                    radius="full"
                    onClick={() => handleFavoriteClick(item?.id)}
                    className="bg-[#1B487A] text-[#DCDBD8] drop-shadow-sm shadow-[#1B487A]"
                    variant="shadow"
                  >
                    {isFavorite ? (
                      <MdFavorite className="text-red-600" size={26} />
                    ) : (
                      <MdFavoriteBorder size={26} />
                    )}
                  </Button>
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