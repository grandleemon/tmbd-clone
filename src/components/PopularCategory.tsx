import axios from 'axios'
import moment from 'moment';
import React, {useState, useEffect} from 'react'
import MovieCard from './MovieCard';
import './PopularCategory.css'

const setVoteClass = (vote: number) => {
    if (vote >= 7) return "tag-green"
    if (vote >= 4) return "tag-orange"
    if (vote < 4) return "tag-red"
}

const PopularCategory = () => {
    const [page, setPage] = useState(1)
    const basicImageUrl = "https://image.tmdb.org/t/p/original/"
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=1e5bf08e3e7de0739102ef8a9c371945&language=en-US&page=${page}`
    const [movies, setMovies]: any = useState([]);

    const getMoreMovies = async () => {
         await axios.get(apiUrl)
            .then((response) => {
                const newMovies = response.data.results;
                setMovies([...movies, ...newMovies])
             })
        }

    const loadMore = () => {
        setPage(page + 1)
        getMoreMovies();
    }

    useEffect( () => {
        document.title = "Popular Movies"
        async function getMovies(){
            try {
                const res = await axios.get(apiUrl)
                .then((response) => {
                const allMovies = response.data.results;
                setMovies(allMovies)
                })
            } catch (error) {
                console.error(error)
            }
        } 
        getMovies();
        setPage(page + 1)
    }, []);

    return (
        <div className="w-[95%] m-auto md:w-[80%] lg:w-[65%]">
            <div className="flex items-center mt-[40px]">
                <h2 className="text-[24px] font-bold">Popular Movies</h2>
            </div>  
            <div className="flex flex-wrap gap-x-[40px] gap-y-[40px] mt-[20px] justify-center">
                {movies.map( (movie: {title: string, poster_path: string, release_date: string, id: number, vote_average: number}) => (
                    <MovieCard id={movie.id} key={movie.id} setVoteClass={setVoteClass} title={movie.title} poster_path={movie.poster_path} release_date={movie.release_date} vote_average={movie.vote_average} basicImageUrl={basicImageUrl}/>
                ) )}
            </div>
            <button onClick={loadMore} className="w-full h-[50px] font-bold text-[1.5em] bg-[#01B4E4] flex items-center justify-center mt-[30px] hover:text-white duration-300">Load More</button>
        </div>
    )
}

export default PopularCategory
