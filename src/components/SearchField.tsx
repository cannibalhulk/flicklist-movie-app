"use client"

import { useState, useEffect, useMemo,} from "react";
import { Input, Button, Select } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";
import useData from "../hooks/useData";
import { ApiSearchTitleType } from "../types/ApiSearchTitleType";
import axios from "axios";
import FilmList from "./FilmList";
import { MovieApiData } from "../contexts/MovieApiData";


export default function SearchField() {
  const [title, setTitle] = useState("");
  const [clicked, setClicked] = useState(false)
  const [data, setData] = useState([])

  
  // const options = useMemo(()=>{
  //   return {
  //     method: 'GET',
  //     url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}`,
  //     params: {
  //       exact: 'false',
  //       titleType: 'movie'
  //     },
  //     headers: {
  //       'X-RapidAPI-Key': import.meta.env.VITE_X_RapidAPI_Key,
  //       'X-RapidAPI-Host': import.meta.env.VITE_X_RapidAPI_Host
  //     }
  //   }
  // },[title]) 

  useEffect(()=>{
    const options = {
      method: 'GET',
      url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}`,
      params: {
        exact: 'false',
        titleType: 'movie'
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_X_RapidAPI_Key,
        'X-RapidAPI-Host': import.meta.env.VITE_X_RapidAPI_Host
      }
    }
    const loadMovies = async() => {
      const response = await axios.request(options)
      setData(response.data.results)
    }

    loadMovies()
  },[clicked, title])
  

  //FIXME:
  // const my_movie_prop_obj: ApiSearchTitleType = {
  //   api_link: "https://moviesdatabase.p.rapidapi.com/titles/search/title/",
  //   query_key: ["movie"],
  //   titleType: "movie",
  //   year: "2023",
  //   title: title,
  // };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setClicked(true)
    console.log(data);
  }
  return (
    <>
      <div className="flex justify-between items-center min-h-full">
        <Input
          variant="faded"
          value={title}
          onChange={(e) => handleChange(e)}
          isClearable
          className="px-4 w-[400px] text-[#111] placeholder-[30px] placeholder-red font-semibold text-[34px]"
          label="Search a movie by title"
          onClear={() => {
            setTitle("");
          }}
        />
        <Button
          onClick={(e) => handleClick(e)}
          isIconOnly
          className="bg-[#006FEE]"
        >
          <BiSearch className="text-white" />
        </Button>
      </div>

      <div className=" bg-gradient-to-bl from-[#4d4d4d] from-20% to-[#333533ce] md:min-h-screen lg:min-w-screen min-w-full rounded-md p-10 mt-10">
        <MovieApiData.Provider value={data}>
          <FilmList />
        </MovieApiData.Provider>
      </div>
    </>
    
    
  );
}
