import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchUserData } from '../../store/features/userInfo/userInfoSlice';
import { userSessionSelector } from '../../store/features/userSession';
import { fetchUserSession } from '../../store/features/userSession/userSessionSlice';

const Approved = () => {
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

  return <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%] flex justify-center mb-[58vh] mt-[20px] font-bold">
        Your account is approved.
  </div>;
};

export default Approved;
