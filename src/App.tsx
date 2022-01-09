import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

function App() {
 


  return (
    <div>
      <Header/> 
      <SearchBar/>
    </div>
  )
  
}

export default App;
