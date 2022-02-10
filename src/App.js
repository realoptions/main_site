import React from 'react'
import FrontPage from './pages/FrontPage'
import AppMenu from './components/AppMenu'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Products from './pages/Products'

import { HOME, PRODUCTS, DEMO } from './routes/names'
import Demo from './pages/Demo'

//note that the route has to include AppMenu even though AppMenu doesn't use "page".
//this is because AppMenu won't update the selected menu unless part of a route
const App = () => (
  <div className="app">
    <Routes>
      <Route path="*" element={<AppMenu />} />
    </Routes>
    <Routes>
      <Route path={HOME} element={<FrontPage />} />
      <Route path={PRODUCTS} element={<Products />} />
      <Route path={DEMO} element={<Demo />} />
    </Routes>
  </div >
)

export default App
