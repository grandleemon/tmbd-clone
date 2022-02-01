import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { movieApi } from '../../api'
import CastCreditDetails from './MovieDetailsComponents/CastCreditDetails'
import MovieReviews from './MovieDetailsComponents/MovieReviews'
import MovieRecomendations from './MovieDetailsComponents/MovieRecomendations'
import MovieSocials from './MovieDetailsComponents/MovieSocials'
import MovieKeywords from './MovieDetailsComponents/MovieKeywords'
import MovieInfo from './MovieDetailsComponents/MovieInfo'
import useDocumentTitle from '../../hooks/useTitle'
import { MovieDetailsTypes } from '../../models/movie/movieTypes'
import { numberWithCommas } from '../../utils/numberWithCommas'
import withUserSession from '../../decorators/withUserSession'
import './MovieDetails.css'

const MovieDetails = () => {
    const { id } = useParams<{id?: string}>()
    const [movieDetails, setMovieDetails] = useState<MovieDetailsTypes>()
    
    useEffect( () => {
        if (id) {
            movieApi.getMovieDetails(id)
            .then(({ data, error }: any) => data ? setMovieDetails(data) : console.error(error))
        }
    }, [id])  
    
    useDocumentTitle(movieDetails?.title)
    
    return (
        <div>
            <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%]">
                <ul className="flex justify-center gap-x-[50px] items-center h-[46px] mobile:hidden">
                    <li><span>Overview</span></li>
                    <li><span>Media</span></li>
                    <li><span>Fandom</span></li>
                    <li><span>Share</span></li>
                </ul>
            </div>
            <div className="w-full h-[800px] relative">
                {movieDetails && <MovieInfo movieDetails={movieDetails} />}
            </div>
            <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%] pt-[30px] grid grid-cols-4 mobile:flex mobile:flex-col tablet:flex tablet:flex-col">
                <div className="col-span-3">
                    {id && movieDetails && <CastCreditDetails id={id} movieDetails={movieDetails} />}
                    <p className="font-bold text-[1.5em] mt-[20px]">Full Cast & Crew</p>
                    <hr className="border mt-[30px] mb-[30px]" />
                    <div>
                        <div>
                            <ul className="flex gap-x-[30px] font-bold items-center">
                                <li className="text-[1.3em] cursor-pointer">Social</li>
                                <li className="text-[1.1em] cursor-pointer">Reviews</li>
                                <li className="text-[1.1em] cursor-pointer">Discussions</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-y-[30px] mt-[20px]">
                            {id && movieDetails && <MovieReviews id={id} movieDetails={movieDetails}/>}
                        </div>
                        <hr className="border mt-[30px]" />
                        <div className="mt-[30px]">
                            <h2 className="font-semibold text-[1.5em]">Recomendations</h2>
                            <div className="flex overflow-x-scroll gap-x-[30px]">
                                {id && movieDetails && <MovieRecomendations id={id} movieDetails={movieDetails}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pl-[25px] mobile:mt-[20px] mobile:pl-[0]">
                    <div className="flex gap-x-[20px]">     
                        {id && movieDetails && <MovieSocials id={id} movieDetails={movieDetails}/>}
                    </div>
                    <div className="mt-[20px]">
                        <p className="font-bold text-[1.2em]">Status</p>
                        <p>{movieDetails?.status}</p>
                        <p className="font-bold text-[1.2em] mt-[15px]">Original Language</p>
                        <p className="uppercase">{movieDetails?.original_language}</p>
                        <p className="font-bold text-[1.2em] mt-[15px]">Budget</p>
                        {movieDetails?.budget ? <p>${numberWithCommas(movieDetails?.budget)}</p> : "-"}
                        <p className="font-bold text-[1.2em] mt-[15px]">Revenue</p>
                        {movieDetails?.revenue ? <p>${numberWithCommas(movieDetails?.revenue)}</p> : "-"}
                    </div>
                    <div className="mt-[20px]">
                        <p className="font-bold text-[1.2em]">Keywords</p>
                        <div className="flex flex-wrap gap-[8px] mt-[10px]">
                           {id && movieDetails && <MovieKeywords id={id} movieDetails={movieDetails}/>}
                        </div>
                    </div>
                    <hr className="border mt-[30px] mb-[30px]" />
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;
