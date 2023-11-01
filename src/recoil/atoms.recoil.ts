import { atom, selector } from "recoil";

export type FavoritesStateType = {
    id: number; // Unique movie ID
    isFavorite: boolean; // "add to fav" button active state
  };

export const favoritesState = atom({
    key: "favoritesState",
    default:{}
})



export const toggleFavoriteSelector = selector({
  key: 'toggleFavoriteSelector',
  get: ({ get }) => (movieId: number) => {
    const currentFavorites = { ...get(favoritesState) };
    
    // Toggle the favorite state for the movie ID
    currentFavorites[movieId] = !currentFavorites[movieId];

    return currentFavorites;
  },
});