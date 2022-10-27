import React from 'react'
import AppMenu from './components/AppMenu'
import './App.css'
import { Outlet } from 'react-router-dom'

const App = () => (
  <div className="app">
    <AppMenu />
    <Outlet />
  </div >
)

export default App
