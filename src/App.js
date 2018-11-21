import React from 'react'
import FrontPage from './pages/FrontPage'
import Developers from './pages/Developers'
import SuccessMarketPlaceRegister from './pages/SuccessMarketPlaceRegister'
import Register from './pages/Register'
import AppMenu from './components/AppMenu'
import './App.css'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import Products from './pages/Products'
import {
  HOME,
  PRODUCTS,
  DEVELOPERS,
  LOGIN,
  DEMO,
  REGISTER,
  SUCCESS_MARKETPLACE,
  SUBSCRIPTIONS
} from './routes/names'
import Subscriptions from './pages/Subscriptions'
import { connect } from 'react-redux'
import Demo from './pages/Demo'

///TODO!! Consider using isSubscribed instead of isSignedIn
export const checkIfRegisteredPaid = (isFromMarketPlace, isSignedIn) =>
  isFromMarketPlace && isSignedIn
//note that the route has to include AppMenu even though AppMenu doesn't use "page".
//this is because AppMenu won't update the selected menu unless part of a route
const App = ({ isFromMarketPlace, isSignedIn }) => (
  <div className="app">
    <Route path="/:page" component={AppMenu} />
    <Switch>
      <Route
        path={SUCCESS_MARKETPLACE}
        component={SuccessMarketPlaceRegister}
      />
      {checkIfRegisteredPaid(isFromMarketPlace, isSignedIn) ? (
        <Redirect to={SUCCESS_MARKETPLACE} />
      ) : null}
      <Redirect from="/" exact to={HOME} />
    </Switch>
    <Route exact path={HOME} component={FrontPage} />
    <Route path={PRODUCTS} component={Products} />
    <Route path={DEVELOPERS} component={Developers} />
    <Route path={SUBSCRIPTIONS} component={Subscriptions} />
    <Route path={DEMO} component={Demo} />
    <Route path={REGISTER} component={Register} />
    <Route path={LOGIN} component={Register} />
  </div>
)

const mapStateToProps = ({ auth: { isSignedIn, isFromMarketPlace } }) => ({
  isSignedIn,
  isFromMarketPlace
})

export default withRouter(connect(mapStateToProps)(App))
