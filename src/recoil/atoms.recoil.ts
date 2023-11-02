import { atom, selector } from "recoil";

export type FavoritesStateType = {
    id: number; // Unique movie ID
    isFavorite: boolean; // "add to fav" button active state
  };

export const favoritesState = atom<FavoritesStateType[]>({
    key: "favoritesState",
    default:[]
})



export const toggleFavoriteSelector = selector({
  key: 'toggleFavoriteSelector',
  get: ({ get })=> (movieId:number) => {
    const currentFavorites = [...get(favoritesState)];

    const index = currentFavorites.findIndex((fav) => fav.id === movieId);

    if (index !== -1) {
      currentFavorites[index].isFavorite = !currentFavorites[index].isFavorite;
    } else {
      currentFavorites.push({ id: movieId, isFavorite: true });
    }

    return currentFavorites;
  },
});