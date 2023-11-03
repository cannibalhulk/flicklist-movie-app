import { atom, selector } from "recoil";
import { getFromLocalStorage } from "../functions/getFromLocalStorage";

export type FavoritesStateType = {
  id: number; // Unique movie ID
  isFavorite: boolean; // "add to fav" button active state
};

const initialFavoriteMovies = getFromLocalStorage('favoriteMovies') || [];

export const favoriteMoviesState = atom<FavoritesStateType[]>({
  key: "favoriteMoviesState",
  default: initialFavoriteMovies,
});

export const favoriteMoviesSelector = selector({
  key: "favoriteMoviesSelector",
  get: ({ get }) => {
    const favoriteMovies = get(favoriteMoviesState);
    return favoriteMovies;
  },
  set: ({ get, set }, movie) => {
    const favoriteMovies = get(favoriteMoviesState);
    const movieIndex = favoriteMovies.findIndex((m) => m.id === movie.id);

    if (movieIndex === -1) {
      // Movie is not in the favorite list, add it.
      set(favoriteMoviesState, [...favoriteMovies, movie]);
    } else {
      // Movie is in the favorite list, remove it.
      const updatedFavorites = [
        ...favoriteMovies.slice(0, movieIndex),
        ...favoriteMovies.slice(movieIndex + 1),
      ];
      set(favoriteMoviesState, updatedFavorites);
    }
  },
});
