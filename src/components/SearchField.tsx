import { useState, useEffect, useMemo } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Pagination,
} from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";
import { years } from "../data/searchSelectionData";
import { filters } from "../data/filterSelectionData";
import selection_sort from "../functions/selection.sort";
// import useData from "../hooks/useData";
// import { ApiSearchTitleType } from "../types/ApiSearchTitleType";
import axios from "axios";
import FilmList from "./FilmList";
import { MovieApiData } from "../contexts/MovieApiData";
import { MovieDataType, MovieData } from "../types/MovieDataType";
import { favoritesState } from "../recoil/atoms.recoil";
import {useRecoilValue} from 'recoil'

export default function SearchField() {
  const favs = useRecoilValue(favoritesState)
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState<MovieDataType | null>(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [filter, setFilter] = useState<"title" | "vote_average">("title");
  let typeFilter: "inc" | "dec" = "inc";

  const options = useMemo(() => {
    return {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: `${title.length === 0 ? "avengers" : title}`,
        year: selectedYear || null,
        include_adult: "false",
        language: "en-US",
        page: page,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_KEY}`,
      },
    };
  }, [title, selectedYear, page]);

  useEffect(() => {
    const loadMovies = async () => {
      const response = await axios.request(options);
      const filtered_result: MovieData = selection_sort(
        filter,
        response.data,
        typeFilter
      );
      const setDataObj = {
        data: filtered_result,
        favorites: favs
      }
      setData(setDataObj);
      setTotalPage(filtered_result.total_pages);
    };

    loadMovies();
  }, [ clicked, filter, options, typeFilter,favs]);

  //FIXME:
  // const my_movie_prop_obj: ApiSearchTitleType = {
  //   api_link: "https://moviesdatabase.p.rapidapi.com/titles/search/title/",
  //   query_key: ["movie"],
  //   titleType: "movie",
  //   year: "2023",
  //   title: title,
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setClicked(true);
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(e.target.value);
  }

  // type Filt = "title" | "vote_average";
  // type TypeOfFilter = "inc" | "dec";
  // type ArrType = ["title" | "vote_average", "inc" | "dec"];

  function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === ("Increasing Vote Average" || "[A-Z]")) {
      typeFilter = "inc";
      if (e.target.value === "Increasing Vote Average") {
        setFilter("vote_average");
      } else {
        setFilter("title");
      }
    } else {
      typeFilter = "dec";
      if (e.target.value === "Decreasing Vote Average") {
        setFilter("vote_average");
      } else {
        setFilter("title");
      }
    }
    console.log(e.target.value);
  }
  return (
    <>
      <div className="flex mb-4 justify-between items-center min-h-full">
        <Input
          variant="faded"
          value={title}
          onChange={(e) => handleChange(e)}
          isClearable
          className="px-4 w-[320px]  md:w-[400px] text-[#111] placeholder-[30px] font-semibold text-[34px]"
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

      <div className="min-w-full flex flex-row justify-center">
        <Select
          value={selectedYear}
          label="Select a year"
          variant="bordered"
          classNames={{
            popover: ["bg-[#555]"],
            innerWrapper: ["bg-[#d4d4d8]", "text-black"],
            trigger: ["bg-[#d4d4d8]"],
            selectorIcon: ["text-black"],
          }}
          className="px-4 w-[200px] text-[#fff] placeholder-[30px] font-semibold text-[34px]"
          onChange={(e) => handleSelectChange(e)}
        >
          {years.map((year) => (
            <SelectItem
              classNames={{
                wrapper: ["bg-slate-500"],
                base: ["bg-[#444]"],
              }}
              key={year.value}
              value={year.value}
            >
              {year.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Filter by"
          variant="bordered"
          classNames={{
            popover: ["bg-[#555]"],
            innerWrapper: ["bg-[#d4d4d8]", "text-black"],
            trigger: ["bg-[#d4d4d8]"],
            selectorIcon: ["text-black"],
          }}
          className="px-4 w-[200px] text-[#fff] placeholder-[30px] font-semibold text-[34px]"
          onChange={(e) => handleFilterChange(e)}
        >
          {filters.map((filter) => {
            return (
              <SelectItem
                classNames={{
                  wrapper: ["bg-slate-500"],
                  base: ["bg-[#444]"],
                }}
                key={filter.label}
                value={filter.value}
              >
                {filter.label}
              </SelectItem>
            );
          })}
        </Select>
      </div>

      <div className=" bg-gradient-to-bl from-[#4d4d4d] from-20% to-[#333533ce] md:min-h-screen lg:min-w-screen min-w-full rounded-tl-[45px] rounded-tr-[45px] pt-10 mt-10 pb-10">
        <MovieApiData.Provider value={data}>
          <div className="flex mb-20 justify-center">
            <Pagination
              classNames={{
                wrapper:
                  "gap-0 overflow-visible h-8 rounded border border-divider",
                item: "w-8 h-8 text-small rounded-none bg-gray-500 hover:bg-default-700",
                cursor:
                  " bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
                next: "bg-gray-400",
                prev: "bg-gray-400",
              }}
              isCompact
              showControls
              initialPage={page}
              total={totalPage}
              onChange={setPage}
            />
          </div>
          <FilmList />
          <div className="flex pt-20 justify-center">
            <Pagination
              classNames={{
                wrapper:
                  "gap-0 overflow-visible h-8 rounded border border-divider",
                item: "w-8 h-8 text-small rounded-none bg-gray-500 hover:bg-default-700",
                cursor:
                  " bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
                next: "bg-gray-400",
                prev: "bg-gray-400",
              }}
              isCompact
              showControls
              initialPage={page}
              total={totalPage}
              onChange={setPage}
            />
          </div>
        </MovieApiData.Provider>
      </div>
    </>
  );
}
