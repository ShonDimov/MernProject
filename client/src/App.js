import React from 'react';
import API, { getCards } from './api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage';
import Store from './Components/Store';

function App() {

  const [privateKey, setPrivateKey] = React.useState()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Store" element={<Store />} />
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;
