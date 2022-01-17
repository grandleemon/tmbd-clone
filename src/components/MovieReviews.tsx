import moment from "moment";
import React, { useEffect, useState } from "react";
import { getReviews } from "../api/api";

const MovieReviews = ({id, movieDetails}: any) => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        getReviews(id, setReviews)
    }, [movieDetails])
  return (
    <>
      {reviews.map(
        (review: {
          content: string;
          author: string;
          created_at: string;
          author_details: { avatar_path: string };
        }) => (
          <div className="border p-[20px] grid grid-cols-12 rounded-md shadow-lg">
            <div className="w-[64px] h-[64px] col-span-1">
              {review?.author_details?.avatar_path ? (
                <img
                  src={
                    !review?.author_details?.avatar_path?.indexOf("/https")
                      ? review?.author_details?.avatar_path?.slice(1)
                      : process.env.REACT_APP_BASIC_IMAGE_URL +
                        review?.author_details?.avatar_path
                  }
                  alt=""
                  className="w-[64px] h-[64px] rounded-full"
                />
              ) : (
                <div className="w-[64px] h-[64px] rounded-full"> no image </div>
              )}
            </div>
            <div className="ml-[20px] col-span-11">
              <span className="font-bold text-[1.2em]">
                A review by {review?.author}
              </span>
              <p className="text-[14px] opacity-80">
                Written by{" "}
                <span className="font-semibold">{review?.author}</span> on{" "}
                {moment(review?.created_at).format("MMM D, YYYY")}
              </p>
              <div className="mt-[30px]">
                {review?.content?.length >= 1000
                  ? review?.content.substring(0, 1000) + "..." + "read THE REST"
                  : review?.content}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default MovieReviews;
