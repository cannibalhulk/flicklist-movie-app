import { useState, useEffect, useMemo, } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";
import {years} from '../data/searchSelectionData'
// import useData from "../hooks/useData";
// import { ApiSearchTitleType } from "../types/ApiSearchTitleType";
import axios from "axios";
import FilmList from "./FilmList";
import { MovieApiData } from "../contexts/MovieApiData";


export default function SearchField() {
  const [title, setTitle] = useState("");
  const [clicked, setClicked] = useState(false)
  const [data, setData] = useState([])
  const [selectedYear, setSelectedYear] = useState('')

  const options = useMemo(()=>{
    return {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {
        query: `${title.length === 0 ? 'avengers': title}`, 
        year: selectedYear || null,
        include_adult: 'false', 
        language: 'en-US', 
        page: '1'
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_KEY}`
  }
    }
  },[title,selectedYear]) 

  useEffect(()=>{
    
    const loadMovies = async() => {
      const response = await axios.request(options)
      setData(response.data.results)
    }

    loadMovies()
  },[clicked, options])
  

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

  }

  function handleSelectChange(e:React.ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(e.target.value);
  }
  return (
    <>
      <div className="flex mb-4 justify-between items-center min-h-full">
        <Input
          variant="faded"
          value={title}
          onChange={(e) => handleChange(e)}
          isClearable
          className="px-4 w-[400px] text-[#111] placeholder-[30px] font-semibold text-[34px]"
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

      <div className="min-w-full flex flex-col items-center">
          <Select
            value={selectedYear}
            label="Select a year"
            placeholder="Year"
            variant="bordered"
            classNames={{
              popover:[
                "bg-[#555]"
              ],
              innerWrapper: [
                'bg-[#d4d4d8]',
                'text-black'
              ],
              trigger: [
                'bg-[#d4d4d8]'
              ],
              selectorIcon:[
                'text-black'
              ]
            }}
            className="px-4 w-[200px] text-[#fff] placeholder-[30px] font-semibold text-[34px]"
            onChange={(e)=>handleSelectChange(e)}
          >
            {
              years.map((year)=>(
                <SelectItem
                  classNames={{
                    wrapper:[
                      "bg-slate-500"
                    ],
                    base:[
                      "bg-[#444]"
                    ]
                  }}
                  key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))
            }
          </Select>
          
      </div>

      <div className=" bg-gradient-to-bl from-[#4d4d4d] from-20% to-[#333533ce] md:min-h-screen lg:min-w-screen min-w-full rounded-tl-[45px] rounded-tr-[45px] pt-10 mt-10 pb-10">
        <MovieApiData.Provider value={data}>
          <FilmList />
        </MovieApiData.Provider>
      </div>
    </>
    
    
  );
}
