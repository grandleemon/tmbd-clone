import axios from 'axios';
import moment from 'moment';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/api';
import blank from './../assets/blank-icon.png'
import heart from './../assets/heart.png'
import CrewCreditDetails from './CrewCreditDetails';

const MovieInfo = ({movieDetails, session}:any) => {
    const basicImageUrl = "https://image.tmdb.org/t/p/original/"
    const {id}: any = useParams()
    const userInfo: any = useSelector<any>(state => state.userInfo)

    const calcTime = (time: number | undefined) => {
        if(time){
            const hours = Math.floor(time / 60)
            const minutes = time % 60
            const newTime = `${hours}h ${minutes}m`
            return newTime
        }
    }

    const addToFavorite = async () => {
        if(session){
            await axios.post(`https://api.themoviedb.org/3/account/${userInfo.id}/favorite?api_key=1e5bf08e3e7de0739102ef8a9c371945&session_id=${session}`, {media_type: "movie", media_id: id, favorite: "true"})
            .then(response => {
                console.log(response)
            })
        } else {
            alert("you need to login first")
        }
    }

    const setVoteClass = (vote: number | undefined) => {
        if(vote){
            if (vote >= 7) return "tag-green"
            if (vote >= 4) return "tag-orange"
            if (vote < 4) return "tag-red"
        }
    }

    return (
        <>
            <img src={basicImageUrl + movieDetails?.backdrop_path} alt="backdrop-image" className="w-full h-[800px] object-cover object-top" /> 
                <div className={`absolute ${movieDetails?.backdrop_path ? "bg-gradient-to-r from-black" : "bg-[#a7a2a2]"} w-full h-[800px] top-0`}>
                    <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%] flex pt-[40px] gap-[50px]">
                        {movieDetails?.poster_path ? <div className="w-[400px] h-[500px]">
                            <img src={basicImageUrl + movieDetails?.poster_path} alt="poster" className="w-[400px] h-[500px] object-cover"/>
                        </div> : <div className="w-[400px] h-[500px] bg-[#c7c2c2d6] flex items-center justify-center rounded-lg">
                                    <img src={blank} alt="" className="w-[100px] h-[100px] "/>
                            </div>}
                        <div className="w-[70%]">
                            <div className="text-white">
                                <span className="font-bold text-[2.2rem]">{movieDetails?.title}</span>
                                <span className="opacity-80 text-[2.2rem]"> ({moment(movieDetails?.release_date).format('YYYY')})</span> <br />
                                <div className="px-[4px] border opacity-60 inline">{movieDetails?.adult ? "PG-18" : "PG-13"}</div>
                                <span className="ml-[10px]">{moment(movieDetails?.release_date).format('L')}</span>
                                <span className="ml-[10px]">({movieDetails?.production_countries[0]?.iso_3166_1})</span>
                                <span className="ml-[10px]">&bull;</span>
                                {movieDetails?.genres.map( (genre: {name: string}) => (
                                    <span className="ml-[10px]">{genre.name}</span>
                                ))}
                                <span className="mx-[10px]">&bull;</span>
                                <span>{calcTime(movieDetails?.runtime)}</span>
                                <div className="mt-[25px] flex items-center">
                                    <div className={`select-none font-bold bg-[#153e4a] w-[60px] h-[60px] rounded-full flex items-center justify-center text-[1.2em] px-[20px] py-[20px] ${setVoteClass(movieDetails?.vote_average)}`}>{movieDetails?.vote_average ? movieDetails?.vote_average * 10 : ""} 
                                        <span className="text-[11px]">%</span>
                                    </div>
                                    <span className="font-bold ml-[11px]">User <br /> Score</span>
                                    <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#153e4a] cursor-pointer ml-[11px]" onClick={addToFavorite}>
                                        <img src={heart} alt="" className="w-[32px] h-[32px]" />
                                    </div>
                                </div>
                                <div className="mt-[25px]">
                                    <span className="font-bold text-[1.5em]">Overview</span>
                                    <p>{movieDetails?.overview}</p>
                                </div>
                                <div className="grid grid-cols-3 grid-rows-3 mt-[30px] gap-y-[20px]">
                                    <CrewCreditDetails id={id} movieDetails={movieDetails}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
        </>
    )
}

export default MovieInfo
