import {useMemo} from 'react'
import { useParams, useLoaderData } from 'react-router-dom'
import { MovieDetailsParamsType } from '../types/MovieDetailParamsType';
import axios from 'axios';

export  default function MovieDetail () {
    const {movieId} = useParams();
    const {movieDetail} = useLoaderData();

    return (
        <div className="container">

        </div>
    )
}

export const MovieDetailsLoader= async({params} : {params:MovieDetailsParamsType}) =>{
    const {movieId} = params;

    const options = useMemo(()=>{
        return {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movieId}`,
            params: {
                language: 'en-US', 
            },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_KEY}`
                }
        }
    },[movieId]) 

    const response = await axios.request(options);

    return response.data;

}