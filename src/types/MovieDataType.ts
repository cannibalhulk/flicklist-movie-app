import { FavoritesStateType } from "../recoil/atoms.recoil"

export interface ResultType {
    adult : boolean
    backdrop_path:string
    genre_ids:  number[]
    id:number
    original_language:string
    original_title:string
    overview:string
    popularity:number
    poster_path:string
    release_date:string
    title:string
    video:boolean
    vote_average:number
    vote_count:number
}


export interface MovieData {
    page: number
    results: ResultType[],
    total_pages:number,
    total_results: number
}

export interface MovieDataType {
    data: MovieData,
    favorites:FavoritesStateType[]
}
