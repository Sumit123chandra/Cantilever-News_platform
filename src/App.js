import React from 'react'
import './App.css';
import Signin from './components/Signin';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import NewsDetails from './components/NewsDetails';

function App() {
  return (
   <>
   <Routes>
     <Route path='/signin' element={<Signin/>} />
     <Route path='/' element={<Main/>} />
     <Route path='/details' element={<NewsDetails/>} />
   </Routes>
  </>
  );
}

export default App;
