import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchUserData } from '../../store/features/userInfo/userInfoSlice'
import { userSessionSelector } from '../../store/features/userSession'
import { fetchUserSession } from '../../store/features/userSession/userSessionSlice'

const Approved = () => {
    const [searchParams, setSearchParams] = useSearchParams()
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

    return (
        <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%] flex justify-center pt-[50px]">
            <div className="mb-[500px] font-bold ">Your account is approved now</div> 
        </div>
    )
}

export default Approved
