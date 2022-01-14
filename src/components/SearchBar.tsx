import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const [value, setValue] = useState('')
    const [searchedMovies, setSearchedMovies] = useState([])
    const navigate = useNavigate()

    const handleSubmit = async () => {
         await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1e5bf08e3e7de0739102ef8a9c371945&language=en-US&query=${value}`)
        .then((response) => {
             console.log(response);
        })
    }

    const handleChange = async (e: string) => {
        setValue(e)
        await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1e5bf08e3e7de0739102ef8a9c371945&language=en-US&query=${value}`)
        .then((response) => {
             setSearchedMovies(response.data.results)
        })
    }

    const handleNavigate = (id: number, title: string) => {
        navigate(`/movie/${id}-${title}`)
    }

    return (
        <div className="w-[95%] m-auto px-[10px] md:w-[80%] lg:w-[65%] py-[20px] relative flex items-center">
            <input type="search" onChange={(e) => handleChange(e.target.value)} value={value} className="w-full h-[46px] rounded-full px-[10px] text-[14px] lg:text-[16px] border border-[#FFCA9A] focus:outline-none" placeholder="Search for a movie, tv show, person..." />
            {value && <div className="absolute z-[999] top-[80%] bg-white w-[100%] h-[500px]">
                {searchedMovies?.map((movie: {title: string, id: number}) => (
                    <p className="cursor-pointer hover:bg-gray-500 hover:text-white" onClick={() => handleNavigate(movie.id, movie.title)}>{movie.title}</p>
                ))}
            </div> }
        </div>
    )
}

export default SearchBar
