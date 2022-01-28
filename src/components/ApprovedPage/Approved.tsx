import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { createNewSession } from '../../api/api'
import store from '../../app/store'
import { fetchUserData } from '../../features/userInfo/userInfoSlice'
import { userSessionSelector } from '../../features/userSession'
import { createSession, fetchUserSession } from '../../features/userSession/userSessionSlice'

const Approved = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const token: any = searchParams.get('request_token')
    const session = useSelector(userSessionSelector)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(fetchUserSession(token))
    },[token])

    useEffect( () => {
        if(session !== null) dispatch(fetchUserData(session.userSession))
    }, [session])

    return (
        <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%] flex justify-center pt-[50px]">
            <div className="mb-[500px] font-bold ">Your account is approved now</div> 
        </div>
    )
}

export default Approved
