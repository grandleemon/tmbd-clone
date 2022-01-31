import axios from "axios"

export const getToken = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(({data}) => ({data: data.request_token}))
}

export const getSession = (token: string) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`, {request_token: token})
        .then(({ data }) => ({data: data.session_id}))
}

export const logOut = (session: string | null) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/authentication/session?api_key=${process.env.REACT_APP_API_KEY}`, { data: {session_id: session}})
}