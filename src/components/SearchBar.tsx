import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { movieApi } from '../api'

type SearchedMoviesTypes = {
  title: string;
  id: number;
};

const SearchBar = () => {
    const [value, setValue] = useState('')
    const [searchedMovies, setSearchedMovies] = useState<SearchedMoviesTypes[]>([])
    const navigate = useNavigate()

    const handleChange = (e: string) => {
        setValue(e)
        movieApi.searchByValue(value)
            .then(({ data, error }: any) => data ? setSearchedMovies(data) : console.error(error))
    }

    const handleNavigate = (id: number, title: string) => {
        navigate(`/movie/${id}-${title}`)
    }

    return (
        <div className="w-[95%] m-auto px-[10px] md:w-[80%] lg:w-[65%] py-[20px] relative flex items-center">
            <input type="search" onChange={(e) => handleChange(e.target.value)} value={value} 
            className="w-full h-[46px] rounded-full px-[10px] text-[14px] lg:text-[16px] border border-[#FFCA9A] focus:outline-none" 
            placeholder="Search for a movie, tv show, person..." />
            {value && <div className="absolute z-[999] top-[80%] bg-white w-[100%] h-[500px]">
                {searchedMovies?.map(movie => (
                    <p className="cursor-pointer hover:bg-gray-500 hover:text-white" onClick={() => handleNavigate(movie.id, movie.title)}>{movie.title}</p>
                ))}
            </div> }
        </div>
    )
}

export default SearchBar
