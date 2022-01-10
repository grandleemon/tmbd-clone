import React, { useEffect, useState } from 'react';
import {Route, Routes} from 'react-router-dom'

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PopularCategory from './components/PopularCategory';
import './App.css';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';

function App() {
 


  return (
    <div>
      <Header/> 
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/movie" element={<PopularCategory/>}/>
        <Route path="/movie/:id" element={<MovieDetails />}/>
      </Routes>
      
    </div>
  )
  
}

export default App;
