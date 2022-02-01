import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecomendations } from '../../../api/movie'
import { IProps } from "../../../models/movie/moviePropsTypes";
import blank from './../../../assets/blank-icon.png'

type Recomendations = {
    backdrop_path: string;
    title: string;
    vote_average: number;
    id: number;
}

const MovieRecomendations: FC<IProps> = ({id, movieDetails}) => {
    const [recomendations, setRecomendations] = useState<Recomendations[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        getRecomendations(id)
        .then(({ data, error }: any) => data ? setRecomendations(data) : console.error(error))
    }, [movieDetails])

    const handleNavigate = (id: number, title: string) => {
        navigate(`/movie/${id}-${title}`)
    }
  return (
    <>
      {recomendations?.map(
        recomendation => (
          <div key={recomendation.id}
            className="w-[250px] h-[184px] cursor-pointer"
            onClick={() =>
              handleNavigate(recomendation.id, recomendation.title)
            }
          >
            {recomendation?.backdrop_path ? (
              <div className="w-[250px] h-[141px]">
                <img
                  src={
                    process.env.REACT_APP_BASIC_IMAGE_URL +
                    recomendation?.backdrop_path
                  }
                  alt="backdrop-img"
                  className="w-[250px] h-[141px] rounded-md"
                />
              </div>
            ) : (
              <div className="w-[250px] h-[141px] flex items-center justify-center bg-[#c7c2c2d6]">
                <img src={blank} alt="" className="w-[50px] h-[50px]" />
              </div>
            )}
            <div className="flex justify-between">
              <span className="truncate">{recomendation?.title}</span>
              <span>{Math.ceil(recomendation?.vote_average * 10)}%</span>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default MovieRecomendations;
