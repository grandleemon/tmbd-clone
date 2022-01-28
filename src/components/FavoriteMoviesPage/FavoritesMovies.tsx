import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { userInfoSelector } from '../../features/userInfo';
import { userSessionSelector } from '../../features/userSession';
import MovieCard from '../MovieCard';

const FavoritesMovies = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([])
    const {id} = useParams()
    const basicImageUrl = "https://image.tmdb.org/t/p/original/"
    const userInfo: any = useSelector<any>(userInfoSelector)
    const session = useSelector(userSessionSelector)

    useEffect( () => {
        function getFavorite(){
            return axios.get(`${process.env.REACT_APP_API_URL}/account/${id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session.userSession}&language=en-US&sort_by=created_at.asc&page=1`)
                .then(({data}) => {
                    setFavoriteMovies(data.results)
                }).catch(console.error)
        }
        getFavorite();
    }, [])

    const setVoteClass = (vote: number) => {
        if (vote >= 7) return "tag-green"
        if (vote >= 4) return "tag-orange"
        if (vote < 4) return "tag-red"
    }

    return (
        <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%] ">
            {userInfo?.id ? <div>
                <h2 className="font-bold text-[1.5em] my-[30px]">Favorite Movies</h2>
                <div className="flex gap-[30px] flex-wrap mobile:justify-center tablet:justify-center">
                {favoriteMovies?.map((movie: {title: string, poster_path: string, release_date: string, id: number, vote_average: number}) => (
                    <MovieCard id={movie.id} key={movie.id} setVoteClass={setVoteClass} title={movie.title} poster_path={movie.poster_path} release_date={movie.release_date} vote_average={movie.vote_average} basicImageUrl={basicImageUrl}/>
                ))}
                </div>
            </div> : <div className="mb-[600px] mt-[30px] font-bold">You need to login to see this page</div>}
            
        </div>
    )
}

export default FavoritesMovies
