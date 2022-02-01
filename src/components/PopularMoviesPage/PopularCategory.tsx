import {useState, useEffect} from 'react'
import { movieApi } from '../../api';
import useDocumentTitle from '../../hooks/useTitle';
import MovieCard from '../MovieCard';
import loader from './../../assets/loader.gif'
import './PopularCategory.css'

type Movie = {
    title: string, 
    poster_path: string, 
    release_date: string, 
    id: number, 
    vote_average: number
}

const basicImageUrl = "https://image.tmdb.org/t/p/original/"

const PopularCategory = () => {
    const [page, setPage] = useState(1)
    const [movies, setMovies] = useState<Movie[]>([]);

    useDocumentTitle("Popular Movies")

    const getMoreMovies = () => {
        movieApi.getMorePopularMovies(page)
            .then(({ data, error }: any) => data ? setMovies([...movies, ...data]) : console.error(error))
    }

    const loadMore = () => {
        getMoreMovies();
        setPage(page + 1)
    }

    useEffect( () => {
        movieApi.getPopularMovies()
            .then(({ data, error }: any) => data ? setMovies(data) : console.error(error))
        setPage(page + 1)
    }, []);

    return (
        <div className="w-[95%] m-auto md:w-[80%] lg:w-[65%]">
            <div className="flex items-center mt-[40px]">
                <h2 className="text-[24px] font-bold">Popular Movies</h2>
            </div>
            {movies.length ? 
            <div>
                <div className="flex flex-wrap gap-x-[40px] gap-y-[40px] mt-[20px] justify-center">
                {movies.map( (movie, index) => (
                    <MovieCard 
                    id={movie.id} 
                    key={index} 
                    title={movie.title} 
                    poster_path={movie.poster_path} 
                    release_date={movie.release_date} 
                    vote_average={movie.vote_average} 
                    basicImageUrl={basicImageUrl}
                    />
                ) )}
            </div> 
            <button onClick={loadMore} 
            className="w-full h-[50px] font-bold text-[1.5em] bg-[#01B4E4] flex items-center justify-center mt-[30px] hover:text-white duration-300">
                Load More
            </button>
            </div> : 
            <div className="flex justify-center items-center h-[80vh]">
                <img src={loader} alt="loader" className="w-[64px] h-[64px]" />
            </div>}
            
        </div>
    )
}

export default PopularCategory
