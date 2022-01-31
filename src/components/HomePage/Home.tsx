import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { movieApi } from '../../api'
import useDocumentTitle from '../../hooks/useTitle'
import SearchBar from '../SearchBar'
import loader from './../../assets/loader.gif'

type Movie = {
    title: string,
    poster_path: string, 
    vote_average: number, 
    release_date: string, 
    id: number
}

const basicImageUrl = "https://image.tmdb.org/t/p/original/"

const Home = () => {
    const navigate = useNavigate()
    const [movies, setMovies] = useState<Movie[]>([])
    const [page, setPage] = useState<number>(Math.floor(Math.random() * 100))
    
    useDocumentTitle("The Movie Database (TMDB)")

    useEffect( () => {
        movieApi.getMovies(page)
            .then(({ data, error }: any) => data ? setMovies(data) : console.error(error))
    }, []);

    const setVoteClass = (vote: number | undefined) => {
        if(vote){
            if (vote >= 7) return "tag-green"
            if (vote >= 4) return "tag-orange"
            if (vote < 4) return "tag-red"
        }
    }

    const handleNavigate = (id: number, title: string) => {
        navigate(`/movie/${id}-${title}`)
    }

    return (
        <div>
            <SearchBar />
            <div className="w-[95%] m-auto px-[10px] md:w-[80%] lg:w-[65%]">
                <div className="flex items-center">
                    <h2 className="font-bold text-[1.5em]">What's Popular</h2>
                </div>
                {movies.length  ? 
                <div className="flex overflow-x-scroll gap-x-[20px] mt-[20px]">
                    {movies.map(movie => (
                        <div key={movie.id} className="w-[150px] h-[400px] relative">
                            <div className="h-[225px] w-[150px]">
                                <img src={basicImageUrl + movie?.poster_path} alt="poster image" className="h-[225px] w-[150px] rounded-lg cursor-pointer" 
                                onClick={() => handleNavigate(movie.id, movie.title)}/>
                            </div>
                            <div className={`select-none absolute left-[8%] top-[51%] font-bold bg-[#153e4a] w-[40px] h-[40px] rounded-full flex items-center justify-center 
                            text-[1em] p-[20px] ${setVoteClass(movie?.vote_average)}`}>{movie?.vote_average ? movie?.vote_average * 10 : ""} 
                                <span className="text-[11px]">%</span>
                            </div>
                            <div className="p-[15px]">
                                <Link to={`/movie/${movie.id}-${movie.title}`} className="font-bold text-[1rem] hover:text-[#01B4E4] duration-300">{movie?.title}</Link>
                                <p className="opacity-80 text-[1rem]"> ({moment(movie?.release_date).format('MMM D, YYYY')})</p> <br />
                            </div>
                        </div>
                    ))}
                </div> : 
                <div className="flex items-center justify-center h-[438px]">
                    <img src={loader} alt="loader" />
                </div> }
            </div>

        </div>
    )
}

export default Home
