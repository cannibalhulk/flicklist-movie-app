import { atom } from "recoil";

export type FavoritesStateType = {
    favoriteList: number[];
}

export const favoritesState = atom({
    key: "favoritesState",
    default: <FavoritesStateType>{
        favoriteList: [],
        
    }
})