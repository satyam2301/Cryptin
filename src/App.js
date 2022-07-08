import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/coins/:id" element={<Coinpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
