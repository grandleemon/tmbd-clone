import axios from 'axios'
import moment from 'moment';
import React, {useState, useEffect} from 'react'
import MovieCard from './MovieCard';
import './PopularCategory.css'

const setVoteClass = (vote: number) => {
    if (vote >= 8) return "tag-green"
    if (vote >= 6) return "tag-orange"
    if (vote < 6) return "tag-red"
}

const PopularCategory = () => {
    const basicImageUrl = "https://image.tmdb.org/t/p/original/"
    const apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=1e5bf08e3e7de0739102ef8a9c371945&language=en-US&page=1"
    const [movies, setMovies] = useState([]);

    useEffect( () => {
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
    }, []);

    return (
        <div className="w-[95%] m-auto md:w-[80%] lg:w-[65%]">
            <div className="flex items-center mt-[40px]">
                <h2 className="text-[24px] font-bold">Popular Movies</h2>
                <div className="border border-[#032541] rounded-full ml-[40px] hidden md:block">
                    <button className="font-medium px-[20px] py-[4px] hover:bg-[#032541] rounded-full hover:text-[#1ed5a9] duration-300">Streaming</button>
                    <button className="font-medium px-[20px] py-[4px] hover:bg-[#032541] rounded-full hover:text-[#1ed5a9] duration-300">On TV</button>
                    <button className="font-medium px-[20px] py-[4px] hover:bg-[#032541] rounded-full hover:text-[#1ed5a9] duration-300">For Rent</button>
                    <button className="font-medium px-[20px] py-[4px] hover:bg-[#032541] rounded-full hover:text-[#1ed5a9] duration-300">In Theatres</button>
                </div>
            </div>  
            <div className="flex flex-wrap gap-x-[50px] gap-y-[60px] mt-[20px] justify-center">
                {movies.map( (movie: {title: string, poster_path: string, release_date: string, id: number, vote_average: number}) => (
                    <MovieCard id={movie.id} key={movie.id} setVoteClass={setVoteClass} title={movie.title} poster_path={movie.poster_path} release_date={movie.release_date} vote_average={movie.vote_average} basicImageUrl={basicImageUrl}/>
                ) )}
            </div>
        </div>
    )
}

export default PopularCategory
