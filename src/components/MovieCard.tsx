import moment from 'moment'
import React from 'react'

interface MovieCardTypes{
    poster_path: string,
    title: string,
    release_date: string,
    basicImageUrl: string,
    vote_average: number,
    setVoteClass: any
}

const MovieCard = ({poster_path, title, release_date, basicImageUrl, vote_average, setVoteClass}:MovieCardTypes) => {
    return (
        <div className="w-[150px] h-[291px] relative">
                        <img src={basicImageUrl + poster_path} alt="poster" className="w-[150px] h-[225px] cursor-pointer" />
                        <div className={`select-none absolute bottom-[50px] left-[17%] font-bold bg-[#081c22] w-[34px] h-[34px] rounded-full flex items-center justify-center text-[0.75em] px-[20px] py-[20px] ${setVoteClass(vote_average)}`}>{vote_average * 10} 
                        <span className="text-[9px]">%</span></div>
                        <div className="cursor-pointer hover:text-[#01B4E4] duration-300 font-bold mt-[25px]">{title}</div>
                        <p className="opacity-60">{moment(release_date).format('MMM D, YYYY')}</p>
                    </div>
    )
}

export default MovieCard
