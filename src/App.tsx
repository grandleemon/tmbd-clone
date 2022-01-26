import React, { useEffect, useState } from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'

import Header from './components/Header/Header';
import SearchBar from './components/SearchBar';
import PopularCategory from './components/PopularMoviesPage/PopularCategory';
import './App.css';
import Home from './components/Home/Home';
import MovieDetails from './components/MovieDetailsPage/MovieDetails';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer/Footer';
import axios from 'axios';
import MoreMoviesByKeyword from './components/MoviesByKeywordPage/MoreMoviesByKeyword';
import Approved from './components/ApprovedPage/Approved';
import FavoritesMovies from './components/FavoriteMoviesPage/FavoritesMovies';
import UserAccount from './components/UserAccount';
import { useDispatch } from 'react-redux';
import {addUser} from './features/userInfo/userInfoSlice'
// import { getRequestToken } from './api/api';

interface UserInfo{
  id: string,
  username: string
}

function App() {
  const [token, setToken] = useState('')
  const [session, setSession] = useState('')
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const dispatch = useDispatch()
  
  const createAuthorizedSession = (id: string) => {
    setSession(id)
  }

  // useEffect( () => {
  //   getRequestToken()
  // },[])

  useEffect( () => {
    if(session){
      axios.get(`https://api.themoviedb.org/3/account?api_key=1e5bf08e3e7de0739102ef8a9c371945&session_id=${session}`)
      .then(response => {
          setUserInfo(response.data)
      })
    }
  },[session])

  useEffect( () => {
    dispatch(addUser({id: userInfo?.id, name: userInfo?.username}))
  }, [userInfo])

  return (
    <div>
      <ScrollToTop />
      <Header session={session} setToken={setToken}/> 
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/movie" element={<PopularCategory/>}/>
        <Route path="/movie/:id-:title" element={<MovieDetails session={session} userInfo={userInfo} />}/>
        <Route path="/keyword/:id-:name" element={<MoreMoviesByKeyword />}/>
        <Route path="/approved" element={<Approved createAuthorizedSession={createAuthorizedSession}/>}/>
        {userInfo?.id !== null ? <Route path="/account/:id" element={<UserAccount />}/> : <Route path="*" element={<Navigate to="/home" />}/>}
        
        <Route path="/account/:id/favorites" element={<FavoritesMovies session={session}/>}/>
      </Routes>
      <Footer />
      
    </div>
  )
  
}

export default App;
