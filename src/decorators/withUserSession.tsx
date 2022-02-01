import { ComponentType, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchUserData } from "../store/features/userInfo/userInfoSlice";
import { userSessionSelector } from "../store/features/userSession";
import { fetchUserSession } from "../store/features/userSession/userSessionSlice";

const withUserSession = (Component: ComponentType) => {

    const Wrapper = () => {
        const [searchParams] = useSearchParams()
        const token: string | null = searchParams.get('request_token')
        const session = useSelector(userSessionSelector)
        const dispatch = useDispatch()

    useEffect( () => {
        if(!token) return;
        
        dispatch(fetchUserSession(token))
    },[token])

    useEffect( () => {
        if(session) dispatch(fetchUserData(session.userSession))
    }, [session])

        return <Component />
    }

    return Wrapper;
};

export default withUserSession;