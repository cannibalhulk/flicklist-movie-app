import { atom } from "recoil";

type MovieType = {
    id: number; // Unique movie ID
    isFavorite: boolean; // "add to fav" button active state
  };

export const favoritesState = atom<MovieType[]>({
    key: "favoritesState",
    default:[]
})