import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { movieApi } from '../../api';
import { userInfoSelector } from '../../store/features/userInfo';
import { userSessionSelector } from '../../store/features/userSession';
import loader from './../../assets/loader.gif'
import MovieCard from '../MovieCard';

type FavoriteMovies = {
    title: string, 
    poster_path: string, 
    release_date: string, 
    id: number, 
    vote_average: number
}

const basicImageUrl = "https://image.tmdb.org/t/p/original/"

const FavoritesMovies = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovies[]>([])
    const { id } = useParams<{id?: string}>()
    const userInfo = useSelector(userInfoSelector)
    const session = useSelector(userSessionSelector)

    useEffect( () => {
        if (id) movieApi.getFavoriteMovies(id, session.userSession)
            .then(({data, error}: any) => data ? setFavoriteMovies(data): console.error(error))
    }, [])

    return (
        <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%] ">
            {userInfo?.id ? 
            <div>
                <h2 className="font-bold text-[1.5em] my-[30px]">Favorite Movies</h2>
                {favoriteMovies.length ? 
                <div className="flex gap-[30px] flex-wrap mobile:justify-center tablet:justify-center">
                {favoriteMovies?.map(movie => (
                    <MovieCard 
                        id={movie.id} 
                        key={movie.id} 
                        title={movie.title} 
                        poster_path={movie.poster_path} 
                        release_date={movie.release_date} 
                        vote_average={movie.vote_average} 
                        basicImageUrl={basicImageUrl}
                    />
                ))}
                </div> : 
                <div className="flex justify-center items-center h-[500px]">
                    <img src={loader} alt="" className="w-[64px] h-[64px]"/>
                </div>}
            </div> : 
            <div className="mb-[600px] mt-[30px] font-bold">You need to login to see this page</div>} 
            
        </div>
    )
}

export default FavoritesMovies
