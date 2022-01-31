import axios from "axios"

export const getUserData = (session: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session}`)
}