import React from 'react'
import FrontPage from './pages/FrontPage'
import Developers from './pages/Developers'
import AppMenu from './components/AppMenu'
import './App.css'
import { Route, Redirect } from 'react-router-dom'
import Products from './pages/Products'

import { HOME, PRODUCTS, DEVELOPERS, DEMO } from './routes/names'
import Demo from './pages/Demo'
import Switch from 'react-router-dom/Switch'

//Amplify.configure(awsConfig)
//note that the route has to include AppMenu even though AppMenu doesn't use "page".
//this is because AppMenu won't update the selected menu unless part of a route
const App = () => (
  <div className="app">
    <Route path="/:page" component={AppMenu} />
    <Switch>
      <Route exact path={HOME} component={FrontPage} />
      <Route path={PRODUCTS} component={Products} />
      <Route path={DEVELOPERS} component={Developers} />
      <Route path={DEMO} component={Demo} />
      <Redirect from="/" exact to={HOME} />
    </Switch>
  </div>
)

export default App
