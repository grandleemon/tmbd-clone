import axios from "axios"

export const getMovies = (page: number) => {
    return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1e5bf08e3e7de0739102ef8a9c371945&language=en-US&page=${page}`)
        .then(({ data }) => ({data: data.results}))
        .catch(console.error)
}

export const getMovieDetails = (id: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(({data}) => ({data: data}))
        .catch(console.error)
}

export const getCastCreditDetails = (id: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(({data}) => ({data: data.cast}))
        .catch(console.error)
}
export const getCrewCreditDetails = (id: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(({data}) => ({data: data.crew})).catch(console.error)
}

export const getReviews =(id: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        .then( ({data}) => ({data: data.results}))
        .catch(console.error)
}

export const getRecomendations = (id: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        .then(({data}) => ({data: data.results}))
        .catch(console.error)
}

export const getSocialsIds = (id: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(({data}) => ({data: data}))
        .catch(console.error)
}

export const getMovieKeywords = (id: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}/keywords?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(({data}) => ({data: data.keywords}))
        .catch(console.error)
}

export const getPopularMovies = (page = 1) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
        .then(({ data }) => ({data: data.results}))
        .catch(console.error)
}

export const getMorePopularMovies = (page: number) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
        .then(({ data }) => ({data: data.results}))
        .catch(console.error)
}

export const getMoreMoviesByKeyword = (id: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/keyword/${id}/movies?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(({ data }) => ({data: data.results}))
        .catch(console.error)
}

export const getFavoriteMovies = (id: string, session: string | null) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/account/${id}/favorite/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session}&language=en-US&sort_by=created_at.asc&page=1`)
        .then(({data}) => ({data: data.results}))
        .catch(console.error)
}

export const addToFavorite = (accountId: string, session: string | null, movieId: string) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/account/${accountId}/favorite?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session}`, 
    {media_type: "movie", media_id: movieId, favorite: "true"})
}

export const searchByValue = (value: string) => {
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1e5bf08e3e7de0739102ef8a9c371945&language=en-US&query=${value}`)
        .then(({data}) => ({data: data.results}))
        .catch(console.error)
}