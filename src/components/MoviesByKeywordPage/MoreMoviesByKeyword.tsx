import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { movieApi } from '../../api'
import useDocumentTitle from '../../hooks/useTitle'

type MoviesByKeywordTypes = {
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  id: number;
};

const basicImageUrl = "https://image.tmdb.org/t/p/original/"

const MoreMoviesByKeyword = () => {
    const navigate = useNavigate()
    const {id, name} = useParams()
    const [moviesByKeyword, setMoviesByKeyword] = useState<MoviesByKeywordTypes[]>([])
   
    useEffect( () => {
        if(id)
            movieApi.getMoreMoviesByKeyword(id)
            .then(({ data, error }: any) => data ? setMoviesByKeyword(data): console.error(error))
    })

    const handleNavigate = (id: number, title: string) => {
        navigate(`/movie/${id}-${title}`)
    }

    useDocumentTitle(`${name} results`)

    return (
        <div className="">
            <div className="bg-[#073844] font-bold text-[1.5em] text-white">
                <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%]">{name}</div>
            </div>
            <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%]">
                <div className="flex flex-col gap-y-[30px] mt-[30px]">
                {moviesByKeyword?.map(movie => (
                    <div className="w-full min-h-[141px] border shadow-lg cursor-pointer grid grid-cols-12 gap-x-[10px] rounded-l-md hover:translate-y-[-15px] duration-300 mobile:grid-cols-1 mobile:gap-x-0" onClick={() => handleNavigate(movie.id, movie.title)}>
                        <div className="w-full h-full col-span-1 justify-center mobile:p-[15px] tablet:col-span-4 smallpc:col-span-3 mdpc:col-span-2">
                            <img className="w-full h-full rounded-l-md mobile:rounded-md" src={basicImageUrl + movie?.poster_path} alt="poster-img" />
                        </div>
                        <div className="p-[15px] col-span-11 tablet:col-span-8 smallpc:col-span-9 mdpc:col-span-10">
                            <div className="pt-[15px] font-bold text-[1.3em] mobile:pt-[0]">
                                <p>{movie.title}</p>
                            </div>
                            <div>
                                <p className="opacity-50">{moment(movie?.release_date).format('MMMM D, YYYY')}</p>
                            </div>
                            <div className="w-[]">
                                <p>{movie?.overview.length >= 370 ? movie?.overview?.substring(0, 370) + "..." : movie.overview}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default MoreMoviesByKeyword
