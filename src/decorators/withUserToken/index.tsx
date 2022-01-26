import axios from 'axios';
import React, { ComponentType, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToken } from '../../features/userToken';
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
