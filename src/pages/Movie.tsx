import SearchField from "../components/SearchField";
import { useVisibilityChange } from "@uidotdev/usehooks";
import { useFavicon } from 'react-haiku';
import { Link } from "react-router-dom";

export default function Movie() {
  const visibile = useVisibilityChange();
  const {setFavicon} = useFavicon();
  if(visibile === false) {
    setFavicon("https://img.icons8.com/?size=256&id=O1gYPRQw2ouL&format=png")
  } else {
    setFavicon('https://img.icons8.com/?size=256&id=Avh9QzxquY7P&format=png')
  }
  return (
    <div className="flex min-h-screen pt-3 bg-[#3f3f3f] flex-col items-center  text-xl">
      <h1 className="py-3 font-lexendMd font-bold text-[35px] mb-5 flex items-end space-x-1 ">
        <Link to={'/movie'}>
          <p className="drop-shadow-[0_3px_3px_rgba(225,225,225,1)]">FlickList</p>
        </Link>
        <div className="rounded-full w-[10px]  h-[10px] bg-[#68a8e9]"></div>
        <div className="rounded-full w-[10px]  h-[10px] bg-[#e9686e]"></div>
        <div className="rounded-full w-[10px]  h-[10px] bg-[#68e9a2]"></div>
      </h1>
      <SearchField />
    </div>
  );
}