import { useContext } from "react";
import { MovieApiData } from "../contexts/MovieApiData";
import {Image} from "@nextui-org/react";

export default function FilmList() {
    const movie_data = useContext(MovieApiData)
    return <div className="grid grid-cols-1 space-y-3 md:grid-cols-3 grid-rows-3 md:grid-rows-2 first-of-type:grid-flow-row-dense gap-4 h-5/6 w-4/5 mx-auto">
      {
        movie_data.map((item)=>{

          if(item?.poster_path !== null)
          return(
          
            <Image
              key={item?.id}
              src={"https://image.tmdb.org/t/p/original"+item?.poster_path}
              width={400}
              isZoomed={true}
              loading="lazy"
              alt={item?.overview}
            />
        )})
      }
    </div>;
  }
  