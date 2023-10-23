import { useQuery } from "@tanstack/react-query";
import getMoviesByTitle from "../functions/getMoviesByTitle";
import { ApiSearchTitleType } from "../types/ApiSearchTitleType";

export default function useData({
  api_link,
  query_key,
  titleType,
  year,
  title,
}: ApiSearchTitleType) {
  const { data, error, isLoading } = useQuery({
    queryKey: query_key,
    queryFn: () => getMoviesByTitle(api_link, title, year, titleType),
  });
  return { data, error, isLoading };
}
