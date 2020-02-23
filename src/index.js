import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import './styles/finside.scss'
import registerServiceWorker from './registerServiceWorker'
import { HashRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <App />
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
