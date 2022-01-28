import axios from "axios";
import { ApiResponse } from "../models/api";

// export const getRequestToken = (): Promise<ApiResponse<string>> => {
//     return axios.get(`${process.env.REACT_APP_API_URL}/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`)
//         .then(({data}) => ({data: data.request_token}))
//         .catch(console.error)
// }