import { FavoritesStateType } from "../recoil/atoms.recoil";
import { getFromLocalStorage } from "./getFromLocalStorage";
import { saveToLocalStorage } from "./saveToLocalStorage";

export const deleteItemFromLocalStorage = (key: string, id:number) => {
  const data = getFromLocalStorage(key);
  if (data) {
    const updatedData = data.filter((storedItem: FavoritesStateType) => storedItem.id !== id);
    saveToLocalStorage(key, updatedData);
  }
};
