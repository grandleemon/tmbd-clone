import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MovieDetailsTypes } from './MovieDetails'
import SearchBar from './SearchBar'
import loader from './../assets/loader.gif'

const Home = (props: any) => {
    document.title = "The Movie Database (TMDB)"
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState<number>(Math.floor(Math.random() * 100))
    const [isLoading, setIsLoading] = useState<boolean>()
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=1e5bf08e3e7de0739102ef8a9c371945&language=en-US&page=${page}`
    const basicImageUrl = "https://image.tmdb.org/t/p/original/"

    useEffect( () => {
        async function getMovies(){
            try {
                const res = await axios.get(apiUrl)
                .then((response) => {
                const allMovies = response.data.results;
                setMovies(allMovies)
                setIsLoading(true)
                })
            } catch (error) {
                console.error(error)
            } 
        } 
        getMovies();
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
                    <div className="border border-[#032541] rounded-full ml-[40px] hidden md:block">
                        <button className="font-medium px-[20px] py-[4px] hover:bg-[#032541] rounded-full hover:text-[#1ed5a9] duration-300">Streaming</button>
                        <button className="font-medium px-[20px] py-[4px] hover:bg-[#032541] rounded-full hover:text-[#1ed5a9] duration-300">On TV</button>
                        <button className="font-medium px-[20px] py-[4px] hover:bg-[#032541] rounded-full hover:text-[#1ed5a9] duration-300">For Rent</button>
                        <button className="font-medium px-[20px] py-[4px] hover:bg-[#032541] rounded-full hover:text-[#1ed5a9] duration-300">In Theatres</button>
                    </div>
                </div>
                {isLoading ? <div className="flex overflow-x-scroll gap-x-[20px] mt-[20px]">
                    {movies.map((movie: {title: string, poster_path: string, vote_average: number, release_date: string, id: number}) => (
                        <div className="w-[150px] h-[400px] relative">
                            <div className="h-[225px] w-[150px]">
                                <img src={basicImageUrl + movie?.poster_path} alt="" className="h-[225px] w-[150px] rounded-lg cursor-pointer" onClick={() => handleNavigate(movie.id, movie.title)}/>
                            </div>
                            <div className={`select-none absolute left-[8%] top-[51%] font-bold bg-[#153e4a] w-[40px] h-[40px] rounded-full flex items-center justify-center text-[1em] p-[20px] ${setVoteClass(movie?.vote_average)}`}>{movie?.vote_average ? movie?.vote_average * 10 : ""} 
                                    <span className="text-[11px]">%</span>
                            </div>
                            <div className="p-[15px]">
                                <Link to={`/movie/${movie.id}-${movie.title}`} className="font-bold text-[1rem] hover:text-[#01B4E4] duration-300">{movie?.title}</Link>
                                <p className="opacity-80 text-[1rem]"> ({moment(movie?.release_date).format('MMM D, YYYY')})</p> <br />
                            </div>
                        </div>
                    ))}
                </div> : <div className="flex items-center justify-center h-[417px]">
                        <img src={loader}/>
                    </div> }
            </div>

        </div>
    )
}

export default Home
