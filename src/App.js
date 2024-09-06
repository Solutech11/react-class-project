import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Contact from './directory/Contact';
import MovieList from './movie/movieList';
import SingleMovie from './movie/SingleMovie';
import BookList from './library/BookList';



function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path='/contact' element={<Contact/>} />

          <Route path='/' element={<MovieList/>} />

          <Route path='/movie/:id' element={<SingleMovie/>} />



          {/* library  */}
          <Route path='/library' element={<BookList/>} />

        </Routes>
      </Router>
    </>
  )
}

export default App