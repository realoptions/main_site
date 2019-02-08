import React from 'react'
import FrontPage from './pages/FrontPage'
import Developers from './pages/Developers'
import SuccessMarketPlaceRegister from './pages/SuccessMarketPlaceRegister'
import AppMenu from './components/AppMenu'
import './App.css'
import { Route, Redirect, Switch } from 'react-router-dom'
import Products from './pages/Products'
//import awsConfig from './services/configureAws'
//import Amplify from '@aws-amplify/core'
import {
  HOME,
  PRODUCTS,
  DEVELOPERS,
  DEMO,
  SUCCESS_MARKETPLACE,
  SUBSCRIPTIONS
} from './routes/names'
import Subscriptions from './pages/Subscriptions'
import Demo from './pages/Demo'

//Amplify.configure(awsConfig)
//note that the route has to include AppMenu even though AppMenu doesn't use "page".
//this is because AppMenu won't update the selected menu unless part of a route
const App = () => (
  <div className="app">
    <Route path="/:page" component={AppMenu} />
    <Switch>
      <Route
        path={SUCCESS_MARKETPLACE}
        component={SuccessMarketPlaceRegister}
      />
      <Redirect from="/" exact to={HOME} />
    </Switch>
    <Route exact path={HOME} component={FrontPage} />
    <Route path={PRODUCTS} component={Products} />
    <Route path={DEVELOPERS} component={Developers} />
    <Route path={SUBSCRIPTIONS} component={Subscriptions} />
    <Route path={DEMO} component={Demo} />
  </div>
)

export default App
