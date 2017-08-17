import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, Switch } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import BoardContainer from '@/containers/BoardContainer'
import '@/styles/layout.scss'

ReactDOM.render(
  (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path='/' component={BoardContainer} />
      </Switch>
    </Router>
  ), document.getElementById('root')
)
