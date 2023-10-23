import { useContext } from "react";
import { MovieApiData } from "../contexts/MovieApiData";

export default function FilmList() {
    const movie_data = useContext(MovieApiData)
    return <div className="grid grid-cols-3">
      {
        movie_data.map((item)=>(
          <img src={item?.primaryImage.url} alt={item?.primaryImage.caption.plainText}/>
        ))
      }
    </div>;
  }
  