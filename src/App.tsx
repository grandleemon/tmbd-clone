import {Navigate, Route, Routes} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import PopularCategory from './components/PopularMoviesPage/PopularCategory';
import Home from './components/HomePage/Home';
import MovieDetails from './components/MovieDetailsPage/MovieDetails';
import Footer from './components/Footer/Footer';
import MoreMoviesByKeyword from './components/MoviesByKeywordPage/MoreMoviesByKeyword';
import Approved from './components/ApprovedPage/Approved';
import FavoritesMovies from './components/FavoriteMoviesPage/FavoritesMovies';
import { fetchRequestToken } from './store/features/userToken/userTokenSlice';
import useScrollToTop from './hooks/useScrollToTop';
import './App.css';


function App() {
  useScrollToTop()
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(fetchRequestToken())
  }, [])
  
  return (
    <div>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/movie" element={<PopularCategory/>}/>
        <Route path="/movie/:id-:title" element={<MovieDetails />}/>
        <Route path="/keyword/:id-:name" element={<MoreMoviesByKeyword />}/>
        <Route path="/approved" element={<Approved />}/>
        <Route path="*" element={<Navigate to="/" />}/>
        <Route path="/account/:id/favorites" element={<FavoritesMovies />}/>
      </Routes>
      <Footer />
      
    </div>
  )
  
}

export default App;
