import { FavoritesStateType } from "../recoil/atoms.recoil";

export const saveToLocalStorage = (key: string, data: FavoritesStateType[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};
