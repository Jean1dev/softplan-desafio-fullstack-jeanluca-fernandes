import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RouteWrapper from './RouteWrapper';

const Routes: React.FC = () => {
  return (
      <BrowserRouter>
        <Switch>
            <RouteWrapper path="/" exact component={Login}/>
            <RouteWrapper path="/register" component={Register}/>
            <RouteWrapper path="/dashboard" isPrivate component={Dashboard}/>
        </Switch>
      </BrowserRouter>
  )
}

export default Routes;