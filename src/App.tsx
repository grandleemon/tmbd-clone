import React, { useEffect, useState } from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom'

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PopularCategory from './components/PopularCategory';
import './App.css';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import axios from 'axios';
import MoreMoviesByKeyword from './components/MoreMoviesByKeyword';
import Approved from './components/Approved';

function App() {
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  const [session, setSession] = useState('')
  const [userInfo, setUserInfo] = useState('')

  const createAuthorizedSession = (id: string) => {
    setSession(id)
  }

  useEffect( () => {
    async function getRequestToken(){
      try { 
          const res = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=1e5bf08e3e7de0739102ef8a9c371945`)
          .then((response) => {
              setToken(response.data.request_token)
          })
      } catch (error) {
          console.error(error)
      }
    }
    getRequestToken()
  },[])

  // if(session){
  //   axios.get(`https://api.themoviedb.org/3/account?api_key=1e5bf08e3e7de0739102ef8a9c371945&session_id=${session}`)
  //   .then(response => {
  //       setUserInfo(response.data)
  //   })
  // }

  if(token){
    console.log('user is authorized')
  } else {
    console.log('user is not authorized')
  }

  const handleSubmit = () => {
    navigate(`https://www.themoviedb.org/authenticate/${token}?redirect_to=http:/localhost:3000/approved`)
  }


  return (
    <div>
      <ScrollToTop />
      <Header token={token} session={session}/> 
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/movie" element={<PopularCategory/>}/>
        <Route path="/movie/:id-:title" element={<MovieDetails session={session} userInfo={userInfo} />}/>
        <Route path="/keyword/:id-:name" element={<MoreMoviesByKeyword />}/>
        <Route path="/approved" element={<Approved createAuthorizedSession={createAuthorizedSession}/>}/>
      </Routes>
      <Footer />
      
    </div>
  )
  
}

export default App;
