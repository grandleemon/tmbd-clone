import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovieKeywords } from '../../../api/movie'
import { IProps } from "../../../models/movie/moviePropsTypes";

type MovieKeywordTypes = {
  name: string;
  id: number;
};

const MovieKeywords: FC<IProps> = ({id, movieDetails}) => {
    const [movieKeywords, setMovieKeywords] = useState<MovieKeywordTypes[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        getMovieKeywords(id)
        .then(({ data, error }:any) => data ? setMovieKeywords(data) : console.error(error))
    }, [movieDetails])

    const handleKeywordNavigate = (id: number, name: string) => {
        navigate(`/keyword/${id}-${name}`)
    }
  return (
    <>
      {movieKeywords.length
        ? movieKeywords?.map(keyword => (
            <p key={keyword.id}
              className="text-[14px] bg-[#0000001a] px-[10px] py-[4px] border border-[#d7d7d7] rounded-md cursor-pointer hover:underline"
              onClick={() => handleKeywordNavigate(keyword.id, keyword.name)}
            >
              {keyword.name}
            </p>
          ))
        : "No keywords have been added."}
    </>
  );
};

export default MovieKeywords;
