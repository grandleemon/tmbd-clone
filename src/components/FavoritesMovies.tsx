import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const FavoritesMovies = ({session}: any) => {
    const [favoriteMovies, setFavoriteMovies] = useState([])
    const {id} = useParams()

    useEffect( () => {
        function getFavorite(){
            return axios.get(`${process.env.REACT_APP_API_URL}/account/${id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session}&language=en-US&sort_by=created_at.asc&page=1`)
                .then(({data}) => {
                    console.log(data)
                    setFavoriteMovies(data.results)
                }).catch(console.error)
        }
        getFavorite();
    }, [])

    return (
        <div>
            {favoriteMovies?.map((movie: {title: string}) => (
                <div>{movie.title}</div>
            ))}
        </div>
    )
}

export default FavoritesMovies
