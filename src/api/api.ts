import axios from "axios";

export function getMovieDetails(id: number, setMovieDetails: any){
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(({data}) => setMovieDetails(data))
        .catch(console.error)
}

export function getCrewCreditDetails(id: number, setCrewDetails: any){
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(({data}) => {
            setCrewDetails(data.crew)
        }).catch(console.error)
}

export function getCastCreditDetails(id: number, setCastDetails: any){
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then(({data}) => {
            setCastDetails(data.cast)
        }).catch(console.error)
}

export function getReviews(id: number, setReviews: any){
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        .then( ({data}) => {
            setReviews(data.results)
        }).catch(console.error)
}

export function getRecomendations(id: number, setRecomendations: any){
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        .then(({data}) => {
            setRecomendations(data.results)
        }) .catch(console.error)
}

export function getSocialsIds(id: number, setSocials: any){
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(({data}) => {
            setSocials(data)
        }).catch(console.error)
}

export function getMovieKeywords(id: number, setMovieKeywords: any){
    return axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}/keywords?api_key=${process.env.REACT_APP_API_KEY}`)
        .then((response) => {
            setMovieKeywords(response.data.keywords)
        }).catch(console.error)
}

export function getRequestToken(setToken: any){
    return axios.get(`${process.env.REACT_APP_API_URL}/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(({data}) => {
            setToken(data.request_token)
        }).catch(console.error)
}

export function createNewSession(token: string, setSessionId: any){
    return axios.post(`${process.env.REACT_APP_API_URL}/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`, {request_token: token})
        .then(({data}) => {
            debugger
            setSessionId(data.session_id);
        }).catch(console.error)
}