import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecomendations } from "../api/api";
import blank from './../assets/blank-icon.png'

const MovieRecomendations = ({id, movieDetails}: any) => {
    const [recomendations, setRecomendations] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getRecomendations(id, setRecomendations)
    }, [movieDetails])

    const handleNavigate = (id: number, title: string) => {
        navigate(`/movie/${id}-${title}`)
    }
  return (
    <>
      {recomendations?.map(
        (recomendation: {
          backdrop_path: string;
          title: string;
          vote_average: number;
          id: number;
        }) => (
          <div
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
