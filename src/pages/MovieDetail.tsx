import {useMemo} from 'react'
import { useParams, useLoaderData } from 'react-router-dom'
import { MovieDetailsParamsType } from '../types/MovieDetailParamsType';
import axios from 'axios';

export  default function MovieDetail () {
    const {movieId} = useParams();
    const {movieDetail} = useLoaderData();

    return (
        <div className="container">
            <h1>{movieDetail}</h1>
        </div>
    )
}

export const MovieDetailsLoader= async({params} : {params:MovieDetailsParamsType}) =>{
    const {movieId} = params;

    const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_KEY}`
            }
    }

    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,options);

    return response.json();

}