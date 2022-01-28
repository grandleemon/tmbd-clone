import { ComponentType, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRequestToken } from '../../features/userToken/userTokenSlice';

const withUserToken = (Component: ComponentType) => {
  
  const Wrapper = () => {
    const dispatch = useDispatch()

    useEffect( () => {
      dispatch(fetchRequestToken())
    }, [])

      return <Component />
  }
  
  return Wrapper;
};

export default withUserToken;
