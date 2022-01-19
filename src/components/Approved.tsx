import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { createNewSession } from '../api/api'

const Approved = (props: any) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const token: any = searchParams.get('request_token')
    const [sessionId, setSessionId] = useState('')

    useEffect( () => {
        createNewSession(token, setSessionId);
    },[])

    useEffect( () => {
        if(sessionId) props.createAuthorizedSession(sessionId)
    },[sessionId])

    return (
        <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%] flex justify-center pt-[50px]">
            <div className="mb-[35%] font-bold ">Your account is approved now</div> 
        </div>
    )
}

export default Approved
