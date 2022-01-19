import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const Approved = (props: any) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get('request_token')
    const [sessionId, setSessionId] = useState('')

    useEffect( () => {
        async function createNewSession(){
            try {
                const res = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`, {request_token: token})
                .then(response => {
                    setSessionId(response.data.session_id);
                } )
            } catch (error) {
                console.error(error)
            }
        }
        createNewSession();
    },[])

    useEffect( () => {
        props.createAuthorizedSession(sessionId)
    },[sessionId])

    return (
        <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%] flex justify-center pt-[50px]">
            <div className="mb-[35%] font-bold ">Your account is approved now</div> 
        </div>
    )
}

export default Approved
