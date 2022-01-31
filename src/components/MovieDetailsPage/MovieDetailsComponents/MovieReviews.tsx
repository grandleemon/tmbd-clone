import moment from "moment";
import { FC, useEffect, useState } from "react";
import { getReviews } from '../../../api/movie';
import { IProps } from "../../../models/movie/moviePropsTypes";

type ReviewsTypes = {
  content: string;
  author: string;
  created_at: string;
  author_details: { avatar_path: string };
}

const MovieReviews: FC<IProps> = ({id, movieDetails}) => {
    const [reviews, setReviews] = useState<ReviewsTypes[]>([])

    useEffect(() => {
        getReviews(id)
        .then(({ data, error }: any) => data ? setReviews(data) : console.error(error))
    }, [movieDetails])

  return (
    <>
      {reviews.map(
        review => (
          <div className="border p-[20px]  rounded-md shadow-lg">
            <div className="flex">
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
              <div>
              <div className="font-bold text-[1.2em] ml-[20px] mobile:hidden">
                A review by {review?.author}
              </div>
              <p className="text-[14px] opacity-80 ml-[20px]">
                Written by {" "}
                <span className="font-semibold">{review?.author}</span> on {" "}
                {moment(review?.created_at).format("MMM D, YYYY")}
              </p>
              </div>
            </div>
            <div className="ml-[20px] mobile:col-start-1 mobile:ml-[0]">
              <div className="mt-[30px] mobile:mt-[10px]">
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
