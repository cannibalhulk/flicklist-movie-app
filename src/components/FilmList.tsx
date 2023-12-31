import { block } from 'million/react';
import { useContext } from "react";
import { MovieApiData } from "../contexts/MovieApiData";
import { Image, Chip, Card, CardHeader, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import {
  FavoritesStateType,
  favoriteMoviesSelector,
  favoriteMoviesState,
} from "../recoil/atoms.recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { saveToLocalStorage } from "../functions/saveToLocalStorage";
import { deleteItemFromLocalStorage } from "../functions/deleteFromLocalStorage";

const FilmList = block(()=> {
  const favoriteMovies: FavoritesStateType[] = useRecoilValue(favoriteMoviesSelector);
  const setFavoriteMovies = useSetRecoilState(favoriteMoviesState);

  const navigate = useNavigate();
  function handleClick(id: number) {
    navigate(id.toString());
  }

  function handleFavoriteClick(id: number) {
    // Find the index of the movie in the list
    const index = favoriteMovies.findIndex((fav) => fav.id === id);
  
    if (index !== -1) {
      // Movie is in the favorite list, remove it.
      const updatedFavorites = [
        ...favoriteMovies.slice(0, index),
        ...favoriteMovies.slice(index + 1),
      ];
      setFavoriteMovies(updatedFavorites);
      deleteItemFromLocalStorage('favoriteMovies', id);
    } else {
      // Movie is not in the favorite list, add it.
      const updatedFavorites = [...favoriteMovies, { id, isFavorite: true }];
      saveToLocalStorage('favoriteMovies', updatedFavorites);
      setFavoriteMovies(updatedFavorites);
    }
  }

  const movie_data = useContext(MovieApiData);

  return (
    <div className="grid place-items-center grid-cols-1 space-y-3 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2  gap-4 h-5/6 w-4/5 mx-auto">
      {movie_data?.data.results.map((item) => {
        const idx = favoriteMovies.findIndex((f) => f.id === item.id);
        const isFavorite = favoriteMovies[idx]?.isFavorite || false;
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
});

export default FilmList;
