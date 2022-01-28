import moment from 'moment'
import { useNavigate } from 'react-router-dom'

interface MovieCardTypes{
    id: number,
    poster_path: string,
    title: string,
    release_date: string,
    basicImageUrl: string,
    vote_average: number,
    setVoteClass: any
}

const MovieCard = ({id, poster_path, title, release_date, basicImageUrl, vote_average, setVoteClass}:MovieCardTypes) => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/movie/${id}-${title}`)
    }
    return (
        <div className="w-[190px] min-h-[400px] relative border shadow-lg rounded-lg">
            <img src={basicImageUrl + poster_path} alt="poster" className="w-[190px] h-[295px] cursor-pointer rounded-t-lg" onClick={handleNavigate} />
                <div className={`select-none absolute bottom-[105px] left-[12%] font-bold bg-[#081c22] w-[34px] h-[34px] rounded-full flex items-center justify-center text-[0.95em] px-[20px] py-[20px] ${setVoteClass(vote_average)}`}>{vote_average * 10} 
                    <span className="text-[9px]">%</span>
                </div>
                <div className="p-[10px] pt-0 h-[100px]">
                    <div className="cursor-pointer hover:text-[#01B4E4] duration-300 font-bold mt-[25px]">{title}</div>
                    <p className="opacity-60">{moment(release_date).format('MMM D, YYYY')}</p>
                </div>
        </div>
    )
}

export default MovieCard
