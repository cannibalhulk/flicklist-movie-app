import { createContext } from "react";
import { MovieDataType } from "../types/MovieDataType";

export const MovieApiData = createContext<MovieDataType | null>(null)
