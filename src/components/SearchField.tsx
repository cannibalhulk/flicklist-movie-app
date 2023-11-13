import { useState, useEffect, useMemo } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Pagination,
  Link,
} from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";
import { years } from "../data/searchSelectionData";
import { filters } from "../data/filterSelectionData";
import selection_sort from "../functions/selection.sort";
// import useData from "../hooks/useData";
// import { ApiSearchTitleType } from "../types/ApiSearchTitleType";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import FilmList from "./FilmList";
import { MovieApiData } from "../contexts/MovieApiData";
import { MovieDataType, MovieData } from "../types/MovieDataType";
import { favoriteMoviesState } from "../recoil/atoms.recoil";
import { useRecoilValue } from "recoil";

export default function SearchField() {
  const favs = useRecoilValue(favoriteMoviesState);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState<MovieDataType | null>(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState<"title" | "vote_average">("title");
  let typeFilter: "inc" | "dec" = "inc";

  function debounce(func: () => void, delay: number) {
    let timeoutId: number;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func();
      }, delay);
    };
  }

  const options = useMemo(() => {
    return {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: `${title.length === 0 ? "a" : title}`,
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

  const debouncedLoadMovies = useMemo(() => {
    return debounce(async () => {
      const response = await axios.request(options);
      const filtered_result: MovieData = selection_sort(filter, response.data, typeFilter);
      const setDataObj = {
        data: filtered_result,
        favorites: favs,
      };
      setData(setDataObj);
      setTotalPage(filtered_result.total_pages);
    }, 2000); // Adjust the debounce time as needed
  }, [options, filter, typeFilter, favs]);

  useEffect(() => {
    const ind_href = window.location.href.indexOf('movie'); // finding correct index of 'movie' string in the curr url
    const debouncedLoad = debouncedLoadMovies() as unknown as number;
    if(localStorage.getItem('backtoUrl')){
      localStorage.removeItem('backtoUrl');
      localStorage.setItem('backtoUrl', window.location.href.slice(ind_href))
    } else{
      localStorage.setItem('backtoUrl', window.location.href.slice(ind_href));
    }
    
    if (searchParams.get("title")) {
      setTitle(searchParams.get("title") ?? "");
    } else {
      setTitle("");
    }

    

    return ()=>{
      clearTimeout(debouncedLoad)
    }
  }, [clicked, filter, options, typeFilter, favs, searchParams, debouncedLoadMovies]);

  //FIXME:
  // const my_movie_prop_obj: ApiSearchTitleType = {
  //   api_link: "https://moviesdatabase.p.rapidapi.com/titles/search/title/",
  //   query_key: ["movie"],
  //   titleType: "movie",
  //   year: "2023",
  //   title: title,
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handles <Input/> onChange

    let search;
    if (e.target.value) {
      search = {
        title: e.target.value,
      };
      setTitle(search.title);
    } else {
      setTitle("");
      search = undefined;
    }

    setSearchParams(search);
  };

  const handleClear = () => {
    // handles <Input/> onClear function
    const search = undefined;
    setSearchParams(search);
  };

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setClicked(true);
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    // handles <Select> onChange function
    setSelectedYear(e.target.value);
  }

  // type Filt = "title" | "vote_average";
  // type TypeOfFilter = "inc" | "dec";
  // type ArrType = ["title" | "vote_average", "inc" | "dec"];

  function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    // handles Filter change function
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
          onClear={handleClear}
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

      <Link
        href="/favorites"
        showAnchorIcon
        className="mt-10   text-2xl font-bold text-white"
      >
        Go to Favorites
      </Link>

      <div className=" bg-gradient-to-bl from-[#4d4d4d] from-20% to-[#333533ce] md:min-h-screen lg:min-w-screen min-w-full rounded-tl-[45px] rounded-tr-[45px] pt-10 mt-10 pb-10">
        {data?.data.results.length === 0 ? ( // displaying default texts for 'no result'
          <div className="min-h-screen p-30">
          <p className="text-center font-bold mt-[100px] md:text-2xl text-red-500">
            Sorry, we couldn't find any results for your query.
            <br /> Please try again with different keywords.
          </p>
          </div>
        ) : (
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
        )}
      </div>
      <div className="min-h-[50px] w-full bg-zinc-600 flex justify-center items-center">
        <p>
          Built by{" "}
          <span>
            <Link
              href="https://www.shukurdev.pro"
              color="warning"
              size="md"
              className="font-lexendMd underline-offset-2 underline decoration-none"
            >
              Shukurdev.pro
            </Link>
          </span>
        </p>
      </div>
    </>
  );
}
