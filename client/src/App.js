import React from 'react'
import API, { getCards } from './api'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Components/HomePage'
import Store from './Components/Store'
import Products from './Components/Products'
import Cart from './Components/Cart'
import Profile from './Components/Profile'
import Battle from './Components/Battle'

function App() {

  const [privateKey, setPrivateKey] = React.useState()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Store" element={<Store />} >
            <Route path="/Store/Products" element={<Products />} />
            <Route path="/Store/Cart" element={<Cart />} />
            <Route path="/Store/Profile" element={<Profile />} />
            <Route path="/Store/Battle" element={<Battle />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;
