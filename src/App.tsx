import { useState } from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import Header from './components/Header/Header';
import PopularCategory from './components/PopularMoviesPage/PopularCategory';
import './App.css';
import Home from './components/HomePage/Home';
import MovieDetails from './components/MovieDetailsPage/MovieDetails';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer/Footer';
import MoreMoviesByKeyword from './components/MoviesByKeywordPage/MoreMoviesByKeyword';
import Approved from './components/ApprovedPage/Approved';
import FavoritesMovies from './components/FavoriteMoviesPage/FavoritesMovies';
import UserAccount from './components/UserAccount';
import withUserToken from './decorators/withUserToken';

function App() {
  
  return (
    <div>
      <ScrollToTop />
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/movie" element={<PopularCategory/>}/>
        <Route path="/movie/:id-:title" element={<MovieDetails />}/>
        <Route path="/keyword/:id-:name" element={<MoreMoviesByKeyword />}/>
        <Route path="/approved" element={<Approved />}/>
        <Route path="/account/:id" element={<UserAccount />}/>
        <Route path="*" element={<Navigate to="/" />}/>
        <Route path="/account/:id/favorites" element={<FavoritesMovies />}/>
      </Routes>
      <Footer />
      
    </div>
  )
  
}

export default withUserToken(App);
