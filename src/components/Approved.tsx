import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const Approved = (props: any) => {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get('request_token')
    const [sessionId, setSessionId] = useState('')

    useEffect( () => {
        async function createNewSession(){
            try {
                const res = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=1e5bf08e3e7de0739102ef8a9c371945`, {request_token: token})
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
        <div>
            your account is approved now
           {searchParams.get('request_token')}
        </div>
    )
}

export default Approved
