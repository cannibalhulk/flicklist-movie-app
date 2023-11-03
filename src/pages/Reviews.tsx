import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieReviewType } from "../types/MovieReviewType";
import axios from "axios";
import ReviewDetails from "../components/ReviewDetails";
import { ScrollShadow } from "@nextui-org/react";
import SkeletonReview from "../components/SkeletonReview";

const Reviews = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviewDetail] = useState<MovieReviewType | null>(null);

  const options = useMemo(() => {
    return {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/reviews`,
      params: {
        language: "en-US",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_KEY}`,
      },
    };
  }, [id]);

  useEffect(() => {
    async function fetchMovieData() {
      setLoading(true);
      const response = await axios.request(options);
      if (response.status !== 200) {
        throw Error("Could not find that movie");
      }
      setReviewDetail(response.data);
      setLoading(false);
    }

    fetchMovieData();
  }, [options]);

  return loading ? (
    <SkeletonReview />
  ) : reviews?.results.length === 0 ? (
    <div className="flex h-full justify-center items-center">
      <h1 className="text-lg font-medium text-center">
        There is nothing to show here <br />{" "}
        <span className="text-3xl text-red-400 ">: (</span>
      </h1>
    </div>
  ) : (
    <ScrollShadow
      hideScrollBar
      className="p-3 h-full flex flex-col space-y-5 overflow-x-auto overflow-y-scroll"
    >
      {reviews?.results.map((rev) => (
        <ReviewDetails {...rev} />
      ))}
    </ScrollShadow>
  );
};

export default Reviews;
